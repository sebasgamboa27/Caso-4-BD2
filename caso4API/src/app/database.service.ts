import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Articulo } from 'src/interfaces/articulo';
import { Word } from 'src/interfaces/words';

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
    return await this.http.post<Articulo[]>('http://localhost:3000/getHashtagsSQL',{}).toPromise();
  }

  async getHashtagsElastic() {
    return await this.http.get<Word[]>('http://localhost:3020/elastictest').toPromise();
  }

  async mongoSearch() {
    return await this.http.get<Articulo[]>('http://localhost:3050/mongoSearch').toPromise();
  }

}