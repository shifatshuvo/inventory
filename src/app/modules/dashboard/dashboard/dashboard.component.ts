import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  totalUs: number | undefined;
  totalProd: number | undefined;
  totalCat: number | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadTotalProduct();
    this.loadTotalCategory();
    this.loadTotalUser();
  }

  loadTotalCategory() {
    this.dashboardService.getTotalCategory().subscribe((result) => {
      this.totalCat = result;
    });
  }

  loadTotalProduct() {
    this.dashboardService.getTotalProducts().subscribe((res) => {
      this.totalProd = res;
    });
  }

  loadTotalUser() {
    this.dashboardService.getTotalUsers().subscribe((result) => {
      this.totalUs = result;
    });
  }

}
