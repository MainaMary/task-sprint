export interface ColumnType {
  id: string | number;
  title: string;
}
export interface Tasktype {
  id: string;
  task: string;
  columnId: string | number;
}
