import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}


  //Este es un ejemplo de peticion hacia el API de SQL SERVER

  async getHastagsSQL() {
    return await this.http.get<any>('http://localhost:3000/getHashtagsSQL').toPromise();
  }

  async getHashtagsElastic() {
    return await this.http.get<any>('http://localhost:3020/elastictest').toPromise();
  }

}