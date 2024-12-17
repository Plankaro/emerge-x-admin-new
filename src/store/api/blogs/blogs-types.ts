export interface ResponseType {
    success: boolean;
    message: string;
}

export interface BlogsFormData {
    title: string;
    htmlBody: string;
    description: string;
    bannerImage: string | null;
    futureImages: string | null;
}