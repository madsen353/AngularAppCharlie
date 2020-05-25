
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of, from, fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DbserviceService {

  private baseurl : string = "http://localhost:3000/getPossibleQuests";

  constructor(private http : HttpClient) { 
  }
  getAllQuests() : Observable<any> {

    return this.http.get("http://localhost:3000/getPossibleQuests");
    // const source = new EventSource("http://localhost:3000/getPossibleQuests");

    // // Definer Observable
    // let stream = fromEvent(source, "message");

    // //Retur Observable
    // return stream;

  }
}  

