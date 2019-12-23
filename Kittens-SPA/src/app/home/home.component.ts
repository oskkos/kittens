import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  protected registerMode = false;
  private values: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  protected registerToggle() {
    this.registerMode = !this.registerMode;
  }

  private getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      (response: any[]) => { this.values = response; },
      (error) => { console.log(error); }
    );
  }
}
