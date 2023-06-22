import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
specificid!: any
category!: any
comments!: any
datecreated!: any;
description!: any;
imageurl!: any;
subdescription!: any;
subtitle!: any;
title!: any;
categories: any[] = []
recentblog: any[] = []
  constructor(private afauth: AngularFireAuth, private dbservice: DBService,
    private actRoute: ActivatedRoute) 
  { 
    this.specificid = this.actRoute.snapshot.paramMap.get('id'); 
    this.dbservice.getDataById(`Blog`, this.specificid)
    .subscribe((specificblog) => 
    {
      this.title = specificblog.Title
      this.datecreated = moment(moment(specificblog.DateCreated).toDate()).format("MMMM D, YYYY")
      this.comments = specificblog.Comments.length
      var imageConverted = specificblog.ImageUrl.split("/")

      this.imageurl = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/800x800/`
      this.description = specificblog.Description;
      this.subtitle = specificblog.Subtitle
      this.subdescription = specificblog.Subdescription
      this.category = specificblog.Category
    })

    this.queryallBlogs();
  }

  queryallBlogs()
  {
      this.dbservice.getData('Blog').subscribe((data) => 
      {
        data.map((i, index) => 
        {
          var imageConverted = i.ImageUrl.split("/")
          i.ImageConverted = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/270x270/`
          i.DateCreatedChangeFormat = moment(i.DateCreated).format('LL')
          i.DateCreatedMonthAndYear = moment(moment(i.DateCreated).toDate()).format('YYYY-MM')
          i.ImageConvertedForRecent = `${imageConverted[0]}//${imageConverted[2]}/${imageConverted[3]}//-/contrast/3/-/filter/cyren/100/-/preview/100x100/`
        var datecreated = moment(moment(i.DateCreated).toDate())
        var datetoday = moment(new Date())
        var datecreatedDuration = moment.duration(datecreated.diff(datetoday)).asMonths() * -1
         i.DateCreatedDuration = parseInt(datecreatedDuration.toString()) 
      })

        var groupedbycategory = _(data).groupBy('Category')
        .map((items, category) => 
        {
         return category  
       }).value() 
      
       this.categories = groupedbycategory;

        var recentblogfilter = data.filter(f => f.DateCreatedDuration <= 2)
        this.recentblog = recentblogfilter.splice(0,3);
      })
  }

  ngOnInit(): void {
  }

  convertedTitle(data: any)
  {
    const middleIndexfortoprated = Math.ceil(data.Title.length / 2);
    const firstconcatfortitle = data.Title.slice(0, middleIndexfortoprated);   
    const secondconcatfortitle = data.Title.slice(-middleIndexfortoprated);
    const object = 
    {
      firstconcatfortitle: firstconcatfortitle,
      secondconcatfortitle: secondconcatfortitle
    }
    return object;
  }
  convertDateForRecentBlog(data: any)
  {
    var convert = moment(moment(data.DateCreated).toDate()).format('MMM DD, YYYY')
    return convert;
  }

}
