export class TaskObject {
  public user: string;
  public name: string;
  public duration: number;
  public start_time: Date;
  public end_time: Date;
}

export class CompletedTask {
  public user: string;
  public _id: string;
  public name: string;
  public duration: number;
  public start_time: Date;
  public end_time: Date;
}

export class LabelObject{
  user: string;
  name: string;
  id: string;
  tasks: string[];
}

export class ProjectObject {
  user: string;
  name: string;
  task: string;
}
