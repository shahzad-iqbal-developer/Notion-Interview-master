import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agency } from './response-payload/agency.model';
import { AgencyDetails } from './response-payload/agency-details.model';


@Injectable({
  providedIn: 'root'
})
export class MainService {

private readonly getAgenciesURL = "https://api.foia.gov/api/agency_components?&&fields[agency_component]=title,abbreviation,website,submission_address"
private readonly x_api_key = environment.key;
private readonly headers;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'X-API-Key':this.x_api_key});
   }

  getAgencies(pageSize:number):Observable<Agency>{    
    return this.http.get<Agency>(`${this.getAgenciesURL}&page[limit]=${pageSize}`,{headers:this.headers})
  }

  getNextAgencies(url:string):Observable<Agency>{   
    return this.http.get<Agency>(url,{headers:this.headers})
  }

  getAgenciesDetail(url:string):Observable<AgencyDetails>{  
    return this.http.get<AgencyDetails>(url,{headers:this.headers})
  }

}
