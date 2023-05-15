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
      formname: data.formname,
      description: data.description,
      versionnumber: data.versionnumber,
      fieldsList: []
    };
    
    for(let f of data.fieldsList){
    let newField: field = {
      indexs: f.indexs,
      fieldName: f.fieldName,
      isoptional: f.isoptional,
      toolid: f.toolid,
      names: f.names
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
