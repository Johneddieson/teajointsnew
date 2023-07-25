import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBService } from '../services/db.service';
import { AlertController } from '@ionic/angular';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    
  }
  getSpecificProduct()
  {
    this.db.getDataById('Products', this.productId)
    .subscribe((data) => 
    {
      console.log("specific data", data)
      this.category = data.Category;
      this.productname = data.ProductName
      this.imageurl = data.ImageUrl;
      this.description = data.Description
      this.unitprice = data.UnitPrice;
      this.smallprice = data.SmallPrice;
      this.mediumprice = data.MediumPrice;
      this.specificproductcondiments = data.Materials
      console.log("condiments", this.specificproductcondiments)
    }) 
  }

getMaterials()
{
  this.db.getData('Materials').subscribe((data) => 
  {
    //console.log("materials", data)
    this.condiments = data
  })
}

}
