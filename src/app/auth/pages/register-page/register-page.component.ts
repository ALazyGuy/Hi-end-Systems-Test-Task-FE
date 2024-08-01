import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, ReactiveFormsModule, AsyncPipe],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  errors$: Subject<string[]> = new Subject();
  formGroup!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.buildFormGroup();
  }

  register(event: SubmitEvent) {
    event.preventDefault();
    
    if(this.formGroup.invalid) {
      Object.keys(this.formGroup.controls)
      .forEach(key => this.formGroup.controls[key].markAsTouched());
      return;
    }

    const test = this.formGroup.value;
    this.userService.registerUser(test).subscribe({next: errors => {
      this.errors$.next(errors);
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
