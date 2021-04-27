
    export interface Self {
        href: string;
    }

    export interface Links {
        self: string;
        next : string;
        previous:string;
    }

    export interface Meta {
        links: Links;
    }

    export interface Jsonapi {
        version: string;
        meta: Meta;
    }
   

    export interface Website {
        uri: string;
        title: string;
        options: any[];
    }

    export interface SubmissionAddress {
        langcode: string;
        country_code: string;
        administrative_area: string;
        locality: string;
        dependent_locality?: any;
        postal_code: string;
        sorting_code?: any;
        address_line1: string;
        address_line2: string;
        organization?: any;
        given_name?: any;
        additional_name?: any;
        family_name?: any;
    }

    export interface Attributes {
        title: string;
        abbreviation: string;
        website: Website;
        submission_address: SubmissionAddress;
    }

    export interface Datum {
        type: string;
        id: string;
        links: Links;
        attributes: Attributes;
    }

    export interface Next {
        href: string;
    }

    
    export interface Agency {
        jsonapi: Jsonapi;
        data: Datum[];
        links: Links;
    }



