import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  protected registerMode = false;

  constructor() { }

  ngOnInit() {
  }

  protected registerToggle() {
    this.registerMode = !this.registerMode;
  }
}
