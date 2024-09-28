import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { category } from '../../../shared/interfaces/data-type';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  createCategoryMessage: string | undefined;
  backIcon = faArrowLeft;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  createACategory(data: category) {
    this.categoryService.createCategory(data).subscribe(() => {
      this.createCategoryMessage = 'Category Created!!';

      setTimeout(() => {
        this.createCategoryMessage = undefined;
        this.router.navigate(['/category']);
      }, 1000);
    })

  }
}
