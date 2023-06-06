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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  getHeaders() {

    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

  }

  GetForms(): Observable<forms[]> {
    const headers = this.getHeaders();
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
          this.snackBar.open('Error fetching form fields:', "", {
            duration: 1000,
          });
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

    const url = `http://localhost:8081/forms/details/${id}`;
    return this.http.get<any>(url, { headers });
  }

  saveForms(form: forms, field: field[]) {
    const headers = this.getHeaders();
    form.fieldsList = field;
    this.http.post('http://localhost:8081/forms/creating', form, { headers }).subscribe(
      (response) => this.snackBar.open("response is submitted", "Close", {
        duration: 1000,
      }),
      (error) => this.snackBar.open("there is some system error", "Close", {
        duration: 1000,
      })
    );
  }

  deleteUser(userid: number, vid: number) {
    const headers = this.getHeaders();
    this.http.delete('http://localhost:8081/forms/' + userid + '/' + vid, { headers }).subscribe(
      (Response) => {
        this.snackBar.open('Delete success', 'Close', {
          duration: 1000,
          panelClass: ['success-snackbar'],
        });
        window.location.reload();
      },
      (error) => {
        this.snackBar.open('There is some error', '', {
          duration: 1000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  deleteForm(fid: any) {
    const headers = this.getHeaders();
    this.http.delete('http://localhost:8081/forms/formid/' + fid, { headers }).subscribe(
      () => {
        this.snackBar.open('Delete success', 'Close', {
          duration: 1000,
          panelClass: ['success-snackbar'],
        });
        window.location.reload();
      },
      (error) => {
        this.snackBar.open('There is some error', '', {
          duration: 1000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  deleteVersion(vid: any) {
    const headers = this.getHeaders();
    this.http.delete('http://localhost:8081/forms/versionid/' + vid, { headers }).subscribe(
      () => {
        this.snackBar.open('Delete success', 'Close', {
          duration: 1000,
          panelClass: ['success-snackbar'],
        });
        window.location.reload();
      },
      (error) => {
        this.snackBar.open('There is some error', '', {
          duration: 1000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  updateFormrecived(boolean: boolean, formid: number) {
    const headers = this.getHeaders();
    this.http.put('http://localhost:8081/forms/flag/' + boolean + '/' + formid, null, { headers }).subscribe(
      (response) => this.snackBar.open(""),
      (error) => this.snackBar.open("receiving form " + boolean, "", {
        duration: 1000,
      })
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
          this.snackBar.open("There is a system error", '', {
            duration: 1000,
            panelClass: ['error-snackbar'],
          });
        }
      );
  }

  public setRoles(roles: string) {


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
    this.router.navigate(["/"]);

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
