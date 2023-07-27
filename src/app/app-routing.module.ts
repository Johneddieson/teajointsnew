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
},
{ 
  path: 'shop-details/:id', 
  loadChildren: () => import('./shop-details/shop-details.module').then(m => m.ShopDetailsModule)
 },
{ 
  path: 'shop/:category', 
  loadChildren: () => import('./shopwithcategory/shopwithcategory.module').then(m => m.ShopwithcategoryModule) 

},
{ 
  path: 'cart', 
  loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) 
},
{ 
  path: 'adminhome', 
  loadChildren: () => import('./adminhome/adminhome.module').then(m => m.AdminhomeModule) 
},
{ 
  path: 'adminviewproducts', 
  loadChildren: () => import('./viewproducts/viewproducts.module').then(m => m.ViewproductsModule) 
},
{ 
  path: 'admineditproduct/:id', 
  loadChildren: () => import('./editproducts/editproducts.module').then(m => m.EditproductsModule)
 },
{ 
  path: 'adminaddproduct', 
  loadChildren: () => import('./addproduct/addproduct.module').then(m => m.AddproductModule) 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
