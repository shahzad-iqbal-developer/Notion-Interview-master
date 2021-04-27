

    export interface Self {
        href: string;
    }

    export interface Links {
        self: Self;
        related: Related;
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

    export interface ReadingRoom {
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
        status: boolean;
        title: string;
        moderation_state?: any;
        request_data_complex_median_days?: any;
        portal_submission_format: string;
        request_data_year?: any;
        website: Website;
        description?: any;
        abbreviation?: any;
        telephone: string;
        request_data_complex_average_days?: any;
        request_data_complex_highest_days?: any;
        request_data_complex_lowest_days?: any;
        email: string[];
        request_data_expedited_average_days?: any;
        request_data_expedited_highest_days?: any;
        request_data_expedited_lowest_days?: any;
        request_data_expedited_median_days?: any;
        is_centralized: boolean;
        reading_rooms: ReadingRoom[];
        field_rep_start?: any;
        request_data_simple_average_days?: any;
        request_data_simple_highest_days?: any;
        request_data_simple_lowest_days?: any;
        request_data_simple_median_days?: any;
        submission_address: SubmissionAddress;
        submission_fax: string;
        submission_web?: any;
    }


    export interface Related {
        href: string;
    }

  

    export interface Agency {
        data: DTO;
        links: Links;
    }

    

   

    export interface FoiaOfficers {
        data: DTO[];
        links: Links;
    }

   

    export interface FieldMisc {
        data: any[];
        links: Links;
    }

   
    export interface PublicLiaisons {
        data: DTO[];
        links: Links;
    }

    
    export interface PaperReceiver {
        data?: any;
        links: Links;
    }

    export interface Meta2 {
        default_data: string;
        status: string;
        open?: any;
        close?: any;
    }

   

    
    export interface RequestForm {
        data: DTO;
        links: Links;
    }

   

    export interface ServiceCenters {
        data: DTO[];
        links: Links;
    }

    export interface Relationships {
        agency: Agency;
        foia_officers: FoiaOfficers;
        field_misc: FieldMisc;
        public_liaisons: PublicLiaisons;
        paper_receiver: PaperReceiver;
        request_form: RequestForm;
        service_centers: ServiceCenters;
    }

    export interface DTO {
        type: string;
        id: string;
        links: Links;
        attributes: Attributes;
        relationships: Relationships;
    }

 

    export interface AgencyDetails {
        jsonapi: Jsonapi;
        data: DTO;
        links: Links;
    }



