export interface PropertyProps {
    nieruchomosci: Nieruchomosc[];
}

export interface GalleryItem {
    fields: any;
    file: {
        url: string;
        details: string;
        fileName: string;
        contentType: string;
    };
    title: string;
}

export interface Nieruchomosc {
    fields: {
        title: string;
        address: string;
        description: string;
        gallery: GalleryItem;
        price: number;
        numberOfRooms: number;
        typeOfProperty: string;
        contact: string;
        slug: string;
        area: number;
        tranactionType: string;
    };
    sys: {
        id: string;
    }
};


export interface PropertyCardProps {
    nieruchomosc: Nieruchomosc;
}

