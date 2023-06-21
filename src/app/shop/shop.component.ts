import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import * as moment from 'moment'
import * as _ from 'lodash';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
latestproducts: any[] = []
firsthalf: any[] = []
secondhalf: any[] = []
categorylist: any[] = []
allproducts: any[] = []
page = 1;
pageSize = 20;
collectionSize = 0;
allproductspagination: any[] = []
    constructor(private db: DBService) {
        this.getProducts()
    }

  ngOnInit(): void 
  {
    (function ($) {
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
  $(".product__discount__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 3,
    dots: true,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {

        320: {
            items: 1,
        },

        480: {
            items: 2,
        },

        768: {
            items: 2,
        },

        992: {
            items: 3,
        }
    }
});
  })(jQuery);
  }
   paginate(array:any, n:any)  {
    const pageSize = Math.ceil(array.length / n);
   
    return Array.from({ length: pageSize }, (_, index) => {
      const start = index * n;
      return array.slice(start, start + n);
    });
  };
  getProducts()
  {
    this.db.getProducts().subscribe((data) => 
      {
        //Get All Products
        this.allproducts = data
        this.allproducts.map((i) => 
        {
          var imageConverted = i.ImageUrl.split("/")
          i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
        })
        const pageSize = Math.ceil(this.allproducts.length / 16);
   
        var pagination = Array.from({ length: pageSize }, (_, index) => {
          const start = index * 16;
          return this.allproducts.slice(start, start + 16);
        });
   
        this.allproductspagination  = pagination
        //console.log("tanga", this.paginate(this.allproducts, 10))
        
        // this.collectionSize = this.allproducts.length;

        // this.allproductspagination = this.allproducts.map((product: any, i: number) => ({ id: i + 1, ...product })).slice(
        //   (this.page - 1) * this.pageSize,
        //   (this.page - 1) * this.pageSize + this.pageSize,
        // );
        //End of Get All Products

        let currentmonthandyear = new Date();      
          //filter the first 6 latest product
          var allproductsfilterforlatestproduct = data
          allproductsfilterforlatestproduct.map((i) => 
          {
            i.DateCreatedMonthAndYear = moment(moment(i.DateCreated).toDate()).format('YYYY-MM')
          })
          var finalizefilterlatestproduct = allproductsfilterforlatestproduct.filter(f => f.DateCreatedMonthAndYear
             == moment(currentmonthandyear).format('YYYY-MM'))
             this.latestproducts = finalizefilterlatestproduct
            var thelatest = this.latestproducts.slice(0,6)
            const middleIndex = Math.ceil(thelatest.length / 2);
            const firstHalf = thelatest.splice(0, middleIndex);   
            const secondHalf = thelatest.splice(-middleIndex);
            this.firsthalf = firstHalf;
            this.secondhalf = secondHalf
            this.firsthalf.map((i) => 
            {
              var imageConverted = i.ImageUrl.split("/")
              i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
            })
            this.secondhalf.map((i) => 
            {
              var imageConverted = i.ImageUrl.split("/")
              i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
            })
            //End of filter the first 6 latest product        
        
            //Get category grouped by
            var groupedbycategory = _(data).groupBy('Category')
            .map((items, category) => 
            {
             return category
           }).value() 
             this.categorylist = groupedbycategory
            //End of Get category grouped by
        })
  }

}
