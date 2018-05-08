export class TaskObject {
  public user: string;
  public _id: string;
  public name: string;
  public duration: number;
  public start_time: number;
  public end_time: number;
}

export class CompletedTask {
  public user: string;
  public _id: string;
  public name: string;
  public duration: number;
  public start_time: number;
  public end_time: number;
}

export class dateEntry {
  day: number;
  month: number;
  year: number;
}

export class NewLabelObject{
  _id: string;
  name: string;
}

export class CreateLabelObject {
  name: string;
  user: string;
}

export class AddLabel {
  task: string;
  labels: string[];
}

export class ReturnedLabelObject{
  user: string;
  name: string;
  _id: string;
  tasks: string[];
}

export class LabelObject{
  user: string;
  _id: string;
  name: string;
  tasks: string[];
}

export class ProjectObject {
  user: string;
  name: string;
  task: string;
}

export class TimeObject {
  hour: number;
  minute: number;
}
