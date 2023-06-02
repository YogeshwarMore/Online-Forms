import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from "rxjs";
import { forms } from '../model/forms';
import { field } from '../model/field';
import { filledform } from '../model/filledform';
import { Form } from '@angular/forms';
import { data } from '../model/formfilleddata';
import { Router } from '@angular/router';
import { userdata } from '../model/userdata';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  constructor(private http: HttpClient, private router: Router) { }

  getHeaders() {

    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

  }

  GetForms(): Observable<forms[]> {
    const headers = this.getHeaders();
    console.log(headers);
    return this.http.get<forms[]>("http://localhost:8081/forms", { headers });
  }
  GetFilledForms(versionId: number): Observable<filledform[]> {
    const headers = this.getHeaders();
    return this.http.get<filledform[]>("http://localhost:8081/forms/" + versionId, { headers });
  }

  GetFormField(formid: number, versionid: number): Observable<field[]> {
    const headers = this.getHeaders();
    return this.http.get<field[]>(`http://localhost:8081/forms/formid/${formid}/versionid/${versionid}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching form fields:', error);
          return of([]);
        })
      );
  }

  Gettool(): Observable<forms[]> {
    const headers = this.getHeaders();
    return this.http.get<forms[]>("http://localhost:8081/tools", { headers });
  }

  getOptionId(name: string): Observable<number> {
    const headers = this.getHeaders();
    const url = `http://localhost:8081/forms/options/${name}`;
    return this.http.get<number>(url, { headers });
  }

  getUserData(id: number): Observable<data[]> {
    const headers = this.getHeaders();
    const url = `http://localhost:8081/forms/${id}`;
    return this.http.get<data[]>(url, { headers });
  }

  getFormDetails(id: number): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers);
    const url = `http://localhost:8081/forms/details/${id}`;
    return this.http.get<any>(url, { headers });
  }

  saveForms(form: forms, field: field[]) {
    const headers = this.getHeaders();
    form.fieldsList = field;
    this.http.post('http://localhost:8081/forms/creating', form, { headers }).subscribe(
      (response) => alert("response is submitted"),
      (error) => alert("there is some system error")
    );
  }



  check(user: userdata): Observable<any> {
    return this.http.post<any>('http://localhost:8081/authenticate', user);
  }


  saveFilledData(versionId: number, userId: number, filledData: filledform[]) {
    const headers = this.getHeaders();
    this.http.post(`http://localhost:8081/forms/${versionId}/${userId}`, filledData, { headers })
      .subscribe(
        (response) => {
          this.router.navigate(['/feedback']);
        },
        (error) => {
          alert("There is a system error");
        }
      );
  }

  public setRoles(roles: string) {
    console.log(roles);

    localStorage.setItem('roles', roles);

  }
  public getRoles() {

    return localStorage.getItem('roles');

  }
  public setToken(jwtToken: string) {

    localStorage.setItem('jwtToken', jwtToken);

  }
  public getToken() {

    return localStorage.getItem('jwtToken');

  }
  public clear() {

    localStorage.clear();

  }
  public isLoggedIn() {

    return this.getRoles() && this.getToken();

  }
  public formdataclear() {
    localStorage.removeItem("versionid");
    localStorage.removeItem("formid");
    localStorage.removeItem("formdesc");
    localStorage.removeItem("formname");
    localStorage.removeItem("versionnumber");
  }

  public addformdata(id: string, vid: string, fname: string, fdesc: string, vnum: string) {
    localStorage.setItem("formid", id);
    localStorage.setItem("versionid", vid);
    localStorage.setItem("formname", fname);
    localStorage.setItem("formdesc", fdesc);
    localStorage.setItem("versionnumber", vnum);
  }














}
