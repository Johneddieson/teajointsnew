import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBService } from '../services/db.service';
import { AlertController, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.scss']
})
export class EditproductsComponent implements OnInit {
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
  constructor
  (
    public actRoute: ActivatedRoute,
    public db: DBService,
    public alertController: AlertController
  ) 
  {

    this.productId = this.actRoute.snapshot.paramMap.get('id')
    this.getSpecificProduct()
    this.getMaterials()
  }

  ngOnInit(): void 
  {
    var wew = window as any
    this.formModal = new wew.bootstrap.Modal
    (
      document.getElementById("exampleModal")
    )
  }
  getSpecificProduct()
  {
    this.db.getDataById('Products', this.productId)
    .subscribe((data) => 
    {
     // console.log("specific data", data)
      this.category = data.Category;
      this.productname = data.ProductName
      this.imageurl = data.ImageUrl;
      this.description = data.Description
      this.unitprice = data.UnitPrice;
      this.smallprice = data.SmallPrice;
      this.mediumprice = data.MediumPrice;
      this.specificproductcondiments = data.Materials
      this.materialmodel = this.specificproductcondiments.length <= 0 ? [] : this.specificproductcondiments.map(function(e) {return e.itemId})
      
      //console.log("condiments", this.specificproductcondiments)
    }) 
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
savechanges()
{
  console.log("Wew", this.materialmodel);
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
  console.log("array", this.arraymaterial)
}


async openModal() 
{
  this.setmaterialstoeditgramsperoder()
 await this.formModal.show()
}
}
