export interface IResourceEditorProps<T> {
  value: T;
  onChange(newValue: T, oldValue?: T): void;
}

export interface IResourcePickerProps<T> {
  value?: T;
  onChange(newValue: T, oldValue?: T): void;
}
