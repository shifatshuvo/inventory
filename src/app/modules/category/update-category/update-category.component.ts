import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { category } from '../../../shared/interfaces/data-type';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  createCategoryMessage: string | undefined;
  backIcon = faArrowLeft;

  selectedCatId: number | undefined;
  categoryData: category | undefined;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    let catId = this.route.snapshot.paramMap.get('id');
    catId &&
      this.categoryService.getACat(catId).subscribe((data) => {
        this.categoryData = data;

        this.selectedCatId = this.categoryData.id;
      });
  }

  updateCategory(data: category) {
    this.categoryService.updateACategory( this.selectedCatId, data).subscribe(() => {
      this.createCategoryMessage = 'Category Updated!!';

      setTimeout(() => {
        this.createCategoryMessage = undefined;
        this.router.navigate(['/category']);
      }, 1000);
    })

  }


    // Function to handle selection change
    // onCategoryChange(event: any) {
    //   this.selectedCategory = event;
    // }

}
