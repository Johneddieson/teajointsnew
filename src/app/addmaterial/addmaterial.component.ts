import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addmaterial',
  templateUrl: './addmaterial.component.html',
  styleUrls: ['./addmaterial.component.scss']
})
export class AddmaterialComponent implements OnInit {
itemname: any;
stock: any

  constructor() { }

  ngOnInit(): void {
  }

}
