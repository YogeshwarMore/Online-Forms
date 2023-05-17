import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {Observable, catchError, of} from "rxjs";
=======
import { Observable } from "rxjs";
>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647
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
<<<<<<< HEAD
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
=======
  Gettool(): Observable<forms[]> {
>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647
    return this.http.get<forms[]>("http://localhost:8081/tools");
  }
  saveForms(data: any, groupid: any) {


    let newForms: forms = {
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


      newForms.fieldsList.push(newField);

<<<<<<< HEAD
  }
  console.log(newForms);
      this.http.post('http://localhost:8081/forms/creating', newForms).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
=======
    }
    console.log(newForms);
    this.http.post('http://localhost:8081/forms', newForms).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
>>>>>>> 89f4d68668da71697cc9580e1703ca09117ac647
  }

}
