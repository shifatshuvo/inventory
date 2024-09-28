import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import {
  faEdit,
  faTrash,
  faPlus,
  faArrowRight,
  faArrowLeft,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { category, product } from './../../../shared/interfaces/data-type';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;
  plusIcon = faPlus;
  minusIcon = faMinus
  nextIcon = faArrowRight;
  prevIcon = faArrowLeft;

  products: product[] = [];
  categories: category[] | undefined;
  currentPage = 0;
  pageSize = 5;
  totalPages: number = 0;
  deleteMessage: string | undefined;
  selectedCategory: number | undefined;
  searchQuery: string = '';

  searchControl = new FormControl();
  showModal = false; // Modal visibility control
  productToDeleteId: number | undefined; // Store the product ID for deletion
  productToDeleteName: string | undefined;

  constructor(
    private productService: ProductService,
    // private activeRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    let categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.selectedCategory = categoryId ? +categoryId : undefined;
    this.loadProductData(this.currentPage, this.pageSize);

    // this.activeRoute.paramMap.subscribe(params => {
    //   const categoryId = params.get('categoryId');
    //   this.selectedCategory = categoryId ? +categoryId : undefined;
    //   this.loadProductData(this.currentPage, this.pageSize);
    // });

    this.loadCategory();

    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((query: string) => {
      this.searchQuery = query;
      this.currentPage = 0;
      this.loadProductData(this.currentPage, this.pageSize);
    });
  }

  // Method to open the confirmation modal
  deleteProduct(id: number, name: string) {
    this.showModal = true; // Show the modal
    this.productToDeleteId = id; // Store the product ID for confirmation
    this.productToDeleteName = name; // Store the product name for confirmation Show
  }

  // Confirm delete action
  confirmDelete() {
    if (this.productToDeleteId !== undefined) {
      this.productService.deleteProduct(this.productToDeleteId).subscribe(() => {
        this.loadProductData(this.currentPage, this.pageSize);
        this.deleteMessage = 'Successfully Deleted!';
        setTimeout(() => (this.deleteMessage = undefined), 1000);
      });
    }
    this.showModal = false; // Hide the modal after deletion
  }

  // Cancel delete action
  cancelDelete() {
    this.showModal = false; // Hide the modal without deleting
    this.productToDeleteId = undefined; // Clear the product ID
  }

  loadProductData(page: number, size: number) {
    this.productService
      .getProductData(page, size, this.selectedCategory, this.searchQuery)
      .subscribe((response) => {
        this.products = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      });
  }

  onSortByCategory() {
    this.currentPage = 0;
    this.loadProductData(this.currentPage, this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProductData(this.currentPage, this.pageSize);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProductData(this.currentPage, this.pageSize);
    }
  }

  hasPrevPage(): boolean {
    return this.currentPage > 0;
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe((result) => {
      this.categories = result;
    });
  }


  // Increment Quantity
incrementQuantity(product: product) {
  product.quantity++;
  this.productService.incrementProductQuantity(product.id, 1).subscribe(() => {
      // console.log('Quantity incremented successfully');
  });
}

// Decrement Quantity
decrementQuantity(product: product) {
  if (product.quantity > 0) {
      product.quantity--;
      this.productService.decrementProductQuantity(product.id, 1).subscribe(() => {
          // console.log('Quantity decremented successfully');
      });
  }
}


  // Optional: Update the product quantity in the backend
  updateProductQuantity(product: product) {
    this.productService.updateProduct(product).subscribe(() => {
      // console.log('Quantity updated successfully');
    });
  }

}
