import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, AsyncPipe, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{

  errors$: Subject<string[]> = new Subject();
  formGroup!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.buildFormGroup();
  }

  login(event: SubmitEvent) {
    event.preventDefault();
    
    if(this.formGroup.invalid) {
      Object.keys(this.formGroup.controls)
      .forEach(key => this.formGroup.controls[key].markAsTouched());
      return;
    }

    const test = this.formGroup.value;
    this.userService.loginUser(test).subscribe({next: errors => {
      this.errors$.next(errors);
      if(errors.filter(a => a.length > 0).length === 0) {
        this.router.navigateByUrl('/actions/home');
      }
    }});
  }

  private buildFormGroup(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, 
        Validators.pattern(/^([a-zA-Z]|\d)+$/)]],
      password: ['', [Validators.required, 
        Validators.pattern(/^([a-zA-Z]|\d|\s|(\$|\*|_))*$/)]],
    });
  }

}
