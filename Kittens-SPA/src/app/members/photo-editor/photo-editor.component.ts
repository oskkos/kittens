import { Component, OnInit, Input } from '@angular/core';
import { IPhoto } from '../../api-interfaces';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() public photos: IPhoto[];

  constructor() { }

  public ngOnInit() {
  }

}
