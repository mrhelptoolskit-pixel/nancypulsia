
-- Operators table (links auth users who are operators)
CREATE TABLE public.operators (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;

-- Helper function to check operator status (security definer to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_operator(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.operators WHERE id = _user_id
  )
$$;

-- Operators can read their own row
CREATE POLICY "Operators can read own row"
  ON public.operators FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Candidates table
CREATE TABLE public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  diagnostic_score INTEGER NOT NULL DEFAULT 0,
  avatar TEXT,
  role TEXT,
  last_message_time TIMESTAMPTZ DEFAULT now(),
  conversation_history JSONB DEFAULT '[]'::jsonb,
  radar_data JSONB DEFAULT '[]'::jsonb,
  ai_insights TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Only operators can access candidates
CREATE POLICY "Operators can select candidates"
  ON public.candidates FOR SELECT
  TO authenticated
  USING (public.is_operator(auth.uid()));

CREATE POLICY "Operators can insert candidates"
  ON public.candidates FOR INSERT
  TO authenticated
  WITH CHECK (public.is_operator(auth.uid()));

CREATE POLICY "Operators can update candidates"
  ON public.candidates FOR UPDATE
  TO authenticated
  USING (public.is_operator(auth.uid()));

CREATE POLICY "Operators can delete candidates"
  ON public.candidates FOR DELETE
  TO authenticated
  USING (public.is_operator(auth.uid()));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON public.candidates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable real-time for candidates
ALTER PUBLICATION supabase_realtime ADD TABLE public.candidates;

-- Auto-create operator row on signup (all signups are operators for now)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.operators (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
