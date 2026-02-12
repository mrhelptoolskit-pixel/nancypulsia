import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Candidate, ChatMessage, RadarDataPoint } from "@/data/mockCandidates";

function mapRow(row: any): Candidate {
  const history = (row.conversation_history as any[] || []) as ChatMessage[];
  const radar = (row.radar_data as any[] || []) as RadarDataPoint[];
  const now = new Date();
  const msgTime = new Date(row.last_message_time);
  const diffMin = Math.round((now.getTime() - msgTime.getTime()) / 60000);
  const timeLabel = diffMin < 60 ? `${diffMin}m ago` : `${Math.round(diffMin / 60)}h ago`;

  return {
    id: row.id,
    name: row.name,
    phone: row.phone || "",
    status: row.status as Candidate["status"],
    diagnostic_score: row.diagnostic_score,
    avatar: row.avatar || row.name.split(" ").map((n: string) => n[0]).join(""),
    role: row.role || "",
    last_message_time: timeLabel,
    conversation_history: history,
    radar_data: radar,
    ai_insights: row.ai_insights || [],
  };
}

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("last_message_time", { ascending: false });

      if (!error && data) {
        setCandidates(data.map(mapRow));
      }
      setLoading(false);
    };

    fetchCandidates();

    // Real-time subscription
    const channel = supabase
      .channel("candidates-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "candidates" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setCandidates((prev) => [mapRow(payload.new), ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setCandidates((prev) =>
              prev.map((c) => (c.id === payload.new.id ? mapRow(payload.new) : c))
            );
          } else if (payload.eventType === "DELETE") {
            setCandidates((prev) => prev.filter((c) => c.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { candidates, loading };
}
