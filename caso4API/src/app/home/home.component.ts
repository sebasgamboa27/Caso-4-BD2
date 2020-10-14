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
    this.mongoResult = await this.database.mongoSearch();
    debugger;
    console.log(this.mongoResult);
  }

  async SQL(){
    this.SQLResult = await this.database.getHastagsSQL();
    console.log(this.SQLResult);
  }

}
