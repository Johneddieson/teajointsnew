import { Component, OnInit } from '@angular/core';
import { DBService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wingsandsnacks';
  currentpath: string = ''
  isadmin: boolean = false
  constructor(private db:DBService)
  {
    // get products list

    //  this.db.getProducts().subscribe((data)=>{
    //    console.log("the products", data);
    //  })

    // end of get products list
  }

  ngOnInit(): void {
    
    setInterval(() => 
    {
      this.currentpath = window.location.pathname;
      this.isadmin = this.currentpath.includes('/admin')
    }, 100)
  }

}
