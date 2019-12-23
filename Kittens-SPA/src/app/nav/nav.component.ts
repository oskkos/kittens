import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  protected model: IModel = {username: '', password: ''};

  constructor() { }

  public ngOnInit() {
  }

  protected login() {
    console.log(this.model);
  }
}

interface IModel {
  username: string;
  password: string;
}
