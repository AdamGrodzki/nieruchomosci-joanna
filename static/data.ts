// export interface Nieruchomosc {
//     sys: {
//         id: string;
//     };
//     fields: {
//         title: string;
//     }
// }

export interface PropertyProps {
    nieruchomosci: Nieruchomosc[];
}


interface GalleryItem {
    fields: any;
    file: {
        url: string;
        details: string; // Replace with the appropriate type if known
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
    };
    sys: {
        id: string;
    }
};


export interface PropertyCardProps {
    nieruchomosc: Nieruchomosc;
}


