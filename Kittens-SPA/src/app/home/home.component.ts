import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public registerMode = false;

  constructor(private http: HttpClient) { }

  public ngOnInit() {
  }

  public registerToggle() {
    this.registerMode = true;
  }

  public cancelRegister(data: {}) {
    this.registerMode = false;
  }

}
