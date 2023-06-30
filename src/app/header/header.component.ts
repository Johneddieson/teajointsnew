import { AngularFireAuth } from '@angular/fire/compat/auth';
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
public numbers: number = 0
public favoritesLength: number = 0
getCartDetails: any[] = []
total: number = 0;
tapsilogArray: any[] = []
  constructor(
    private db:DBService,
    private afauth: AngularFireAuth
    ) 
  { 
    this.afauth.authState.subscribe((data) => 
    {
        if (data && data.uid)
        {
          this.db.getDataById('users', data.uid)
          .subscribe((data) => 
          {
                this.favoritesLength = data.Favorites != undefined || data.Favorites != null ?
                data.Favorites.length : 0
          })
        }
    })
  
     // get products list
     this.db.getProducts().subscribe((data)=>
     {
      var groupedbycategory = _(data).groupBy('Category')
       .map((items, category) => 
       {
        return category
      }).value() 
        this.categorylist = groupedbycategory
     
     var tapsifilter = data.filter(f => f.Category == 'Silog Meals' && f.ProductName == 'Tapsilog');
     this.tapsilogArray = tapsifilter;  
    })

    // end of get products list
  }
  loadCartLength() 
  {
    if (sessionStorage.getItem('cart') != null) 
    {
      var thearray = [];
      thearray.push(JSON.parse(sessionStorage.getItem('cart') as any));
      this.numbers = thearray[0].length;

      this.total = thearray[0].reduce((acc:any, val:any) => {
        return acc + val.UnitPrice * val.Quantity;
      }, 0);
    } 
    else {
      this.numbers = 0;
      this.total = 0;
    }
  }
  ngOnInit(): void 
  {
    setInterval(() => 
    {
      this.loadCartLength()
      this.curentpath = window.location.pathname;
    }, 100)


    $('.hero__categories__all').on('click', function()
    {
      $('.hero__categories ul').slideToggle(400);
    });
  }

}
