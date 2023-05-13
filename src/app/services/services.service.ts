import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { forms } from '../Model/forms';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }

  GetForms():Observable<forms[]>{
    return this.http.get<forms[]>("http://localhost:8081/forms");
  }
}
