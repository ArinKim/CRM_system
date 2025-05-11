export interface MeetingInterface {
  id: string;
  title: string;
  customerId: string;
  staffId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}
