import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IRegister } from '../api-interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: {id: number, name: string};

  @Output() cancelRegister = new EventEmitter();

  protected model: IRegister = {};

  constructor() { }

  public ngOnInit() {
  }

  protected register() {
    console.log(this.model);
  }
  protected cancel() {
    this.cancelRegister.emit({cancelled: true});
  }
}
