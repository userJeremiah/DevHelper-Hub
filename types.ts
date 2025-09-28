
export interface Tag {
  id: number;
  name: string;
}

export interface Snippet {
  id: number;
  title: string;
  language: string;
  code: string;
  tags: Tag[];
  description: string;
  createdAt: Date;
}

export interface Doc {
  id: number;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

export interface LearningGoal {
  id: number;
  title: string;
  category: string;
  targetHours: number;
  loggedHours: number;
}

export interface SchedulerEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  description?: string;
  recurrenceRule?: string;
  roomId?: number;
}
