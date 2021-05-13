export interface IndiaStates {
  states: [SState];
  ttl: number;
}

export interface SState {
  state_id: number;
  state_name: string;
}

export interface Districts {
  districts: [City];
  ttl: number;
}

export interface City {
  district_id: number;
  district_name: string;
}
