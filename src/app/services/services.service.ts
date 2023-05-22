import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from "rxjs";
import { forms } from '../model/forms';
import { field } from '../model/field';
import { filledform } from '../model/filledform';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  GetForms(): Observable<forms[]> {
    return this.http.get<forms[]>("http://localhost:8081/forms");
  }
  GetFilledForms(versionId: number): Observable<filledform[]> {
    return this.http.get<filledform[]>("http://localhost:8081/forms/" + versionId);
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
  Gettool(): Observable<forms[]> {
    return this.http.get<forms[]>("http://localhost:8081/tools");
  }

  getOptionId(name: string): Observable<number> {
    const url = `http://localhost:8081/forms/options/${name}`;
    return this.http.get<number>(url);
  }

  saveForms(form: forms, field: field[]) {

    form.fieldsList = field;
    this.http.post('http://localhost:8081/forms/creating', form).subscribe(
      (response) => alert("response is submitted"),
      (error) => alert("there is some system error")
    );
  }

  saveFilledData(versionId: number, userId: number, filledData: filledform[]) {
    this.http.post(`http://localhost:8081/forms/${versionId}/${userId}`, filledData)
      .subscribe(
        (response) => {
          alert("Response has been submitted");
        },
        (error) => {
          alert("There is a system error");
        }
      );
  }

}
