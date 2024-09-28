import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: AddProductComponent
  },
  {
    path: 'update/:id',
    component: UpdateProductComponent
  },
  { 
    path: 'category/:categoryId', // This allows for category filtering
    component: ProductListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
