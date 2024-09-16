export interface PropertyProps {
    nieruchomosci: Nieruchomosc[];
}

export interface GalleryItem {
    fields: any;
    photos: Array<{
        fields: {
            title: string;
            file: {
                url: string;
            };
        };
    }>;
}

export interface GalleryPhoto {
    photos: Array<{
        fields: {
            details: string,
            title: string;
            file: {
                url: string;
            };
        };
    }>;
}

export interface Nieruchomosc {
    length: number;
    fields: {
        title: string;
        address: string;
        description: string;
        gallery: GalleryItem;
        photos: GalleryPhoto;
        price: number;
        numberOfRooms: number;
        typeOfProperty: string;
        contact: string;
        slug: string;
        area: number;
        transactionType: string;
    };
    sys: {
        createdAt: string;
        id: string;
    }
};

export interface PropertyCardProps {
    nieruchomosc: Nieruchomosc;
}




