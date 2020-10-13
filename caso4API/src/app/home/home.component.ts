import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/interfaces/articulo';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mongoResult: Articulo[];
  SQLResult: Articulo[];

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  elastic(){
    this.database.getHashtagsElastic();
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
