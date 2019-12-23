import { Component, OnInit } from '@angular/core';
import { IRegister } from '../api-interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  protected model: IRegister = {};

  constructor() { }

  public ngOnInit() {
  }

  protected register() {
    console.log(this.model);
  }
  protected cancel() {
    console.log('cancel');
  }
}
