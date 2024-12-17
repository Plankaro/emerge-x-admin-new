export interface ResponseType {
    success: boolean;
    message: string;
}

export interface NewsFormData {
    heading: string;
    mainDescription: string;
    description1: string;
    description2: string;
    finalDescription: string;
    heroBanner: string | null;
    featureImage: string | null;
    subFeatureImage1: string | null;
    subFeatureImage2: string | null;
}