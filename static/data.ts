import { StaticImageData } from "next/image";
import { Document } from '@contentful/rich-text-types';

export interface PropertyProps {
    nieruchomosci: Nieruchomosc[];
}

export interface GalleryItem {
    fields: {
        title: string;
        file: {
            url: string;
        };
    };
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
        special: boolean;
    };
    sys: {
        createdAt: string;
        id: string;
    }
};

export interface PropertyCardProps {
    nieruchomosc: Nieruchomosc;
}
export interface PropertyProps {
    nieruchomosci: Nieruchomosc[];
}

export interface FeaturedPropertiesProps {
    nieruchomosci: Nieruchomosc[];
}

export interface Photo {
    fields: {
        file: {
            url: string;
        };
        title: string;
    };
}

export interface PropertyDetailsProps {
    nieruchomosci: {
        fields: {
            special: boolean;
            address: string;
            area: number;
            contact: string;
            description: Document;
            photos: Photo[];
            price: number;
            title: string;
            transactionType: string;
            typeOfProperty: string;
        };
    };
}

export interface TeamMemberProps {
    name: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    image: StaticImageData;
    license: string;
}
