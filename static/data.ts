export interface PropertyProps {
    nieruchomosci: Nieruchomosc[];
}

export interface GalleryItem {
    fields: any;
    // fields: any;
    // file: {
    //     url: string;
    //     details: string;
    //     fileName: string;
    //     contentType: string;
    // };
    // title: string;
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
    //     fields: any;
    //     file: {
    //         url: string;
    //         details: string;
    //         fileName: string;
    //         contentType: string;
    //     };
    //     title: string;
    // }
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
        id: string;
    }
};

export interface PropertyCardProps {
    nieruchomosc: Nieruchomosc;
}

