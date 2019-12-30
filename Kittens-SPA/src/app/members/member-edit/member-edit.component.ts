import { Component, OnInit } from '@angular/core';
import { IUserDetailed } from 'src/app/api-interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  protected user: IUserDetailed;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => { this.user = data.user; }
    );
 }

}
