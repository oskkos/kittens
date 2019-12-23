import { Component, OnInit } from '@angular/core';
import { ILogin } from '../interfaces';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  protected model: ILogin = {};

  constructor() { }

  public ngOnInit() {
  }

  protected login() {
    console.log(this.model);
  }
}
