export interface ColumnType {
  id: string | number;
  title: string;
}
export interface Tasktype {
  id: string;
  task: string;
  columnId: string | number;
}
export interface SingleTaskType {
  task: {
    id: string;
    task: string;
  };
}
export interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
}
export interface CardType {
  item?: ColumnType;
  tasks: Tasktype[];
  activeColumn?: ColumnType | null;
}
