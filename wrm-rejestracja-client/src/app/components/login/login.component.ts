import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, HttpClientModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent {
  showClientForm = true;
  showWorkerForm = false;
  isClientLoggedIn = false
  isEmployeeLoggedIn = false;
  clientForm: FormGroup;
  workerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.clientForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.workerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onClientLogin() {
    this.login(this.clientForm.value, '/client-menu', 'client');
  }

  onEmployeeLogin() {
    this.login(this.workerForm.value, '/employee-menu', 'employee');
  }

  toggleForm() {
    this.showClientForm = !this.showClientForm;
    this.showWorkerForm = !this.showWorkerForm;
  }

  login(credentials: { username: string; password: string }, redirectRoute: string, userType: string) {
    let url = '';

    if (userType === 'client') {
      url = 'http://localhost:3000/patient-login';
    } else if (userType === 'employee') {
      url = 'http://localhost:3000/employee-login';
    }

    const data = credentials;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post(url, data, { headers }).subscribe(
      (response: any) => {

        if (userType === 'client') {
          this.authService.clientLogin();
        } else if (userType === 'employee') {
          this.authService.employeeLogin();
        }

        if (response == true) {
          this.router.navigate([redirectRoute]);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
