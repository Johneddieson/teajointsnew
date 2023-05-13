import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
public curentpath: string = ''
public hero: string = ''
  constructor() { }

  ngOnInit(): void {

    setInterval(() => 
    {
      this.curentpath = window.location.pathname;
    }, 100)


    $('.hero__categories__all').on('click', function()
    {
      $('.hero__categories ul').slideToggle(400);
    });
  }

}
