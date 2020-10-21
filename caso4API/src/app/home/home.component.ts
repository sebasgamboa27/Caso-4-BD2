import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/interfaces/articulo';
import { Word } from 'src/interfaces/words';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mongoResult: Articulo[] = [];
  SQLResult: Articulo[] = [];
  elasticResults: string[] = [];
  minLevel: number = 0;
  maxLevel: number = 10;

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async elastic(){
    this.clearElastic();
    this.elasticResults = await this.database.getHashtagsElastic(this.minLevel,this.maxLevel);
    console.log(this.elasticResults);

  }

  async mongo(){

    const words = this.elasticResults;

    this.mongoResult = await this.database.mongoSearch(words);
    debugger;
    console.log(this.mongoResult);
  }

  async SQL(){
    const words = this.elasticResults;
    let res = await this.database.getHastagsSQL(words);
    debugger;

    for (let i = 0; i < res.length; i++) {
      let isIn = true;
      for (let j = 0; j < this.SQLResult.length; j++) {
        if(res[i].NombreArticulo === this.SQLResult[j].NombreArticulo){
          isIn = false;
        }
      }
      
      if(isIn){
        this.SQLResult.push(res[i]);
      }
    }
    console.log(this.SQLResult);
  }

  async redis(){
    const words = this.elasticResults;
    this.SQLResult = await this.database.redisSearch(words);
    console.log(this.SQLResult);
  }

  async redisMongo(){
    const words = this.elasticResults;
    this.mongoResult = await this.database.redisSearchMongo(words);
    console.log(this.mongoResult);
  }

  changeMinLevel(num: number){
    this.minLevel = num;
  }

  changeMaxLevel(num: number){
    this.maxLevel = num;
  }

  clearAll(){
    this.SQLResult = [];
    this.mongoResult = [];
    this.elasticResults = [];
  }

  clearElastic(){
    this.elasticResults = [];
    console.log('funciona');
  }

}
