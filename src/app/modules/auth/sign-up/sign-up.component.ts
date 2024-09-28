import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class SignUpComponent {
  Message: string | undefined;
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.getForm();
  }

  submit(): void {
    if (!this.signUpForm.valid) {
      alert('Invalid Form Data');
      return;
    }

    this.authService.signUp(this.signUpForm).subscribe({
      next: res => {
        console.log('Response:', res);
        this.Message = res.message || 'Signup successful';

        if (res) {
          setTimeout(() => {
            this.Message = undefined;
            this.router.navigate(['/auth/sign-in']);
          }, 1000);
        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.Message = err.error?.message || 'Invalid Credentials!!';
      }
    });
  }

  private getForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]], // Increased min length for security
      role: ['', Validators.required],
    });
  }
}
