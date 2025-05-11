import { MeetingInterface } from "./meeting.interface";

export class Meeting {
  public id: string;
  public title: string;
  public customerId: string;
  public userId: string;
  public date: Date;
  public startTime: Date;
  public endTime: Date;
  public status: "scheduled" | "completed" | "cancelled";
  public notes?: string;

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.title) this.title = initializer.title;
    if (initializer.customerId) this.customerId = initializer.customerId;
    if (initializer.userId) this.userId = initializer.userId;
    if (initializer.date) this.date = new Date(initializer.date);
    if (initializer.startTime) this.startTime = new Date(initializer.startTime);
    if (initializer.endTime) this.endTime = new Date(initializer.endTime);
    if (initializer.status) this.status = initializer.status;
    if (initializer.notes) this.notes = initializer.notes;
  }

  public static fromJson(value: MeetingInterface): Meeting {
    return new Meeting(value);
  }

  public static fromJsonArray(value: MeetingInterface[]): Meeting[] {
    return value.map((item) => new Meeting(item));
  }

  public toString(): string {
    return `Meeting: ${this.id} ${this.title} ${this.customerId} ${this.userId} ${this.date} ${this.startTime} ${this.endTime} ${this.status} ${this.notes}`;
  }

  public toJson(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      customerId: this.customerId,
      userId: this.userId,
      date: this.date,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status,
      notes: this.notes,
    };
  }
}
