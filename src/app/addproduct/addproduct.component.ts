import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import * as moment from 'moment'
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  productId: any
  category: any;
  productname: any;
  imageurl: any;
  description: any;
  unitprice: any;
  smallprice: any;
  mediumprice: any;
  closeResult = '';
  formModal: any;
  specificproductcondiments: any[] = []
  condiments: any[] = []
  materialmodel: any;
  arraymaterial: any[] = []
  photoLink: any
  withPhoto: boolean = false
  categorymodel: string = "";
  productnamemodel: any;
  unitpricemodel: any;
  smallpricemodel: any;
  mediumpricemodel: any;
  descriptionmodel: any;
  public isValid: boolean = false
    public errMsg: string = ''
    public validationMessageObject: object = {}
    errorModal: any;
    disableSaveChangesButton: boolean = false
    hideSizeDropdown: boolean = false;
    thereisanimagealready: boolean = false;
    constructor
    (
      public db: DBService,
      public alertController: AlertController,
      public http: HttpClient,
      public loadingController: LoadingController
    ) 
    {
  
      this.getMaterials()
    }
  
    ngOnInit(): void 
    {
      var bootstrapmodal = window as any
      this.formModal = new bootstrapmodal.bootstrap.Modal
      (
        document.getElementById("exampleModal")
      )
  
      this.errorModal = new bootstrapmodal.bootstrap.Modal
      (
        document.getElementById("errorModal")
      )
      this.photoLink =
      'https://static.wikia.nocookie.net/otonari-no-tenshi/images/c/c9/No_images_available.jpg/revision/latest?cb=20220104141308';
    }
  
  getMaterials()
  {
    this.db.getData('Materials').subscribe((data) => 
    {
      data = data.sort((a, b) => a.Itemname.localeCompare(b.Itemname))
      //console.log("materials", data)
      this.condiments = data
    })
  }
  async savechanges()
  {
    //console.log("the materials", this.arraymaterial)
  
    var alertcontroller = await this.alertController.create
    ({
      header: 'Question',
      message: 'Are you sure you want to save this product?',
      backdropDismiss: false,
      buttons: 
      [
        {
          text: 'Yes',
          handler: () => 
          {
            var specificparams = 
            {
              Category: this.categorymodel,
              ProductName: this.productnamemodel,
              Stock: 0,
              UnitPrice: this.categorymodel != "Milktea" ? this.unitpricemodel : "0",
              ImageUrl: this.photoLink,
              Quantity: 1,
              GramsPerOrder: 0,
              Description: this.descriptionmodel,
              SmallPrice: this.categorymodel == "Milktea" ? this.smallpricemodel : "0",
              MediumPrice:  this.categorymodel == "Milktea" ? this.mediumpricemodel : "0",
              GramsPerOderSmall: 0,
              GramsPerOderMedium: 0,
              Materials: this.arraymaterial,
              Ingredients: {},
              Ratings: 0,
              TimesOrdered: 0,
              HasDiscount: false,
              DiscountValue: 0,
              DateCreated: moment(new Date()).format('YYYY-MM-DD')
            }
           this.db.postData('Products', specificparams)
           .then(async() => 
           {
                    var alert = await this.alertController.create
                    ({
                      message: 'Product added successfully!',
                      backdropDismiss: false,
                      buttons: 
                      [
                        {
                          text: 'Ok',
                          handler: async () => 
                          {
                            var loading = await this.loadingController.create
                            ({
                              spinner: 'circles',
                              message: 'Reloading Page Please wait...'
                            })
                            await loading.present();
                            await this.formModal.hide();
                            setTimeout(async () => {
                              await loading.dismiss();
                              window.location.reload() 
                            }, 4000);
                          }
                        }
                      ]
                    })
                    await alert.present();
           })
          }
        },
        {
          text: 'No',
          role: 'cancel'
        },
      ]
    })
    await alertcontroller.present();
  }
  setmaterialstoeditgramsperoder()
  {
    this.arraymaterial = this.materialmodel;
    this.arraymaterial = this.arraymaterial.map((i, index) => 
    {
        return Object.assign({}, 
          {
            itemId: i,
            gramsperordersmall : this.specificproductcondiments.filter(f => f.itemId === i).length > 0 ? 
            parseInt(this.specificproductcondiments.filter(f => f.itemId === i).map(function (e) {return e.gramsperordersmall}).toString())
            : 0,
            gramsperordermedium : this.specificproductcondiments.filter(f => f.itemId === i).length > 0 ? 
            parseInt(this.specificproductcondiments.filter(f => f.itemId === i).map(function (e) {return e.gramsperordermedium}).toString())
            : 0,
            gramsperorder :  this.specificproductcondiments.filter(f => f.itemId === i).length > 0 ? 
            parseInt(this.specificproductcondiments.filter(f => f.itemId === i).map(function (e) {return e.gramsperorder}).toString())
            : 0,  
          })
    })
    this.arraymaterial.map((i, index) => 
    {
      this.db.getDataById('Materials', i.itemId).subscribe((data) => 
      {
        i.itemName =  data.Itemname;
      })    
    })
  }
  async openModal() 
  {
    var validation = Object.assign(this.validation())
    if (validation.errormessage != "")
    {
      this.errMsg = validation.errormessage
      $('#modalerror').html(this.errMsg)
      await this.errorModal.show() 
    } 
    else 
    {
      this.setmaterialstoeditgramsperoder()
      await this.formModal.show()
      this.errMsg = ""
      $('#modalerror').html("")
      this.validationForGramsPerOrder()
    }
  }
  fileChanged(event: any) {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    //00fb1c6ab7c377f68517
    
    //this for my github account 760e7038539ea9dd5176
  
    //pukikinginamo@gmail.com account
    data.append('UPLOADCARE_PUB_KEY', 'd215c12fb1b590263b07')
    this.http.post('https://upload.uploadcare.com/base/', data).subscribe((events: any) => {
      var json = events
      for (var prop in json) {
        for (const variables of files) {
          this.photoLink = `https://ucarecdn.com/${json.file}/${variables.name}`
  
        }
      }
    this.thereisanimagealready = true
    })
  }
  
  validation()
  {
    var errormessage = ""
    var category = this.categorymodel == null || this.categorymodel == undefined || this.categorymodel == "";
    var productname = this.productnamemodel == null || this.productnamemodel == undefined || this.productnamemodel == "";
    var unitprice = this.unitpricemodel == null || this.unitpricemodel == undefined || this.unitpricemodel == "";
    var smallprice = this.smallpricemodel == null || this.smallpricemodel == undefined || this.smallpricemodel == "";
    var mediumprice = this.mediumpricemodel == null || this.mediumpricemodel == undefined || this.mediumpricemodel == "";
    var description = this.descriptionmodel == null || this.descriptionmodel == undefined || this.descriptionmodel == "";
    var materials = this.materialmodel == null || this.materialmodel == undefined || this.materialmodel == "";
    var photo = this.thereisanimagealready == false;
  
    if (this.categorymodel == "Milktea")
    {
      errormessage += category == true ? "<p>● Category</p>" : "";
      errormessage += productname == true ? "<p>● Name</p>" : "";
      errormessage += photo == true ? "<p>● Photo</p>" : "";
        errormessage += smallprice == true ? "<p>● Small Price</p>" : "";
        errormessage += mediumprice == true ? "<p>● Medium Price</p>" : "";
      errormessage += description == true ? "<p>● Description</p>" : "";
      errormessage += materials == true ? "<p>● Condiments</p>" : "";
      
      }
    else 
    {
      errormessage += category == true ? "<p>● Category</p>" : "";
      errormessage += productname == true ? "<p>● Name</p>" : "";
      errormessage += photo == true ? "<p>● Photo</p>" : "";
      errormessage += unitprice == true ? "<p>● Unit Price</p> " : "";
      errormessage += description == true ? "<p>● Description</p>" : "";
      errormessage += materials == true ? "<p>● Condiments</p>" : "";
    }
      this.validationMessageObject = 
      {
        errormessage: errormessage
      }
      return this.validationMessageObject;
    }
  
    updateGramsPerOrderEvent(event: any, mat: any)
  {
    mat.gramsperorder = parseInt(event.target.value)
    this.validationForGramsPerOrder()
    //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
    //mat.gramsperordersmall = this.category != 'Milktea' ? 0 : parseInt(event.target.value) 
  }
  updateGramsPerOrderSmallEvent(event: any, mat: any)
  {
    //mat.gramsperorder = this.category != 'Milktea' ? parseInt(event.target.value) : 0
    //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
    mat.gramsperordersmall = parseInt(event.target.value) 
    this.validationForGramsPerOrder()
  }
  updateGramsPerOrderMediumEvent(event: any, mat: any)
  {
    //mat.gramsperorder = this.category != 'Milktea' ? parseInt(event.target.value) : 0
    //mat.gramsperordermedium = this.category != 'Milktea' ? 0 : parseInt(event.target.value)
    mat.gramsperordermedium = parseInt(event.target.value)
    this.validationForGramsPerOrder() 
  }
  validationForGramsPerOrder()
  {
    var filterNanValues;
  
      if (this.categorymodel != 'Milktea')
      {
        filterNanValues = this.arraymaterial.filter(f => (isNaN(f.gramsperorder) || f.gramsperorder == 0) 
        || (isNaN(f.gramsperordersmall) && f.gramsperordersmall == 0)  || 
        (isNaN(f.gramsperordermedium) && f.gramsperordermedium == 0)
        )
      }
      else 
      {
        filterNanValues = this.arraymaterial.filter(f => (isNaN(f.gramsperorder) && f.gramsperorder == 0) 
        || (isNaN(f.gramsperordersmall) || f.gramsperordersmall == 0)  || 
        (isNaN(f.gramsperordermedium) || f.gramsperordermedium == 0)
        )
      }
      
      //var showCondimentsWithNaNValues = filterNanValues.map(function(e) {return `${e.itemName.replace(",", "")} \n`}).toString()
      //showCondimentsWithNaNValues = showCondimentsWithNaNValues.replace(",", "")
      if (filterNanValues.length >= 1)
      {
        this.disableSaveChangesButton = true
      }
      else 
      {
        //console.log("success")
        //alert("success")
        this.disableSaveChangesButton = false
      } 
  }
  
  closeModal()
  {
    this.formModal.hide()
  }


  handleChange(event: any) {
    const category = event.target.value.toLowerCase();
    if (category.toLowerCase() == 'milktea') {
      this.hideSizeDropdown = true;
     this.mediumpricemodel = ''  
    this.smallpricemodel = ''  
    this.unitpricemodel = ''  
    } else 
    {
      this.hideSizeDropdown = false;
      this.mediumpricemodel = ''
      this.smallpricemodel = ''
      this.unitpricemodel = ''
    }
    
  }
}
