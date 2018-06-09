export class TaskObject {
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

export class TimeObject {
  hour: number;
  minute: number;
}

export class LabelData {
  key: string;
  value: LabelDataValue;
}

export class LabelDataValue {
  public count: number;
  public total: number;
}

export class TaskData {
  completed: number;
  scheduled: number;
  total: number;
}

export class CountDuration {
  count: number;
  duration: number;
}

export class taskLabels {
  label: string;
}
