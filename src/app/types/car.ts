export interface CarBase {
  unique_id: number;
  mark_id: string;
  folder_id: string;
  price: number;
}

export interface CarDetails {
  mark_cyrillic_name?: string;
  model_name?: string;
  model_cyrillic_name?: string;
  images?: CarImages;
  modification_id?: string;
  complectation_name?: string;
  run?: number;
  gearbox?: string;
  engine_power?: string;
  engine_type?: string;
  color?: string;
  year?: number;
  owners_number?: string;
}

export interface CarImages {
  image: string[];
}

export type Car = CarBase & CarDetails;

export interface CarMeta {
  page: number;
  last_page: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface SortOption {
  value: string;
  label: string;
}