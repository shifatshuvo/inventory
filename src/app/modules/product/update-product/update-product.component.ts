import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { category, product } from '../../../shared/interfaces/data-type';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  backIcon = faArrowLeft;
  categories: category[] | undefined;
  productData: product | undefined;
  selectedProductId: number | undefined;
  selectedCategory: number | undefined;
  updateMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {

    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.productService.getAProduct(productId).subscribe((data) => {
        this.productData = data;

        this.selectedProductId = this.productData.id;
        this.selectedCategory = this.productData?.category?.id;
      });


    this.loadCategory();
  }

  updateAProduct(data: any) {
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

      this.productService.updateAProduct(productData, this.selectedProductId).subscribe(() => {
        this.updateMessage = 'Updated Successfully';

        setTimeout(() => {
          this.updateMessage = undefined;
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

  // Function to handle selection change
  onCategoryChange(event: any) {
    this.selectedCategory = event;
  }

}
