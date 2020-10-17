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

  async getHastagsSQL(hashtags: string[]) {
    return await this.http.post<Articulo[]>('http://localhost:3000/getHashtagsSQL',{hash:hashtags}).toPromise();
  }

  async getHashtagsElastic(levelMin: number, levelMax: number) {
    return await this.http.post<string[]>('http://localhost:3020/elastictest',{min:levelMin,max:levelMax}).toPromise();
  }

  async mongoSearch(hashtags: string[]) {
    return await this.http.post<Articulo[]>('http://localhost:3050/mongoSearch',{hash:hashtags}).toPromise();
  }

  async redisSearch(hashtags: string[]) {
    return await this.http.get<Articulo[]>('http://localhost:5000/hashtags').toPromise();
  }

  redisSearch2(hashtags: string[],callback: (data: any) => void) {
    this.http.get<any>('http://localhost:5000/hashtags', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        hash: hashtags
      })
    }).subscribe(callback);
  }


}