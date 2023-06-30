import { Component } from '@angular/core';
import { DBService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wingsandsnacks';
  constructor(private db:DBService)
  {
    // get products list

    //  this.db.getProducts().subscribe((data)=>{
    //    console.log("the products", data);
    //  })

    // end of get products list

    
    // this.db.getData('Products').subscribe((data) =>
    // {
    //   data.forEach(fe => 
    //     {
    //       var obj = 
    //       {
    //         HasDiscount: false,
    //         DiscountValue: 0
    //       }
    //       this.db.updateData(fe.id, obj, 'Products').then(() => {}).catch(() => {})
    //     })
    // })

  }

}
