import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, catchError, of} from "rxjs";
import { forms } from '../Model/forms';
import { field } from '../Model/field';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  GetForms(): Observable<forms[]> {
    return this.http.get<forms[]>("http://localhost:8081/forms");
  }
  GetFormField(formid: number, versionid: number): Observable<field[]> {
    return this.http.get<field[]>(`http://localhost:8081/forms/formid/${formid}/versionid/${versionid}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching form fields:', error);
          return of([]); // Return an empty array or handle the error as needed
        })
      );
  }
  Gettool():Observable<forms[]>{
    return this.http.get<forms[]>("http://localhost:8081/tools");
  }
  saveForms(data: any, groupid: any) {

   
    
    let newForms: forms = {
      formid:data.formid ? data.formid : null,
      formname: data.formname ? data.formname : null,
      description: data.description ? data.description : null,
      versionnumber: data.versionnumber ? data.versionnumber : null,
      fieldsList: []
    };

    for (let f of data.fieldsList) {
      let newField: field = {
        indexs: f.indexs ? f.indexs : null,
        fieldName: f.fieldName ? f.fieldName : null,
        isoptional: f.isoptional ? f.isoptional : false,
        toolid: f.toolid ? f.toolid : null,
        names: f.names ? f.names : null
      };
      console.log(f.indexs,newField.indexs);
      newForms.fieldsList.push(newField);
  }
  console.log(newForms);
      this.http.post('http://localhost:8081/forms/creating', newForms).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  savefilleddata(versionid:number,userid:number,filleddata:any){
    this.http.post('http://localhost:8081/forms/'+versionid,'/'+userid, filleddata).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

}
