export interface Item {
  id: string;
  title: string;
  details: string;
  color: string;
  date: string;
  done: boolean;
}

export interface Todo {
  title: string;
  items: Item[];
}

export interface InProgress {
  title: string;
  items: [];
}

export interface Done {
  title: string;
  items: Item[];
}

export interface State {
  todo: Todo;
  inProgress: InProgress;
  done: Done;
}
