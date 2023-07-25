import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {
  public imageurl: any;
  public category: any;
  public productname: any;
  public description: any;
  public relatedproducts: any[] = []
  public unitprice: any;
  public smallprice: any;
  public mediumprice: any;
  public ratings: number = 0;
  public quantityspecific: number = 1;
  constructor(private db: DBService, private afauth: AngularFireAuth, private actRoute: ActivatedRoute, private alertCtrl: AlertController) 
  
  { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.getProductDetails(id)

  }

  ngOnInit(): void {
  }

  getProductDetails(id: any) 
  {
      this.db.getDataById('Products', id)
      .subscribe((data) => 
      { 
      this.getRelatedProducts(data.Category, id);       
      var imageConverted = data.ImageUrl.split("/")
      this.imageurl = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/500x500/`
      this.category = data.Category;
      this.productname = data.ProductName;  
      this.description = data.Description;
      this.smallprice = data.SmallPrice;
      this.mediumprice = data.MediumPrice;
      this.unitprice = data.UnitPrice;
      this.ratings = data.Ratings
    })
  }
  getRelatedProducts(category: any, id: any)
  {
      this.db.getDataWhereString('Products', category)
      .subscribe((data) => 
      {
        //console.log("related products", data.splice(0, 4));
         data = data.filter(f => f.id != id) 
        data.map((i, index) => 
        {
          var imageConverted = i.ImageUrl.split("/") 
          i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/500x500/`
        })
        this.relatedproducts = data.splice(0, 4)
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
      if (cartData == null || cartData == undefined || cartData == "") {
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
                    size == '') 
                    {
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
                  else 
                  {
                    //lalagyan ng alert successfully added
                    var successfullyAdded = await this.alertCtrl.create
                    ({
                      message: `${data.ProductName} successfully added to your cart.`,
                      backdropDismiss: false,
                      buttons: 
                      [
                        {
                          text: 'Close',
                          role: 'cancel'
                        }
                      ]
                    })
                    await successfullyAdded.present();
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
                    //lalagyan ng alert successfully added
                    var successfullyAdded = await this.alertCtrl.create
                    ({
                      message: `${data.ProductName} successfully added to your cart.`,
                      backdropDismiss: false,
                      buttons: 
                      [
                        {
                          text: 'Close',
                          role: 'cancel'
                        }
                      ]
                    })
                    await successfullyAdded.present();
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
          //lalagyan ng alert successfully added
          var successfullyAdded = await this.alertCtrl.create
                    ({
                      message: `${data.ProductName} successfully added to your cart.`,
                      backdropDismiss: false,
                      buttons: 
                      [
                        {
                          text: 'Close',
                          role: 'cancel'
                        }
                      ]
                    })
                    await successfullyAdded.present();
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
                      else 
                      {
                        //lalagyan ng alert successfully added
                        var successfullyAdded = await this.alertCtrl.create
                          ({
                            message: `${data.ProductName} successfully added to your cart.`,
                            backdropDismiss: false,
                            buttons:
                              [
                                {
                                  text: 'Close',
                                  role: 'cancel'
                                }
                              ]
                          })
                    await successfullyAdded.present();
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

                      //lalagyan ng alert successfully updated
                      var successfullyUpdated = await this.alertCtrl.create
                    ({
                      message: `${data.ProductName} successfully updated to your cart.`,
                      backdropDismiss: false,
                      buttons: 
                      [
                        {
                          text: 'Close',
                          role: 'cancel'
                        }
                      ]
                    })
                    await successfullyUpdated.present();
                    }
                    data.Quantity = 1;
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
                        //lalagyan ng alert successfully added
                        var successfullyAdded = await this.alertCtrl.create
                          ({
                            message: `${data.ProductName} successfully added to your cart.`,
                            backdropDismiss: false,
                            buttons:
                              [
                                {
                                  text: 'Close',
                                  role: 'cancel'
                                }
                              ]
                          })
                          await successfullyAdded.present();
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
                        //lalagyan ng alert successfully updated
                        var successfullyUpdated = await this.alertCtrl.create
                          ({
                            message: `${data.ProductName} successfully updated to your cart.`,
                            backdropDismiss: false,
                            buttons:
                              [
                                {
                                  text: 'Close',
                                  role: 'cancel'
                                }
                              ]
                          })
                          await successfullyUpdated.present();
                    }
                    data.Quantity = 1;
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
                //lalagyan ng alert successfully added
                var successfullyAdded = await this.alertCtrl.create
                ({
                  message: `${data.ProductName} successfully added to your cart.`,
                  backdropDismiss: false,
                  buttons:
                    [
                      {
                        text: 'Close',
                        role: 'cancel'
                      }
                    ]
                })
                await successfullyAdded.present();
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

              //lalagyan ng alert successfully updated
              var successfullyUpdated = await this.alertCtrl.create
              ({
                message: `${data.ProductName} successfully updated to your cart.`,
                backdropDismiss: false,
                buttons:
                  [
                    {
                      text: 'Close',
                      role: 'cancel'
                    }
                  ]
              })
              await successfullyUpdated.present();
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


  addToCartSpecific()
  {
    var id = this.actRoute.snapshot.paramMap.get('id');
    
    this.db.getDataWhereString('Products', this.category).subscribe((data) => 
    {
      data = data.filter(f => f.id == id);
      
      data.map((i, index) => 
      {
        i.Quantity = parseInt(this.quantityspecific.toString());
      })

      this.AddtoCart(data[0]);
            
    })
  }

  validatequantity(event: any)
  {
   var value = parseInt(event.target.value);
   if (value <= 0 || event.target.value == null || event.target.value == undefined || event.target.value == "")
   {
    this.quantityspecific = parseInt("1")
   } 
  }
}
