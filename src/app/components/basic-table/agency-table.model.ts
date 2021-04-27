import { SubmissionAddress, Website } from "src/app/service/response-payload/agency.model";

export interface AgencyTable{
    id:string                
    title:string              
    abbreviation:string       
    website:Website            
    submission_address: string
    next:string               
    self:string             
}