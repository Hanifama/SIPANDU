export interface GalleryItem {
  gallery_id: string;
  name: string;
  alt: string;
  image: string;
  image_url: string;
  created_dt: string;
}

export interface CreateGalleryRequest {
  name: string;
  alt: string;
  image: File;
}

export interface CreateGalleryResponse {
  status: boolean;
  message: string;
  data: GalleryItem;
}
