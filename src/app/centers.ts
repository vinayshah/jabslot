export interface Centers {
  centers: [Center];
}

export interface Center {
  center_id: number;
  name: string;
  address: string;
  state_name: string;
  pincode: number;
  sessions: [CenterSession];
}

export interface CenterSession {
  session_id: string;
  date: string;
  available_capacity: number;
  min_age_limit: number;
  vaccine: string;
  slots: [];
}
