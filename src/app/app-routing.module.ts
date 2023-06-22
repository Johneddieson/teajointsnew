import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {
    path: 'none',
    redirectTo: '',
    pathMatch: 'full',
  },
  { 
    path: '', 
    loadChildren: () => import('./mainpage/mainpage.module')
    .then(m => m.MainpageModule) 
  },
{ 
  path: 'shop', 
  loadChildren: () => import('./shop/shop.module')
  .then(m => m.ShopModule) 
},
{ 
  path: 'blog', 
  loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) 
},
{ 
  path: 'contact', 
  loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) 
},
{ 
  path: 'blog-details/:id', 
  loadChildren: () => import('./blog-details/blog-details/blog-details.module').then(m => m.BlogDetailsModule) 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
