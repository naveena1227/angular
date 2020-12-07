import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import{LogicService} from 'src/app/logic.service';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
searchvalue:any;
  public isCollapsed = true;

  closeResult: string;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    public logic:LogicService,
    private http:HttpClient
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
   updateColor = () => {
   var navbar = document.getElementsByClassName('navbar')[0];
     if (window.innerWidth < 993 && !this.isCollapsed) {
       navbar.classList.add('bg-white');
       navbar.classList.remove('navbar-transparent');
     } else {
       navbar.classList.remove('bg-white');
       navbar.classList.add('navbar-transparent');
     }
   };
  ngOnInit() {
    window.addEventListener("resize", this.updateColor);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {

      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }

    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnDestroy(){
     window.removeEventListener("resize", this.updateColor);
  }

  selectedfile:any


  displayfile() {

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
        "image":"assets/img/james.jpg"

      }

    ];
    this.logic.setjson(this.logic.naveena)
    
    let fromData= new FormData();
    fromData.append('file',this.selectedfile)
    console.log("Study : ", this.selectedfile)


    this.http.post("http://127.0.0.1:5011/sendimage", fromData)
      .subscribe((result) => {
        console.warn("result", result)
      })



    this.sleep(10000).then(() => {  
      let header = new HttpHeaders();
      header.append('Content-type','application/json');
      console.log("naveena")
    return this.http.get("http://127.0.0.1:5011/search", { headers: header }).subscribe((response: any) => {

      if (response && response.length > 0) {

        response.forEach((element: { name: any; pathology:any; patientid:any; studydate:any; birthdate:any; age:any;sex:any;modality:any;image:any}) => {
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
  });
  }
  onselectedfile(event: any) {
    this.selectedfile = event.target.files[0];


  }

  sleep(ms: number) {
    alert("naveena")
   return new Promise(resolve => setTimeout(resolve, ms));
 }



selectedsearch:any;

 onselectedsearch(event: any) {

  this.selectedsearch = <string>event.target.value;

alert(this.selectedsearch)
  this.displaysearch()
}
searchname: any
displaysearch() {

  this.searchname = this.selectedsearch
alert(this.selectedsearch)
  if ((this.searchname == 'one')) {
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
console.log(this.logic.naveena)
this.logic.setjson(this.logic.naveena)

  let studyParams = new HttpParams();
  studyParams = studyParams.append("patientId", this.searchname)
  let header = new HttpHeaders();
  header.append('Content-type', 'application/json');
  console.log("***Get Study", this.searchname);
  return this.http.get("http://http://127.0.0.1:5011/search", { headers: header, params: studyParams }).subscribe((response: any) => {

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
