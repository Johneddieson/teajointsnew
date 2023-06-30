import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import * as moment from 'moment'
import * as _ from 'lodash';
import { AlertController } from '@ionic/angular';
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
pageSize = 3;
collectionSize = 0;
allproductspagination: any[] = []
discountproductslist1: any
discountproductslist2: any
discountproductslist3: any
discountproductslist4: any
discountproductslist5: any
discountproductslist6: any

    constructor(private db: DBService, private alertCtrl: AlertController) {
        this.getProducts()
        this.getproductsfilter('Default')
        this.getdiscountedproducts()
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


    /*-----------------------------
        Product Discount Slider
    -------------------------------*/
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

  /*---------------------------------
      Product Details Pic Slider
  ----------------------------------*/
  $(".product__details__pic__slider").owlCarousel({
      loop: true,
      margin: 20,
      items: 4,
      dots: true,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true
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
        
        //filter the first 6 latest product
        var allproductsfilterforlatestproduct = data.filter(f => f.HasDiscount == false);
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

  getproductsfilter(filter: any)
  {
      this.db.getData('Products').subscribe((data) => 
      {
        data = data.filter(f => f.HasDiscount == false);
        //Get All Products
        data = filter == 'Default' ? data : filter == 'Category' ? data.sort((a, b) => a.Category.localeCompare(b.Category))  
        : data.sort((a, b) => a.ProductName.localeCompare(b.ProductName))
        data.map((i) => 
        {
          var imageConverted = i.ImageUrl.split("/")
          i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
        })
        this.collectionSize = data.length
        this.allproducts = data.map((country: any, i: number) => ({ id: i + 1, ...country })).slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize,
        );
        //End of Get All Products
      })
  }
  sortBy(event: any)
  {
    //console.log("the event", event.target.value)
    this.getproductsfilter(event.target.value)    
  }



  itemsCart: any = []

  async AddtoCart(data: any) {
    if (data.Materials.length <= 0) {
      alert("This product has no condiments.")
    }
    else {
      var cartData = sessionStorage.getItem('cart');
      let storageDataGet: any = [];

      //no item in the cart yet
      if (cartData == null) {
        if (data.Category == 'Milktea') {
          var alertMilktea = await this.alertCtrl.create({
            header: 'Please choose a size',
            inputs: [
              {
                type: 'radio',
                label: 'Small',
                value: 'Small',
              },
              {
                type: 'radio',
                label: 'Medium',
                value: 'Medium',
              },
            ],
            buttons: [
              {
                text: 'Go',
                handler: async (size) => {
                  if (size == undefined || size == null ||
                    size == '') {
                    var nosizeSelected = await this.alertCtrl.create({
                      message: 'No size selected',
                      buttons: [
                        {
                          text: 'Ok',
                          role: 'cancel'
                        }
                      ]
                    })
                    await nosizeSelected.present()
                  }
                  else {
                    var ordernotmilkteaAndfries = this.AddtoCartObject(data, size, '')
                    storageDataGet.push(ordernotmilkteaAndfries);
                    sessionStorage.setItem('cart', JSON.stringify(storageDataGet));
                    data.Quantity = 1;
                    //this.loadCart();
                  }
                },
              },
              {
                text: 'Close',
                role: 'cancel',
              },
            ]

          })
          await alertMilktea.present()
        }
        else if (data.Category == 'Snacks' && (data.ProductName == 'Fries' || data.ProductName == 'Chicken Fingers')) {
          var alertSnacks = await this.alertCtrl.create({
            header: 'Please choose a flavor',
            inputs: [
              {
                type: 'radio',
                label: 'Cheese',
                value: 'Cheese',
              },
              {
                type: 'radio',
                label: 'Sour Cream',
                value: 'Sour Cream',
              },
              {
                type: 'radio',
                label: 'Bbq',
                value: 'Bbq',
              },
            ],
            buttons: [
              {
                text: 'Go',
                handler: async (flavor) => {
                  if (flavor == undefined || flavor == '' ||
                    flavor == null) {
                    var noFlavorSelected = await this.alertCtrl.create({
                      message: 'No flavor selected',
                      buttons: [
                        {
                          text: 'Ok',
                          role: 'cancel'
                        }
                      ]
                    })
                    await noFlavorSelected.present()
                  }
                  else {
                    var ordernotmilkteaAndfries = this.AddtoCartObject(data, '', flavor)
                    storageDataGet.push(ordernotmilkteaAndfries);
                    sessionStorage.setItem('cart', JSON.stringify(storageDataGet));
                    data.Quantity = 1;
                    //this.loadCart();
                  }
                },
              },
              {
                text: 'Close',
                role: 'cancel',
              },
            ]
          })
          await alertSnacks.present()
        }
        else {
          var ordernotmilkteaAndfries = this.AddtoCartObject(data, '', '')
          storageDataGet.push(ordernotmilkteaAndfries);
          sessionStorage.setItem('cart', JSON.stringify(storageDataGet));
          data.Quantity = 1;
          //this.loadCart();  
          //this.loadCart();
          //this.cartItemFunc();  
        }
      }
      //already have an items in the cart
      else {
        if (data.Category == 'Milktea') {
          var alertMilktea = await this.alertCtrl.create({
            header: 'Please choose a size',
            inputs: [
              {
                type: 'radio',
                label: 'Small',
                value: 'Small',
              },
              {
                type: 'radio',
                label: 'Medium',
                value: 'Medium',
              },
            ],
            buttons: [
              {
                text: 'Go',
                handler: async (size) => {
                  if (size == '' || size == undefined ||
                    size == null) {
                    var noSizeSelected = await this.alertCtrl.create({
                      message: 'No size selected',
                      buttons: [
                        {
                          text: 'Ok',
                          role: 'cancel'
                        }
                      ]
                    })
                    await noSizeSelected.present()
                  }
                  else {
                    var id = data.id;
                    let index: number = -1;
                    this.itemsCart = JSON.parse(sessionStorage.getItem('cart') as any);

                    for (let i = 0; i < this.itemsCart.length; i++) {
                      if (id == this.itemsCart[i].id && this.itemsCart[i].ProductName == `${data.ProductName} ${size}`) {
                        this.itemsCart[i].Quantity = data.Quantity;
                        data.Quantity = 1;
                        index = i;
                        break;
                      }
                    }
                    if (index == -1) {
                      //if cart session is not equal to null and the added product is not yet existing  
                      var cartConvertToParse = JSON.parse(cartData as any);

                      if (cartConvertToParse.length >= 10) {
                        var orderLimitAlert = await this.alertCtrl.create({
                          message: 'Orders should be 10 maximum.',
                          buttons:
                            [
                              {
                                text: 'Ok',
                                role: 'cancel'
                              }
                            ]
                        })
                        await orderLimitAlert.present();
                      }
                      else {
                        var ordernotmilkteaAndfries = this.AddtoCartObject(data, size, '')
                        this.itemsCart.push(ordernotmilkteaAndfries);
                        sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                      }
                      data.Quantity = 1;
                    }
                    else {
                      //if cart session is not equal to null and the added product is existing
                      sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                      data.Quantity = 1;
                    }
                    data.Quantity = 1;
                    //this.loadCart();
                  }
                },
              },
              {
                text: 'Close',
                role: 'cancel',
              },
            ]

          })
          await alertMilktea.present()
        }
        else if (data.Category == 'Snacks' && (data.ProductName == 'Fries' || data.ProductName == 'Chicken Fingers')) {
          var alertSnacks = await this.alertCtrl.create({
            header: 'Please choose a flavor',
            inputs: [
              {
                type: 'radio',
                label: 'Cheese',
                value: 'Cheese',
              },
              {
                type: 'radio',
                label: 'Sour Cream',
                value: 'Sour Cream',
              },
              {
                type: 'radio',
                label: 'Bbq',
                value: 'Bbq',
              },
            ],
            buttons: [
              {
                text: 'Go',
                handler: async (flavor) => {
                  if (flavor == undefined || flavor == ''
                    || flavor == null) {
                    var noSizeSelected = await this.alertCtrl.create({
                      message: 'No flavor selected',
                      buttons: [
                        {
                          text: 'Ok',
                          role: 'cancel'
                        }
                      ]
                    })
                    await noSizeSelected.present()
                  }
                  else {
                    var id = data.id;
                    let index: number = -1;
                    this.itemsCart = JSON.parse(sessionStorage.getItem('cart') as any);

                    for (let i = 0; i < this.itemsCart.length; i++) {
                      if (id == this.itemsCart[i].id && this.itemsCart[i].ProductName == `${data.ProductName} ${flavor}`) {
                        this.itemsCart[i].Quantity = data.Quantity;
                        data.Quantity = 1;
                        index = i;
                        break;
                      }
                    }
                    if (index == -1) {
                      //if cart session is not equal to null and the added product is not yet existing  

                      var cartConvertToParse = JSON.parse(cartData as any);

                      if (cartConvertToParse.length >= 10) {
                        var orderLimitAlert = await this.alertCtrl.create({
                          message: 'Orders should be 10 maximum.',
                          buttons: [
                            {
                              text: 'Ok',
                              role: 'cancel',
                            },
                          ],
                        });
                        await orderLimitAlert.present();
                      }
                      else {
                        var ordernotmilkteaAndfries = this.AddtoCartObject(data, '', flavor)
                        this.itemsCart.push(ordernotmilkteaAndfries);
                        sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                      }
                      data.Quantity = 1;
                    }
                    else {
                      //if cart session is not equal to null and the added product is existing
                      sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                      data.Quantity = 1;
                    }
                    data.Quantity = 1;
                    //this.loadCart();
                    //this.cartItemFunc(); 
                  }
                },
              },
              {
                text: 'Close',
                role: 'cancel',
              },
            ]
          })
          await alertSnacks.present()
        }
        else 
        {
          var id = data.id;
          let index: number = -1;
          this.itemsCart = JSON.parse(sessionStorage.getItem('cart') as any);


          for (let i = 0; i < this.itemsCart.length; i++) {
            if (id == this.itemsCart[i].id && this.itemsCart[i].ProductName == data.ProductName) {
              this.itemsCart[i].Quantity = data.Quantity;
              data.Quantity = 1;
              index = i;
              break;
            }
          }
          if (index == -1) {
            //if cart session is not equal to null and the added product is not yet existing  
            var cartConvertToParse = JSON.parse(cartData);

            if (cartConvertToParse.length >= 10) {
              var orderLimitAlert = await this.alertCtrl.create({
                message: 'Orders should be 10 maximum.',
                buttons: [
                  {
                    text: 'Ok',
                    role: 'cancel',
                  },
                ],
              });
              await orderLimitAlert.present();
            }
            else {
              var ordernotmilkteaAndfries = this.AddtoCartObject(data, '', '')
              this.itemsCart.push(ordernotmilkteaAndfries);
              sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
            }
            data.Quantity = 1;
          }
          else {
            //if cart session is not equal to null and the added product is existing
            sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
            data.Quantity = 1;
          }
        }
      }
      //this.loadCart();
      //this.cartItemFunc(); 
    }
  }    


  
  AddtoCartObject(data: any, size: any, flavor: string) 
  {
    var concatenatedArrays;
    if (flavor.startsWith("B") || flavor.startsWith("S") || flavor.startsWith("C"))
    {
      var flavorMaterial = data.Materials.filter((f: any) => f.itemName.toLowerCase().includes(flavor.toLowerCase()))
       var oilMaterial = data.Materials.filter((f: any) => f.itemName.toLowerCase().includes('oil'))
      concatenatedArrays = flavorMaterial.concat(oilMaterial)
      //console.log("fries and chicken fingers")
    }
    else 
    {
      //console.log("not fries and chicken fingers")
      concatenatedArrays = data.Materials 
    }
    concatenatedArrays.map((i:any, index:any) => 
    {
      i.Quantity = data.Quantity
    })
    //console.log("concatenated array", concatenatedArrays)   
    var ordernotmilkteaAndfries = Object.assign({}, data, {
          Materials: concatenatedArrays,
           Category: data.Category,
           Description: data.Description,
           GramsPerOrder: data.Category != 'Milktea' || data.Category == 'Snacks' ?  data.GramsPerOrder 
           : size == 'Small' ? data.GramsPerOderSmall : data.GramsPerOderMedium,
           ImageUrl: data.ImageUrl,
           ProductName: data.Category != 'Milktea' ? data.ProductName == 'Fries' || 
           data.ProductName == 'Chicken Fingers' 
           ? `${data.ProductName} ${flavor}` : data.ProductName 
           : `${data.ProductName} ${size}`,
           Quantity: data.Quantity,
           Stock: data.Stock,
           UnitPrice: data.Category != 'Milktea' ||  data.Category == 'Snacks' ? data.UnitPrice 
           : size == 'Small' ? data.SmallPrice : data.MediumPrice,
           id: data.id
   })
   //console.log("addtocartobjectmethod", ordernotmilkteaAndfries)
   return ordernotmilkteaAndfries
  }

getdiscountedproducts()
{
  this.db.getData('Products').subscribe((data) => 
  {
    data = data.filter(f => f.HasDiscount == true);
    data.map((i) => 
    {
      var imageConverted = i.ImageUrl.split("/")
       i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
      //i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}/-/resize/220x/fallback.jpg`
    })
    this.discountproductslist1 = data[0]
    this.discountproductslist2 = data[1]
    this.discountproductslist3 = data[2]
    this.discountproductslist4 = data[3]
    this.discountproductslist5 = data[4]
    this.discountproductslist6 = data[5]
    
  })  
}


}
