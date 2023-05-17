import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DBService } from '../services/db.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
public curentpath: string = ''
public hero: string = ''
public categorylist: any[] = []
public bannerproduct: any[] = []
  constructor(private db:DBService) 
  { 
     // get products list
     this.db.getProducts().subscribe((data)=>
     {
      var groupedbycategory = _(data).groupBy('Category')
       .map((items, category) => 
       {
        return category
      }).value() 
        this.categorylist = groupedbycategory
      })

    // end of get products list
  }

  ngOnInit(): void 
  {
    setInterval(() => 
    {
      this.curentpath = window.location.pathname;
    }, 100)


    $('.hero__categories__all').on('click', function()
    {
      $('.hero__categories ul').slideToggle(400);
    });
  }

}
