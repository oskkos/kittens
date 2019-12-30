import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/api-interfaces';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() protected user: IUser;

  constructor() { }

  ngOnInit() {
  }

}