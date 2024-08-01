import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { UserInfo } from '../../../core/models/user-info';
import { Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { PopupComponent } from "../../components/popup/popup.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgIf, AsyncPipe, PopupComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  userInfo$!: BehaviorSubject<UserInfo | null>;
  isPopupOpen: boolean = false;
  popupLabel: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.loadUserInfo().subscribe();
    this.userInfo$ = this.userService.getUserInfo$();
  }

  onControlClick(label: string) {
    this.isPopupOpen = true;
    this.popupLabel = label;
  }

  onPopupCancel(): void {
    this.isPopupOpen = false;
  }

  onPopupSubmit(event: any) {
    console.log(event);
  }

}
