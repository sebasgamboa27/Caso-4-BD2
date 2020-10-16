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

  mongoResult: Articulo[];
  SQLResult: Articulo[];
  elasticResults: Word[];
  wordsList: string[] = [];

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  async elastic(){
    this.elasticResults = await this.database.getHashtagsElastic();
    console.log(this.elasticResults);
    
    this.elasticResults.forEach(res => {
      this.wordsList.push(res._source.palabra);
    });


  }

  async mongo(){

    //const words = this.wordsList;
    const words = ['lise','curiosidad','ciencias']
    this.mongoResult = await this.database.mongoSearch(words);
    debugger;
    console.log(this.mongoResult);
  }

  async SQL(){
    //const words = this.wordsList;
    const words = ['lise','curiosidad','ciencias']
    this.SQLResult = await this.database.getHastagsSQL(words);
    console.log(this.SQLResult);
  }

}
