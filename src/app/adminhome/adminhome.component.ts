import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void 
  
  {
    (function ($) 
    {
      // var body = $('body');
      var body = $('.container-scroller');
      $('[data-toggle="minimize"]').on("click", function() {
        if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
          body.toggleClass('sidebar-hidden');
        } else {
          body.toggleClass('sidebar-icon-only');
        }
      });

      $('[data-toggle="offcanvas"]').on("click", function() {
        $('.sidebar-offcanvas').toggleClass('active')
      });
  })(jQuery);
  }

}
