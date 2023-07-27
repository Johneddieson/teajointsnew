import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-viewmaterials',
  templateUrl: './viewmaterials.component.html',
  styleUrls: ['./viewmaterials.component.scss']
})
export class ViewmaterialsComponent implements OnInit {
materials: any[] = []
formModal: any;
specificmaterial: any[] = []
stockonhandmodel: any;
  constructor(private db: DBService,
    private alertcontroller: AlertController,
    private loadingcontroller: LoadingController) 
    { 
      this.getmaterials('')
    }

  ngOnInit(): void 
  {
    var bootstrapmodal = window as any
    this.formModal = new bootstrapmodal.bootstrap.Modal
    (
      document.getElementById("exampleModal")
    )
  }
  getmaterials(itemnamefilter: any)
  {
    this.db.getData('Materials').subscribe((data) => 
    {
      if (itemnamefilter != null || itemnamefilter != '' || itemnamefilter != undefined)
      {
        data = data.filter(f => f.Itemname.toLowerCase().includes(itemnamefilter));
      }
      this.materials = data
    })
  }
  
  searchEvent(event: any)
  {
    var data = event.target.value
    this.getmaterials(data);
  }
  closeModal()
{
  this.formModal.hide()
}
async openModal(data: any)
{
  this.specificmaterial = []
  await this.formModal.show()

  //console.log("iww", this.specificmaterial)
  this.specificmaterial.push(data);
}
 savechanges()
{
  var obj = 
  {
    Stock: parseInt(this.specificmaterial[0].Stock.toString())
  }
  this.db.updateData(this.specificmaterial[0].id, obj, 'Materials').then(async (el) => 
  {
    var alert = await this.alertcontroller.create
    ({
      message: `${this.specificmaterial[0].Itemname} stock on hand updated successfully`,
      backdropDismiss: false,
      buttons: 
      [
        {
          text: 'Close',
          handler: () => 
          {
              this.formModal.hide()
          }
        }
      ]
    })
    await alert.present()
  })

}

}
