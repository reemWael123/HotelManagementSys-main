export interface TableColumn {
  type: string;
  header: string;
  field: string;
  format?: string;
  defaultImage?: string;
  objectKey?: string;
  decimalPlaces?: number;
  isFrozen?: boolean;
  frozenDirection?: string;
  actions?: {
    isView?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
  };
}
