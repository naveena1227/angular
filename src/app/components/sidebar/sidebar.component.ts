import { Component, OnInit } from "@angular/core";
import{LogicService} from 'src/app/logic.service';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

declare interface RouteInfo {
  path: string;
  title: string;
  
 
  
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard"
    
    
   
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(    public logic:LogicService,
    private http:HttpClient) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
  searchname:any;
  displaydetails()
  {
   
   alert("naveena") 
      if ((this.searchname == 'naveena')) {
       this.logic.naveena = [
          {
            "name": 'naveena',
            "pathology": 'tb',
            "patientid": "1028269",
            "studydate": "12-12-2019",
            "birthdate": "12-27-1997",
            "age": "22",
            "sex": "female",
            "modality": "cr",
            "image":"assets/img/mike.jpg"
    
          }
        ];
    
      }
      else {
         this.logic.naveena = [{
          "name": 'pandu',
            "pathology": 'fever',
            "patientid": "123456",
            "studydate": "12-12-2019",
            "birthdate": "12-20-1997",
            "age": "18",
            "sex": "female",
            "modality": "abc",
            "image":"assets/img/james.jpg"
        }
    
        ];
    
      }
      alert(this.searchname) 
    console.log(this.logic.naveena)
    this.logic.setjson(this.logic.naveena)
    
      let studyParams = new HttpParams();
      studyParams = studyParams.append("patientId", this.searchname)
      let header = new HttpHeaders();
      header.append('Content-type', 'application/json');
      console.log("***Get Study", this.searchname);
      return this.http.get("http://localhost:4500/getStudy", { headers: header, params: studyParams }).subscribe((response: any) => {
    
        if (response && response.length > 0) {
    
          response.forEach((element: { name: any; pathology:any; patientid:any; studydate:any; birthdate:any; age:any;sex:any;modality:any;image:any }) => {
            this.logic.naveena.push({
    
              "name": element.name,
              "pathology": element.pathology,
              "patientid": element.patientid,
              "studydate": element.studydate,
              "birthdate": element.birthdate,
              "age": element.age,
              "sex": element.sex,
              "modality": element.modality,
              "image":element.image
    
            })
          });
    
    
        }
    
      })
  }
}
