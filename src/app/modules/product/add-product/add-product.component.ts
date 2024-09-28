// import { ProductService } from './../../../services/product.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { category, product, user } from '../../../shared/interfaces/data-type';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  backIcon = faArrowLeft;
  categories: category[] | undefined;
  productData: product | undefined;
  addMessage: string | undefined;
  selectedCategory: category | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  addProduct(data: any) {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);

      // Modify the JSON format
      var productData = {
        name: data.name,
        category: { id: data.CategoryId },
        user: {id: user.id},
        price: data.price, quantity: data.quantity, imgUrl: data.imgUrl,
        description: data.description
      };
      console.log(productData)

      this.productService.addProduct(productData).subscribe(() => {
        this.addMessage = 'Product is Successfully added';

        setTimeout(() => {
          this.addMessage = undefined;
          this.router.navigate(['/products']);
        }, 1000);
      });
    }
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe((result) => {
      this.categories = result;
    });
  }
}
