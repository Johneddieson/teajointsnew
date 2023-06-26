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
get3latestblog: any[] = []
constructor(private db:DBService) 
  {
    this.getProducts('All');
    this.getBlogs()
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

addBlog()
{
  var obj = 
  {
      Category: 'Food',
      Title: 'The Moment You Need To Remove Garlic From The Menu',
      Description: 'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      Subtitle: 'The corner window forms a place within a place that is a resting point within the large space.',
      Subdescription: 'The study area is located at the back with a view of the vast nature. Together with the other buildings, a congruent story has been managed in which the whole has a reinforcing effect on the components. The use of materials seeks connection to the main house, the adjacent stables',
      Comments: [],
      DateCreated: '2023-05-19',
      ImageUrl: 'https://ucarecdn.com/75838fea-6388-47e9-a753-7e15acac58a2/442FD838-321D-4A6A-8932-D1B4E4C42040.jpeg'    
  }
  this.db.addBlog(obj).then((el) => 
  {
    console.log("blog added successfully")
  }).catch((err) => 
  {
    console.log("error adding blog")
  })
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
          var datecreated = moment(moment(i.DateCreated).toDate())
          var datetoday = moment(new Date())
          var datecreatedDuration = moment.duration(datecreated.diff(datetoday)).asMonths() * -1
         i.DateCreatedDuration = parseInt(datecreatedDuration.toString()) 
        })
        var finalizefilterlatestproduct = allproductsfilterforlatestproduct.filter(f => f.DateCreatedDuration < 2)
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

getBlogs()
{
  this.db.getBlogs().subscribe((data) => 
  {
      var latestblog = data.sort((a, b) => Number(moment(b.DateCreated).toDate()) - Number(moment(a.DateCreated).toDate()))
      var get3latestblog = latestblog.splice(0,3)
      
      get3latestblog.map((i) => 
      {
        var imageConvertedforbestseller = i.ImageUrl.split("/")
        i.ImageConverted = `${imageConvertedforbestseller[0]}//${imageConvertedforbestseller[2]}/${imageConvertedforbestseller[3]}//-/contrast/3/-/filter/cyren/100/-/preview/3000x3000/`
        i.DateCreatedChangeFormat = moment(i.DateCreated).format('LL')
      })
      this.get3latestblog = get3latestblog
  })
}
}
