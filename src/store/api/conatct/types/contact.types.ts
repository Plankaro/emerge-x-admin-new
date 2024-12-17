// Contact Interface
export interface Contact {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Page Interface
export interface Page {
    number: number;
    url: string;
}

// Main Response Interface
export interface ContactResponse {
    contact: Contact[];
    pages: Page[];
    nextPage: boolean;
    currentPage: number;
    previousPage: boolean;
}
