import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { IPhoto } from '../../api-interfaces';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() public photos: IPhoto[];
  @Output() public getMemberPhotoChange = new EventEmitter<string>();

  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  private currentMain: IPhoto;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  public ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: unknown): void {
    this.hasBaseDropZoneOver = !!e;
  }

  private initializeUploader() {
    this.uploader = new FileUploader({
      url: environment.apiUrl + 'users/' + this.authService.getUserId() + '/photos',
      authToken: 'Bearer ' + AuthService.getToken(),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (!response) {
        return;
      }
      const res: IPhoto = JSON.parse(response);
      const photo: IPhoto = {
        id: res.id,
        url: res.url,
        dateAdded: res.dateAdded,
        description: res.description,
        isMain: res.isMain
      };
      this.photos.push(photo);
    };
  }
  public setMainPhoto(photo: IPhoto) {
    this.userService.setMainPhoto(this.authService.getUserId(), photo.id).subscribe(
      () => {
        this.currentMain = this.photos.filter(p => p.isMain)[0];
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.authService.changeMemberPhoto(photo.url);
        this.getMemberPhotoChange.emit(photo.url);
      },
      (error) => { this.alertify.error(error); }
    );
  }
}
