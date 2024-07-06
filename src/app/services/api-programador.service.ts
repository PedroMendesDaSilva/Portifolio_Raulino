import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProgramadorService {

  constructor(
    private http:HttpClient
  ) { }


  public buscaPiada():Observable<any>{
    return this.http.get('https://official-joke-api.appspot.com/jokes/programming/random')
    }


}


