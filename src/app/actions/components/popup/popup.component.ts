import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit{

  @Input() label: string = '';
  @Input() isOpen: boolean = false;
  @Input() isError: boolean = false;

  @Output() onSubmit: EventEmitter<number> = new EventEmitter();
  @Output() onCancel: EventEmitter<null> = new EventEmitter();

  @ViewChild('popup') popup!: ElementRef<HTMLDivElement>;

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      value: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]]
    });
  }

  @HostListener('click', ['$event.target']) 
  clickAnywhere(target: HTMLElement) {
    if(!this.popup.nativeElement.contains(target) && target != this.popup.nativeElement) {
      this.cancel();
    }
  }

  click(event: SubmitEvent) {
    event.preventDefault();

    if(this.formGroup.valid) {
      this.onSubmit.emit(this.formGroup.controls['value'].value);
      return;
    }

    this.formGroup.markAsTouched();
  }

  cancel(): void {
    this.formGroup.markAsUntouched();
    this.onCancel.emit(null);
    this.formGroup.controls['value'].setValue('');
  }

}
