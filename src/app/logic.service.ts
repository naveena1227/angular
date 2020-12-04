import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  naveena:any=[];
  constructor() { }
  setjson(data)
  {
    this.naveena=data;
  }
  getjson(){
    return this.naveena
  }
}
