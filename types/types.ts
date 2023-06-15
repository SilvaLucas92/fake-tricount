export interface CountItem {
  _id: string;
  title: string;
  amount: number;
  created_at: null | string | undefined;
  paid_by: string;
  countID?: string;
  __v: number;
}

export interface selectOptions {
  value: string;
  label: string;
}

export interface InputProps {
  name: string;
  error?: any;
  label?: string;
  disabled?: boolean;
  value?: any;
  onChange?: any;
  placeholder?: string;
  type: string;
}

export interface Count {
  _id: string;
  title: string;
  description: string;
  created_by: string;
  participant: string;
}

export interface Alert {
  type: string;
  msg: string;
}
