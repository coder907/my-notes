import { ColumnFormat } from './column-format';



export interface ColumnDefinition {
  name: string;
  description: string;
  format: ColumnFormat;
  enum?: object;
  width?: string;
}
