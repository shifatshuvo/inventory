import { category } from './../../../shared/interfaces/data-type';
import { Component, OnInit } from '@angular/core';
import {
  faEdit,
  faTrash,
  faPlus,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;
  plusIcon = faPlus;
  nextIcon = faArrowRight;
  prevIcon = faArrowLeft;

  categories: category[] | undefined;
  deleteMessage: string | undefined;
  showModal = false; // Modal visibility control

  categoryIdToDelete: number | undefined;
  categoryNameToDelete: string | undefined;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategory(); // load category
  }


    // Method to open the confirmation modal
    deleteCategory(id: number, name: string) {
      this.showModal = true; // Show the modal
      this.categoryIdToDelete = id; // Store the category ID for confirmation
      this.categoryNameToDelete = name; // Store the category name for confirmation Show
    }
  
    // Confirm delete action
    confirmDelete() {
      if (this.categoryIdToDelete !== undefined) {
        this.categoryService.deleteCategory(this.categoryIdToDelete).subscribe(() => {
          this.loadCategory();
          this.deleteMessage = 'Successfully Deleted!';
          setTimeout(() => (this.deleteMessage = undefined), 1000);
        });
      }
      this.showModal = false; // Hide the modal after deletion
    }
  
    // Cancel delete action
    cancelDelete() {
      this.showModal = false; // Hide the modal without deleting
      this.categoryIdToDelete = undefined; // Clear the category ID
    }

  // Load Categories
  loadCategory() {
    this.categoryService.getAllCategory().subscribe((result) => {
      this.categories = result;
    });
  }
}




















// [routerLink]="['/products/category/', category.id]"
