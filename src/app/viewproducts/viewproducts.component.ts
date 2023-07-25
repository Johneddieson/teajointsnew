import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { data } from 'jquery';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.scss']
})
export class ViewproductsComponent implements OnInit {
public products: any[] = []
  constructor(public db: DBService) 
  { 
    this.getProducts()
  }

  ngOnInit(): void 
  {
  }

  getProducts()
  {
    this.db.getData('Products')
    .subscribe((data) => 
    {
      data.map((i, index) => 
      {
        var imageConverted = i.ImageUrl.split("/")
        i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/70x70/`
  
      })
      this.products = data;
      console.log("ew", this.products)
    })
  }


}
