import { Component } from '@angular/core';
import { faBoxOpen, faDashboard, faGear, faList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { user } from '../../../shared/interfaces/data-type';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  settingIcon = faGear;
  logoutIcon = faRightFromBracket;
  dashboardIcon = faDashboard;
  productIcon = faBoxOpen;
  categoryIcon = faList;

  userData: user | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      this.userData = user;
    }
}


  signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(['/auth/sign-in']);
  }

}
