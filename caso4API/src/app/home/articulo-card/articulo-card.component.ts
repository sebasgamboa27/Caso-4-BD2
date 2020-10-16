import { Component, Input, OnInit } from '@angular/core';
import { Articulo } from 'src/interfaces/articulo';

@Component({
  selector: 'app-articulo-card',
  templateUrl: './articulo-card.component.html',
  styleUrls: ['./articulo-card.component.css']
})
export class ArticuloCardComponent implements OnInit {

  @Input() articulo: Articulo;
  @Input() isSQL: boolean;

  constructor() { }

  ngOnInit(): void {
  }


}
