export interface Candidate {
  id: string;
  name: string;
  phone: string;
  status: "New" | "Qualifying" | "Approved";
  diagnostic_score: number;
  avatar: string;
  role: string;
  last_message_time: string;
  conversation_history: ChatMessage[];
  radar_data: RadarDataPoint[];
  ai_insights: string[];
}

export interface ChatMessage {
  id: string;
  sender: "candidate" | "agent";
  text: string;
  timestamp: string;
}

export interface RadarDataPoint {
  trait: string;
  value: number;
  fullMark: number;
}

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Elena Vasquez",
    phone: "+34 612 345 678",
    status: "Qualifying",
    diagnostic_score: 87,
    avatar: "EV",
    role: "CEO — Deep Sea Ventures",
    last_message_time: "3m ago",
    conversation_history: [
      { id: "1", sender: "candidate", text: "I've been diving to 40m recreationally for 5 years. I want to push beyond that.", timestamp: "14:02" },
      { id: "2", sender: "agent", text: "That's impressive depth experience, Elena. What draws you to extreme depth expeditions specifically?", timestamp: "14:03" },
      { id: "3", sender: "candidate", text: "The silence. Below 30m the world disappears. I want to know what lies beyond that threshold.", timestamp: "14:05" },
      { id: "4", sender: "agent", text: "Interesting. Our neuro-diagnostic indicates strong composure under pressure. Let's discuss the financial commitment.", timestamp: "14:06" },
      { id: "5", sender: "candidate", text: "Money isn't the question. Safety protocols and team quality are.", timestamp: "14:08" },
    ],
    radar_data: [
      { trait: "Risk Taking", value: 82, fullMark: 100 },
      { trait: "Mental Calm", value: 94, fullMark: 100 },
      { trait: "Physical", value: 78, fullMark: 100 },
      { trait: "Financial", value: 95, fullMark: 100 },
    ],
    ai_insights: ["High composure", "Detail-oriented", "Safety-focused", "Leadership traits"],
  },
  {
    id: "2",
    name: "Marc Durand",
    phone: "+33 6 98 76 54 32",
    status: "New",
    diagnostic_score: 72,
    avatar: "MD",
    role: "Free Diver — AIDA Instructor",
    last_message_time: "12m ago",
    conversation_history: [
      { id: "1", sender: "candidate", text: "Saw your expedition to the Mariana approach zone. I hold a national record in free diving.", timestamp: "13:45" },
      { id: "2", sender: "agent", text: "Welcome Marc. Your free diving credentials are impressive. What's your deepest no-limit dive?", timestamp: "13:47" },
      { id: "3", sender: "candidate", text: "127m on a single breath. But I want to go deeper with equipment this time.", timestamp: "13:49" },
    ],
    radar_data: [
      { trait: "Risk Taking", value: 95, fullMark: 100 },
      { trait: "Mental Calm", value: 88, fullMark: 100 },
      { trait: "Physical", value: 96, fullMark: 100 },
      { trait: "Financial", value: 55, fullMark: 100 },
    ],
    ai_insights: ["Extreme athlete", "Fear threshold: very high", "Financial concern flagged", "Seeking validation"],
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    phone: "+81 90 1234 5678",
    status: "Approved",
    diagnostic_score: 94,
    avatar: "YT",
    role: "Aerospace Engineer — JAXA",
    last_message_time: "1h ago",
    conversation_history: [
      { id: "1", sender: "agent", text: "Yuki, your application has been flagged as exceptional. Welcome to the final stage.", timestamp: "12:00" },
      { id: "2", sender: "candidate", text: "Thank you. I've been training in isolation chambers for 6 months for this.", timestamp: "12:05" },
      { id: "3", sender: "agent", text: "Your psych profile shows remarkable stability. One last question — how do you handle the unknown?", timestamp: "12:07" },
      { id: "4", sender: "candidate", text: "The unknown is why I became an engineer. To map it.", timestamp: "12:09" },
    ],
    radar_data: [
      { trait: "Risk Taking", value: 75, fullMark: 100 },
      { trait: "Mental Calm", value: 98, fullMark: 100 },
      { trait: "Physical", value: 82, fullMark: 100 },
      { trait: "Financial", value: 88, fullMark: 100 },
    ],
    ai_insights: ["Exceptional composure", "Analytical mindset", "Isolation trained", "Mission-driven"],
  },
  {
    id: "4",
    name: "Anika Osei",
    phone: "+233 24 567 8901",
    status: "Qualifying",
    diagnostic_score: 68,
    avatar: "AO",
    role: "Wildlife Photographer — Nat Geo",
    last_message_time: "2h ago",
    conversation_history: [
      { id: "1", sender: "candidate", text: "I photograph apex predators in their territory. I'm comfortable with danger.", timestamp: "10:30" },
      { id: "2", sender: "agent", text: "Your fieldwork is extraordinary. How do you manage fear in close encounters?", timestamp: "10:32" },
      { id: "3", sender: "candidate", text: "Fear is a signal, not a stop sign. I use it to sharpen focus.", timestamp: "10:34" },
    ],
    radar_data: [
      { trait: "Risk Taking", value: 90, fullMark: 100 },
      { trait: "Mental Calm", value: 72, fullMark: 100 },
      { trait: "Physical", value: 70, fullMark: 100 },
      { trait: "Financial", value: 60, fullMark: 100 },
    ],
    ai_insights: ["Fear of heights", "Strong visual-spatial", "Adrenaline-seeking", "Moderate financial readiness"],
  },
  {
    id: "5",
    name: "Viktor Drăgan",
    phone: "+40 721 234 567",
    status: "New",
    diagnostic_score: 45,
    avatar: "VD",
    role: "Investment Banker — UBS",
    last_message_time: "5h ago",
    conversation_history: [
      { id: "1", sender: "candidate", text: "I want to do something that actually matters. I have the resources.", timestamp: "08:15" },
      { id: "2", sender: "agent", text: "What draws you to extreme expeditions, Viktor?", timestamp: "08:18" },
      { id: "3", sender: "candidate", text: "Honestly? I need to prove to myself that I'm more than spreadsheets.", timestamp: "08:20" },
    ],
    radar_data: [
      { trait: "Risk Taking", value: 40, fullMark: 100 },
      { trait: "Mental Calm", value: 55, fullMark: 100 },
      { trait: "Physical", value: 35, fullMark: 100 },
      { trait: "Financial", value: 99, fullMark: 100 },
    ],
    ai_insights: ["Seeking clarity", "Low physical readiness", "High financial capacity", "Identity crisis indicator"],
  },
];
