import {Component, OnInit, ViewChild} from '@angular/core';
import {TabsetComponent} from 'ngx-bootstrap';
import { IUserDetailed } from '../../api-interfaces';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) public memberTabs: TabsetComponent;
  public user: IUserDetailed;
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];


  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.data.subscribe(
      (data) => { this.user = data.user; }
    );
    this.route.queryParams.subscribe(
      (params) => {
        if (params.tab) {
          this.memberTabs.tabs[params.tab].active = true;
        }
      }
    );

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      }
    ];
    this.galleryImages = this.getImages();
  }
  public selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
  private getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description,
      });
    }
    return imageUrls;
  }
}
