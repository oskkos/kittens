import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  private values: IValue[];

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      (response: IValue[]) => { this.values = response; },
      (error) => { console.log(error); }
    );
  }
}

interface IValue {
  id: number;
  name: string;
}
