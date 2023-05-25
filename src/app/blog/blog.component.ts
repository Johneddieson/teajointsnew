import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';
import * as _ from 'lodash';
import * as moment from 'moment'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
blogs: any[] = []
categorylist: any[] = []
recentblogs: any[] = []
constructor(private db: DBService) 
  {
      this.getBlogs('All')
   }

  ngOnInit(): void 
  {
  }
  getBlogs(categoryfilter: any)
  {
    this.db.getBlogs().subscribe((data) => 
    {
      var currentmonthandyear = new Date()
      //get blogs
        this.blogs = categoryfilter == 'All' ? data : data.filter(f => f.Category == categoryfilter);
        this.blogs.map((i) => 
        {
          var imageConverted = i.ImageUrl.split("/")
          i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
          i.DateCreatedChangeFormat = moment(i.DateCreated).format('LL')
          i.DateCreatedMonthAndYear = moment(moment(i.DateCreated).toDate()).format('YYYY-MM')
          i.ImageConvertedForRecent = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/100x100/`
        })
        //End of get blogs

          //Get category grouped by
          var groupedbycategory = _(data).groupBy('Category')
          .map((items, category) => 
          {
           return category  
         }).value() 
           this.categorylist = groupedbycategory
          //End of Get category grouped by

          //Recent Blogs
          
          var recentblogs = data
          recentblogs.map((i) => 
          {
            var imageConverted = i.ImageUrl.split("/")
            i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
            i.DateCreatedChangeFormat = moment(i.DateCreated).format('LL')
            i.DateCreatedMonthAndYear = moment(moment(i.DateCreated).toDate()).format('YYYY-MM')
            i.ImageConvertedForRecent = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/100x100/`
          })
          var finalizerecentblogs = recentblogs.filter(f => f.DateCreatedMonthAndYear == moment(currentmonthandyear).format('YYYY-MM'))
          this.recentblogs = finalizerecentblogs;
          
          //End of Recent Blogs


          //Filter by Category

          //End of Filter by Category
    })
  }

}
