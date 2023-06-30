import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DBService } from '../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
productid: any;
productcategory: any;
productname: any;
ratings: any;
unitprice: any;
smallprice: any;
mediumprice: any;
description: any;
id: any;
imageurl: any;
relatedproductsarray: any[] = [];
public quantity: string = '1';
  constructor
  (
    private afauth: AngularFireAuth,
    private dbservice: DBService,
    private actroute: ActivatedRoute, private alertCtrl: AlertController
    ) 
  {
      this.productid = this.actroute.snapshot.paramMap.get('id')
    // this.afauth.authState.subscribe((user) => 
    // {
    //   if (user && user.uid)
    //   {

    //   }
    // })
   
    this.dbservice.getDataById('Products', this.productid)
    .subscribe((data) => 
    {
      this.productcategory = data.Category;
      this.productname = data.ProductName;
      this.ratings = data.Ratings;
      this.unitprice = data.UnitPrice;
      this.smallprice = data.SmallPrice;
      this.mediumprice = data.MediumPrice;
      this.description = data.Description;
      var imageConvertedforbestseller = data.ImageUrl.split("/")
      this.imageurl = `${imageConvertedforbestseller[0]}//${imageConvertedforbestseller[2]}/${imageConvertedforbestseller[3]}//-/contrast/3/-/filter/cyren/100/-/preview/3000x3000/`
      //this.quantity = data.Quantity
      this.relatedproducts()
      // get3latestblog.map((i) => 
      // {
      //   var imageConvertedforbestseller = i.ImageUrl.split("/")
      //   i.ImageConverted = `${imageConvertedforbestseller[0]}//${imageConvertedforbestseller[2]}/${imageConvertedforbestseller[3]}//-/contrast/3/-/filter/cyren/100/-/preview/3000x3000/`
      //   i.DateCreatedChangeFormat = moment(i.DateCreated).format('LL')
      // })
    })
  }

  ngOnInit(): void 
  {
    // (function ($) 
    // {
    //   var proQty = $('.pro-qty');
    // proQty.prepend('<span class="dec qtybtn">-</span>');
    // proQty.append('<span class="inc qtybtn">+</span>');
    // proQty.on('click', '.qtybtn', function () {
    //     var $button = $(this);
    //     var oldValue = $button.parent().find('input').val() as any;
    //     if ($button.hasClass('inc')) {
    //         var newVal = parseFloat(oldValue) + 1;
                 
    //     } else {
    //         // Don't allow decrementing below zero
    //         if (oldValue > 0) {
    //             var newVal = parseFloat(oldValue) - 1;
    //         } else {
    //             newVal = 0;
    //         }
    //     }
    //     $button.parent().find('input').val(newVal);
    // });
    // })(jQuery);
  }
relatedproducts()
{
  this.dbservice.getData('Products').subscribe((data) => 
  {
    var fourRelatedProducts = data.filter(f => f.Category == this.productcategory && f.id != this.productid).splice(0,4)
    fourRelatedProducts.map((i, index) => 
    {
      var imageConvertedforbestseller = i.ImageUrl.split("/")
      i.ImageConverted = `${imageConvertedforbestseller[0]}//${imageConvertedforbestseller[2]}/${imageConvertedforbestseller[3]}//-/contrast/3/-/filter/cyren/100/-/preview/3000x3000/`
    })    
    this.relatedproductsarray = fourRelatedProducts 
  })
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
      else {
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

addtoCartSpecific()
{
          this.dbservice.getDataById('Products', this.productid).subscribe(async (data) => 
          {
            if (data.Materials.length <= 0) {
              alert("This product has no condiments.")
            }
            else 
            {
              data.Quantity = parseInt(this.quantity)
              data.id = this.productid;
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
                            this.quantity = "1"
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
                            this.quantity = "1"
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
                  this.quantity = "1"
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
                                this.quantity = "1"
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
                              this.quantity = "1"
                            }
                            else {
                              //if cart session is not equal to null and the added product is existing
                              sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                              data.Quantity = 1;
                              this.quantity = "1"
                            }
                            data.Quantity = 1;
                            this.quantity = "1"
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
                                this.quantity = "1"
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
                              this.quantity = "1"
                            }
                            else {
                              //if cart session is not equal to null and the added product is existing
                              sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                              data.Quantity = 1;
                              this.quantity = "1"
                            }
                            data.Quantity = 1;
                            this.quantity = "1"
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
                else {
                  var id = data.id;
                  let index: number = -1;
                  this.itemsCart = JSON.parse(sessionStorage.getItem('cart') as any);
          
          
                  for (let i = 0; i < this.itemsCart.length; i++) {
                    if (id == this.itemsCart[i].id && this.itemsCart[i].ProductName == data.ProductName) {
                      this.itemsCart[i].Quantity = data.Quantity;
                      data.Quantity = 1;
                      this.quantity = "1"
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
                    this.quantity = "1"
                  }
                  else {
                    //if cart session is not equal to null and the added product is existing
                    sessionStorage.setItem('cart', JSON.stringify(this.itemsCart));
                    data.Quantity = 1;
                    this.quantity = "1"
                  }
                }
              }
              //this.loadCart();
              //this.cartItemFunc(); 
            }              
          })  
}
}
