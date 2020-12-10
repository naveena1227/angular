import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import{LogicService} from 'src/app/logic.service';
import { NavbarComponent } from "src/app/components/navbar/navbar.component"
// import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent  {

 
  constructor(public logic:LogicService) {
    
  }
 
  ngOnInit() {


  }

}

  