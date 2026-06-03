export interface ServiceItem {
  service_id: string;
  name: string;
  icon: string;
  tagline?: string;
  description?: string;
  package_1_name?: string;
  package_1_price?: number;
  package_2_name?: string;
  package_2_price?: number;
  package_3_name?: string;
  package_3_price?: number;
}

export interface ServiceFormData {
  name: string;
  tagline: string;
  description: string;
  icon: File | null;
  package_1_name: string;
  package_1_price: string;
  package_2_name: string;
  package_2_price: string;
  package_3_name: string;
  package_3_price: string;
}


