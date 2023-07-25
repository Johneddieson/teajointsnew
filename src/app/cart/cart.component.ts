import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  getCartDetails: any = []
  total: number = 0;
  cartItem:number = 0
  getOrders: any = []
  myInformation: any = {}
  PaymentMethod: string = 'None'
  amount: number = 25000;
  description: string = 'Sample Payment';
  statement_descriptor: string = 'ACME Store';
  paymentLink: string = '';
  cartSubject = new Subject<any>()
  
  constructor
  (
    private loadingController: LoadingController, 
    private alertCtrl: AlertController,  
    private router: Router, 
    private afauth: AngularFireAuth, 
    ) 
    {
      
    this.cartSubject.next(this.CartDetails())
    this.cartSubject.next(this.loadCart())
    
   }

  ngOnInit() {

  }
  CartDetails() {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart') as any)
    
       this.getCartDetails.map((i: any, index: any) => 
      {
        var imageConverted = i.ImageUrl.split("/")
        i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/100x100/`
        
        i.Materials.map((iMat: any, index: any) => 
        {
          if (i.Category == "Milktea")
          {
            iMat.gramsperorder = i.ProductName.toLowerCase().includes('small') ? iMat.gramsperordersmall : iMat.gramsperordermedium 
          }
          else 
          {
            iMat.gramsperorder = iMat.gramsperorder
          }
        })
      })
    }
  }
  inc(id: any, quantity: any) {
    for (let i = 0; i < this.getCartDetails.length; i++) 
    {
      if (this.getCartDetails[i].id === id) 
      {
        this.getCartDetails[i].Quantity = parseInt(quantity) + 1
      }
    }

    sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))

    //  this.loadCart()
    
    this.total = this.getCartDetails.reduce((acc: any, val: any) => {
      return acc + (val.UnitPrice * val.Quantity)
    }, 0)
    
  }
  dec(id: any, quantity: any) {

    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id === id) {

        if (quantity != 1)
          this.getCartDetails[i].Quantity = quantity - 1
      }
    }

    sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))
    
    this.total = this.getCartDetails.reduce((acc: any, val: any) => {
      return acc + (val.UnitPrice * val.Quantity)
    }, 0)
  }
  loadCart() {
    if (sessionStorage.getItem('cart')) 
    {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart') as any)

      this.total = this.getCartDetails.reduce((acc: any, val: any) => {
        return acc + (val.UnitPrice * val.Quantity)
      }, 0)
    }
  }


  removeall() 
  {
    sessionStorage.removeItem('cart')
    this.getCartDetails = []
    this.total = 0
      this.cartItem = 0
   // this.msg.cartSubject.next(this.cartItem)
    this.loadCart()
  }

  singleDelete(data: any) {
    if (sessionStorage.getItem('cart')) {
      this.getCartDetails = JSON.parse(sessionStorage.getItem('cart') as any) 
    
      for (let i=0; i<this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].id === data.id) {
          this.getCartDetails.splice(i, 1);
          sessionStorage.setItem('cart', JSON.stringify(this.getCartDetails))
         
          this.loadCart()
          this.CartDetails();
        }
      }
    }
}
cartItemFunc() {
  var cartValue = JSON.parse(sessionStorage.getItem('cart') as any) 
    this.cartItem = cartValue.length
  //this.msg.cartSubject.next(this.cartItem)

}
gotohome() {
  this.router.navigate(['tabs'])
}
async OrderNow() {
if (this.PaymentMethod == '' || this.PaymentMethod == undefined 
|| this.PaymentMethod == null)
{
  var paymentMethodRequiredMessage = await this.alertCtrl.create({
    message: 'Payment method is required',
    buttons: [
      {
        text: 'Ok',
        role: 'cancel'
      }
    ]
  })
  await paymentMethodRequiredMessage.present()
}
else if (!this.myInformation.FirstName || !this.myInformation.LastName || 
  !this.myInformation.PhoneNumber) 
  {
   var fillupdetailfirstalert = await  this.alertCtrl.create({
      message: 'Please fill up about your details first.',
      buttons: [
        {
          text: 'Ok',
         handler: () => {
          this.router.navigateByUrl('/editinfo')
         } 
        }
      ]
    })
    await fillupdetailfirstalert.present();
  }
else 
{
  //await this.writeCommentAlert()
  var chooseIfyouWantToWriteCommentsOrNotAlert = await this.alertCtrl.create
  ({
    message: 'Do you want to write some comments before applying your order?',
    backdropDismiss: false,
    buttons: 
    [
      {
        text: 'Yes',
        handler: () => 
        {
            this.writeCommentAlert();
        }
      },
      {
        text: 'No',
        handler: () => 
        {
            this.orderNowFunction('')
        }
      }
    ]
  })
  await chooseIfyouWantToWriteCommentsOrNotAlert.present();
}
 
}

async writeCommentAlert()
{
  var writecommentAlert = await this.alertCtrl.create
  ({
    header: 'Please write here if you want to remove some of the food materials or whatever comments do you want.',
    inputs: 
    [
      {
        type:'textarea',
        name: 'Comments',
        label: 'Comments'
      }
    ],
    buttons: 
    [
      {
        text: 'Submit',
        handler: (comments) => 
        {
          //console.log('comments', comments.Comments)
          this.orderNowFunction(comments.Comments)
             
        }
      },
      {
        role: 'cancel',
        text: 'Close'
      }
    ]
  })
  await writecommentAlert.present()
}
// async orderNowFunction(comments: string)
// {
//  //Order Now Function
//   this.alertCtrl.create({
//     message: 'Are you sure you want to finalize your order?',
//     buttons: [
//       {
//         text: 'Ok',
//         handler: () => {
          
//           this.alertCtrl.create({
//             message: 'Ordered Successfully!',
//             buttons: [
//               {
//                 text: 'Ok',
//                 role: 'cancel'
//               }
//             ]
//           }).then(els => {
//             if (!this.myInformation.FirstName || !this.myInformation.LastName || 
//               !this.myInformation.PhoneNumber) 
//               {
//                 this.alertCtrl.create({
//                   message: 'Please fill up about your details first.',
//                   buttons: [
//                     {
//                       text: 'Ok',
//                      handler: () => {
//                       this.router.navigateByUrl('/editinfo')
//                      } 
//                     }
//                   ]
//                 }).then(els2 => {
//                   els2.present()
                 
//                 })
//               } 
//               else 
//               {
//                 this.CartDetails()
//                 els.present()
//                 var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
//                 this.total = this.total + 30;
//             this.afstore.collection('Orders').add({
//               OrderDetails: this.getCartDetails,
//               BillingFirstname: this.myInformation.FirstName,
//               BillingLastname: this.myInformation.LastName,
//               BillingAddress1: this.myInformation.Address1,
//               BillingAddress2: '',
//               BillingPhonenumber: this.myInformation.PhoneNumber,
//               Billingemail: this.myInformation.Email,
//               BillingIndexId: this.myInformation.Uid,
//               Status: 'Pending',
//               Datetime: datetime,
//               TotalAmount: parseFloat(this.total.toString()).toFixed(2),
//               DatetimeToSort: new Date(),
//               PaymentMethod: this.PaymentMethod,
//               Comments: comments,
//               //IsPaid: false
//             }).then(el => {
//               this.removeall() 
//               this.meReference.update({
//                 Address1: '',
//                 Address2: ''
//               })
//             }).catch(err => {
//               alert(err)
//             }) 
//           }
//           })
//         }
//       },
//       {
//         text: 'Cancel',
//         role: 'cancel'
//       }
//     ]
//   }).then(el => {
//     el.present()
//   })
//   //End of Order Now Function 
// }

async orderNowFunction(comments: string)
{
  // var finalizeAlert = await this.alertCtrl.create
  // ({
  //   message: 'Are you sure you want to finalize your order?',
  //   buttons: 
  //   [
  //     {
  //       text: 'Yes',
  //       handler: async () => 
  //       {
  //         var getCurrentAddressAlert = await this.alertCtrl.create
  //         ({
  //           header: 'Click the get my current location button to get your realtime location.',
  //           backdropDismiss: false,
  //           buttons: 
  //           [
  //             {
  //               text: 'Close',
  //               role: 'cancel'
  //             },
             
  //             {
  //               text: 'Get My Current Location',
  //               handler: async () => 
  //               {

  //                 navigator.geolocation.getCurrentPosition((success) => {
  //                    this.msg.myLoc(success.coords.latitude, success.coords.longitude).subscribe(async data  => 
  //                      {
  //                        //console.log("my address", data.Response.View[0].Result[0].Location.Address)
  //                        var address = data.Response.View[0].Result[0].Location.Address 
  //                 getCurrentAddressAlert.header = "If the result is wrong, you can edit it manually or you can click close button to try again."
  //                 getCurrentAddressAlert.inputs = 
  //                 [
  //                     {
  //                       type: 'text',
  //                       name: 'Street',
  //                       value: `${address.HouseNumber} ${address.Street}`,
  //                       placeholder: 'Enter Street'
  //                     },
  //                     {
  //                       type: 'text',
  //                       name: 'Barangay',
  //                       value: `${address.District}`,
  //                       placeholder: 'Enter Barangay'
  //                     },
  //                     {
  //                       type: 'text',
  //                       name: 'City',
  //                       value: `${address.City} ${address.County}`,
  //                       placeholder: 'Enter City'
  //                     },
  //                     {
  //                       type: 'text',
  //                       name: 'Country',
  //                       value: `${address.Country}`,
  //                       disabled: true
  //                     },
  //                   ]
  //                   getCurrentAddressAlert.buttons = 
  //                   [
  //                     {
  //                       text: 'Submit',
  //                       handler: (addressvalue) => 
  //                       {
  //                         //console.log("Submitted", addressvalue.Address)
                           
  //                         this.meReference.update
  //                         ({
  //                           Address1: `${addressvalue.Street} ${addressvalue.Barangay} ${addressvalue.City}`
  //                         }).then(async (addressupdatedsuccessfully) => 
  //                         {
  //                         //    var loading = await this.loadingController.create
  //                         // ({
  //                         //   message: 'Please wait...',
  //                         //   spinner: 'bubbles'
  //                         // })
  //                         // await loading.present();
  //                         this.CartDetails()
  //                         this.savingfunction(comments)
                            
  //                       })
  //                         //return false
  //                       }
  //                     },
  //                     {
  //                       text: 'Close',
  //                       role: 'cancel'
  //                     }
  //                   ]
  //                 })
  //                  })
                                   
  //                 return false
  //               }
  //             }
  //           ]
  //         })
  //         await getCurrentAddressAlert.present();
  //       }
  //     },
  //     {
  //       text:'No',
  //       role: 'cancel'
  //     }
  //   ]
  // })
  // await finalizeAlert.present()
}
savingfunction(comments: any)
{
//   if (parseFloat(this.total.toString()) < 100 && this.PaymentMethod == "Online Payment")
//   {
//     this.minimumAlert()
//   }
//   else 
//   {
//   var datetime = moment(new Date()).format("MM-DD-YYYY hh:mm A")
//   this.total = this.total + 30;
// this.afstore.collection('Orders').add({
// OrderDetails: this.getCartDetails,
// BillingFirstname: this.myInformation.FirstName,
// BillingLastname: this.myInformation.LastName,
// BillingAddress1: this.myInformation.Address1,
// BillingAddress2: '',
// BillingPhonenumber: this.myInformation.PhoneNumber,
// Billingemail: this.myInformation.Email,
// BillingIndexId: this.myInformation.Uid,
// Status: 'Pending',
// Datetime: datetime,
// TotalAmount: parseFloat(this.total.toString()).toFixed(2),
// DatetimeToSort: new Date(),
// PaymentMethod: this.PaymentMethod,
// Comments: comments,
// linkReference: ''
// }).then(el => {
//   this.loadingController.dismiss()
// this.removeall() 
// this.meReference.update({
//   Address1: '',
//   Address2: ''
// })
// this.successAlert()
// }).catch(err => {
// alert(err)
// this.loadingController.dismiss();
// })
// }
}
async successAlert()
{
  var alertSuccess = await this.alertCtrl.create
  ({
    message: 'Ordered sent successfully, please stand by in a bit while processing your order. Thanks!',
    buttons: 
    [
      {
        text: 'Ok',
        role: 'cancel'
      }
    ]
  })
  await alertSuccess.present();
}

async minimumAlert()
{
  var minimumAlert = await this.alertCtrl.create
  ({
    message: 'If your payment method is ONLINE PAYMENT, your order must be greater than or equal to 100',
    buttons: 
    [
      {
        text: 'Close',
        role: 'cancel'
      }
    ]
  })
  await minimumAlert.present();
}


 computeSpecificProductTotal(UnitPrice: any, Quantity: any)
{
    return parseFloat(Quantity.toString()) * parseFloat(UnitPrice);
}

async ordernow()
{
    if (parseFloat(this.total.toString()) < 100 && this.PaymentMethod == "Online Payment")
  {
    this.minimumAlert()
  }
  else 
  {
    alert("ordered successfully!")
  }
}
}
