import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'owl.carousel';
import { DBService } from '../services/db.service';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
firstcarouselarray: any[] = []
groupedbycategoryfirstindexofitem: any[] = []
featuredproductscategory: any[] = []
featuredproducts: any[] = []
filteredproductsmodel: string = 'All'
latestproducts: any[] = []
firsthalf: any[] = []
secondhalf: any[] = []
latestproductsfortoprated: any[] = []
firsthalffortoprated: any[] = []
secondhalffortoprated: any[] = []
topratedproducts: any[] = []
bestsellerproducts: any[] = []
firsthalfforbestseller: any[] = []
secondhalfforbestseller: any[] = []
constructor(private db:DBService) 
  {
    this.getProducts('All');
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

getProducts(filteredvalue: any)
{
  // var obj = {
  //   Ratings: 100,
  //   TimesOrdered: 100,
  // };
  // data.forEach((fe) => {
  //   this.db
  //     .updateProduct(fe.id, obj)
  //     .then((el) => {
  //       console.log('updating test success', el);
  //     })
  //     .catch((err) => {
  //       console.log('updating test error', err);
  //     });
  // });

  // var sizzlingmeal = data.filter(f => f.Category != 'Sizzling Meal With Rice')
  // var obj = {
  //   Ratings: 0,
  //   TimesOrdered: 0,
  // };
  // sizzlingmeal.forEach((fe) => {
  //   this.db
  //     .updateProduct(fe.id, obj)
  //     .then((el) => {
  //       console.log('updating test success', el);
  //     })
  //     .catch((err) => {
  //       console.log('updating test error', err);
  //     });
  // });

  this.db.getProducts().subscribe((data) => 
    { 
      let currentmonthandyear = new Date();
        //let halfarray = data.filter((i, idx) => idx < Math.floor(data.length / 2))
        //console.log("the data", data) 
        
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


          //filter the top 6 rated products
          var allproductsfilterfortopratedproduct = data
          var finalizefiltertopratedproduct = allproductsfilterfortopratedproduct.filter(f => f.Ratings >= 50)
          finalizefiltertopratedproduct = finalizefiltertopratedproduct.sort((a, b) => Number(b.Ratings) - Number(a.Ratings))
          this.topratedproducts = finalizefiltertopratedproduct
            var thelatestfortoprated = this.topratedproducts.slice(0,6)
            const middleIndexfortoprated = Math.ceil(thelatestfortoprated.length / 2);
            const firstHalffortoprated = thelatestfortoprated.splice(0, middleIndexfortoprated);   
            const secondHalffortoprated = thelatestfortoprated.splice(-middleIndexfortoprated);
            this.firsthalffortoprated = firstHalffortoprated;
            this.secondhalffortoprated = secondHalffortoprated
            this.firsthalffortoprated.map((i) => 
            {
              var imageConvertedfortoprated = i.ImageUrl.split("/")
              i.ImageConverted = `${imageConvertedfortoprated[0]}//${imageConvertedfortoprated[2]}/${imageConvertedfortoprated[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
            })
            this.secondhalffortoprated.map((i) => 
            {
              var imageConvertedfortoprated = i.ImageUrl.split("/")
              i.ImageConverted = `${imageConvertedfortoprated[0]}//${imageConvertedfortoprated[2]}/${imageConvertedfortoprated[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
            })
          //End of filter the top 6 rated products

            //filter the top 6 bestseller products
            var allproductsfilterforbestsellerproduct = data
            var finalizefilterbestsellerproduct = allproductsfilterforbestsellerproduct.filter(f => f.TimesOrdered >= 100)
            finalizefilterbestsellerproduct = finalizefilterbestsellerproduct.sort((a, b) => Number(b.TimesOrdered) - Number(a.TimesOrdered))
            this.bestsellerproducts = finalizefilterbestsellerproduct
              var thelatestforbestseller = this.bestsellerproducts.slice(0,6)
              const middleIndexforbestseller = Math.ceil(thelatestforbestseller.length / 2);
              const firstHalfforbestseller = thelatestforbestseller.splice(0, middleIndexforbestseller);   
              const secondHalfforbestseller = thelatestforbestseller.splice(-middleIndexforbestseller);
              this.firsthalfforbestseller = firstHalfforbestseller;
              this.secondhalfforbestseller = secondHalfforbestseller
              this.firsthalfforbestseller.map((i) => 
              {
                var imageConvertedforbestseller = i.ImageUrl.split("/")
                i.ImageConverted = `${imageConvertedforbestseller[0]}//${imageConvertedforbestseller[2]}/${imageConvertedforbestseller[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
              })
              this.secondhalfforbestseller.map((i) => 
              {
                var imageConvertedforbestseller = i.ImageUrl.split("/")
                i.ImageConverted = `${imageConvertedforbestseller[0]}//${imageConvertedforbestseller[2]}/${imageConvertedforbestseller[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
              })
            //End of filter the top 6 bestsellerproducts
        
        
        //Featured Products
        var featuredproducts = filteredvalue == 'All' ? data.filter(f => f.Category == 'Frappe' ||
          f.Category == 'Shakes' ||
          f.Category == 'Snacks') : data.filter(f => f.Category == filteredvalue) 
          featuredproducts.map((i) => 
          {
            var imageConverted = i.ImageUrl.split("/")
            i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/3000x3000/`
          })
          this.featuredproducts = featuredproducts
          //End of Featured Products


    //   var groupedbyCategory = _(data).groupBy('Category')
    //   .map((items, category) => 
    //   {
    //    return category
    //  }).value() 
    //   var filterspecificfeaturedproducts = groupedbyCategory.filter(f => f == 'Frappe' ||
    //   f == 'Sizzling Meal With Rice' ||
    //   f == 'Snacks')
    //   this.featuredproductscategory = filterspecificfeaturedproducts
     
     
      // this.firstcarouselarray = data.filter(f => 
      //   f.Category == 'Platters' || f.Category == 'Rice Meal' ||
      //   f.Category == 'Noodles' || f.Category == 'Shakes'
      //   || f.Category == 'Pares')
      //   var groupedbycategory = _(this.firstcarouselarray).groupBy('Category')
      //  .map((items, category) => 
      //  {
      //   return items
      // }).value() 
      //   for(let i  = 0; i < groupedbycategory.length; i++)
      //   {
      //     this.groupedbycategoryfirstindexofitem.push(groupedbycategory[i][0])
      //   }
      })
}

filterFeaturedProducts(value: any)
{
  this.getProducts(value)
}

paginate(array: any, page_size: any, page_number: any) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
}
