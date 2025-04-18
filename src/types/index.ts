// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  bio: string;
  skills: Skill[];
  events: string[];
  isAdmin?: boolean;
}

export interface Skill {
  sport: string;
  level: SkillLevel;
}

export enum SkillLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Professional = "Professional"
}

// Event related types
export interface Event {
  id: string;
  title: string;
  description: string;
  sport: string;
  skillLevel: SkillLevel;
  location: string;
  date: string;
  time: string;
  duration: number;
  maxParticipants: number;
  participants: string[];
  host: string;
  image: string;
}

// Auth related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Common types
export interface SportCategory {
  id: string;
  name: string;
  icon: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: "event" | "match" | "system";
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
}