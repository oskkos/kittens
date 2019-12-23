import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  protected registerMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  protected registerToggle() {
    this.registerMode = true;
  }

  protected cancelRegister(data: {}) {
    this.registerMode = false;
  }

}
