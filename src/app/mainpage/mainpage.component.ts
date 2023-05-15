import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'owl.carousel';
import { DBService } from '../services/db.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
firstcarouselarray: any[] = []
groupedbycategoryfirstindexofitem: any[] = []
  constructor(private db:DBService) 
  {
    // this.db.getProducts().subscribe((data) => 
    // {
    //   this.firstcarouselarray = data.filter(f => 
    //     f.Category == 'Platters' || f.Category == 'Rice Meal' ||
    //     f.Category == 'Noodles' || f.Category == 'Shakes'
    //     || f.Category == 'Pares')
    //     var groupedbycategory = _(this.firstcarouselarray).groupBy('Category')
    //    .map((items, category) => 
    //    {
    //     return items
    //   }).value() 
    //     for(let i  = 0; i < groupedbycategory.length; i++)
    //     {
    //       this.groupedbycategoryfirstindexofitem.push(groupedbycategory[i][0])
    //     }
    //   })

   }
  ngOnInit(): void 
  {

    (function ($) 
    {
      $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
  
            0: {
                items: 1,
            },
  
            480: {
                items: 2,
            },
  
            768: {
                items: 3,
            },
  
            992: {
                items: 4,
            }
        }
    });
    
  
    $(".latest-product__slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: false,
      nav: true,
      navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true
  });
  })(jQuery);
  }

}
