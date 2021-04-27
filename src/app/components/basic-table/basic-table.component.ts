import { MainService } from './../../service/main.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Attributes, Datum } from 'src/app/service/response-payload/agency.model';
import { AgencyTable } from './agency-table.model';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.css']
})
export class BasicTableComponent implements OnInit {

  constructor(private service:MainService,private router:Router) {
    ;
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {

    this.getAgencies(10);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  title = 'interview';
  displayedColumns: string[] = ['title', 'website', 'submission_address','action'];
  dataSource = new MatTableDataSource<AgencyTable>();
  currentPage = 0;
  response:any

  getPageSizeOptions(): number[] {
    return [10, 15, 20, 50];
  }

  getAgencies(pageSize:number){
    this.service.getAgencies((pageSize+1))
    .pipe(
      map(agencies=>{
          let mapper:AgencyTable[] = agencies.data.map((agency:Datum)=>{
            this.response= agencies;
              let attributes:AgencyTable = {
                id:agency.id,
                title: this.concatTitleAbbreviation(agency.attributes),
                abbreviation: agency.attributes.abbreviation,
                website: agency.attributes.website,
                submission_address: this.getFormatedAddress(agency),
                next:agency.links.next,
                self:agency.links.self
              }
              return attributes;
          })
          return mapper;
      })

    )
    .subscribe((data:AgencyTable[])=>{

      this.paginator.pageSize=pageSize;
      this.paginator.pageSizeOptions = this.getPageSizeOptions();
      // console.log(data);


      this.dataSource = new MatTableDataSource(data)

      this.dataSource.paginator =this.paginator
    })
  }
  concatTitleAbbreviation(attributes: Attributes): string {
    let title = attributes.title
    if(attributes.abbreviation){
         title = title.concat(`(${attributes.abbreviation})`)
      }
      return title
  }

  getAbbreviation(input:string){

    let regex= /[A-Z]/g
    // console.log(input.match(regex)?.join(''));
    return input.match(regex)?.join('');


  }

  getFormatedAddress(agency:Datum){
    let submission_address = agency.attributes.submission_address;
    let address = "";
    address=`${submission_address.address_line1}, ${submission_address.address_line2}, ${submission_address.locality}, ${submission_address.administrative_area} ${submission_address.postal_code}, ${submission_address.country_code} `
    return address

  }

  changePage(event:any){
    // console.log(event);
    if(event.pageIndex==this.currentPage)
    {
      // console.log("drop");
      this.getAgencies(this.paginator.pageSize);
    }
    else if(this.currentPage<event.pageIndex){
      // console.log("next");
      this.currentPage = event.pageIndex;
      const nextUrl = this.response.links.next.href;
      // console.log(nextUrl);

      this.service.getNextAgencies(nextUrl)
      .pipe(
        map(agencies=>{
          this.response= agencies;
            let mapper:AgencyTable[] = agencies.data.map((agency:Datum)=>{
                let attributes:AgencyTable = {
                  id:agency.id,
                  title: this.concatTitleAbbreviation(agency.attributes),
                  abbreviation: agency.attributes.abbreviation,
                  website: agency.attributes.website,
                  submission_address: this.getFormatedAddress(agency),
                  next:agency.links.next,
                  self:agency.links.self
                }
                return attributes;
            })
            return mapper;
        })

      )
      .subscribe(data=>{



       this.dataSource = new MatTableDataSource(data)



      })


    }
    else{
      // console.log("prev");

      this.currentPage = event.pageIndex;
      // console.log(this.response);

      const prevUrl = this.response.links.prev.href;
      // console.log(prevUrl);

      this.service.getNextAgencies(prevUrl)
      .pipe(
        map(agencies=>{
          this.response= agencies;
            let mapper:AgencyTable[] = agencies.data.map((agency:Datum)=>{
                let attributes:AgencyTable = {
                  id:agency.id,
                  title: this.concatTitleAbbreviation(agency.attributes),
                  abbreviation: agency.attributes.abbreviation,
                  website: agency.attributes.website,
                  submission_address: this.getFormatedAddress(agency),
                  next:agency.links.next,
                  self:agency.links.self
                }
                return attributes;
            })
            return mapper;
        })

      )
      .subscribe(data=>{

        this.dataSource = new MatTableDataSource(data)
      })
    }


  }

  routeToDetail(element:any){
    sessionStorage.setItem("detailURL",element.self.href);
    this.router.navigate([`/agency/${element.id}`])
  }
}





