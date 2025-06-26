export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  totalAttendance: {
    days: number;
  };
  absentAttendance: {
    days: number;
  };
  profileImage: string;
}

export interface AttendanceData {
  percentage: number;
  lastUpdated: string;
  bySubject: {
    name: string;
    present: number;
    absent: number;
    total: number;
  }[];
}

export interface SubjectAttendance {
  name: string;
  classesAttended: number;
  totalClasses: number;
  percentage: number;
}

export interface AgendaItem {
  id: string;
  time: string;
  endTime: string;
  title: string;
  location: string;
  status?: string;
  additional?: string;
}

// Course related types
export interface Course {
  id: string;
  title: string;
  enrollmentId: string;
  status: "In Progress" | "Pending" | "Completed";
  expiringIn: string;
  completionPercentage: number;
  imageSrc: string;
}

export interface Assignment {
  id: string;
  title: string;
  submittedOn?: string;
  dueBy: string;
  isCompleted: boolean;
  isUrgent?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  dueBy: string;
}

export interface CalendarEvent {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  details: string;
  color: string;
}

export interface RecommendedCourse {
  id: string;
  title: string;
  credits: number;
  completionTime: string;
  imageSrc: string;
}

export interface WeekDay {
  day: string;
  abbr: string;
  date: number;
  isToday?: boolean;
}
