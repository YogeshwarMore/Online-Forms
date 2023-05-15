import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { forms } from '../Model/forms';
import { field } from '../Model/field';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }

  GetForms():Observable<forms[]>{
    return this.http.get<forms[]>("http://localhost:8081/forms");
  }
  Gettool():Observable<forms[]>{
    return this.http.get<forms[]>("http://localhost:8081/tools");
  }
  saveForms(data:any,groupid:any){
   
    
    let newForms: forms = {
      formname: data.formname ? data.formname : null,
      description: data.description ? data.description : null,
      versionnumber: data.versionnumber ? data.versionnumber : null,
      fieldsList: []
    };
    
    for(let f of data.fieldsList){
    let newField: field = {
      indexs: f.indexs ? f.indexs : null,
      fieldName: f.fieldName ? f.fieldName : null,
      isoptional: f.isoptional ? f.isoptional : false,
      toolid: f.toolid ? f.toolid : null,
      names: f.names ? f.names : null
    };


    newForms.fieldsList.push(newField);

  }
  console.log(newForms);
      this.http.post('http://localhost:8081/forms/'+groupid, newForms).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

}
