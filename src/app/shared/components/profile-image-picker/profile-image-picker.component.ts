import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-image-picker',
  templateUrl: './profile-image-picker.component.html',
  styleUrls: ['./profile-image-picker.component.scss'],
})
export class ProfileImagePickerComponent {
  @Output() profileImageEmitter = new EventEmitter();

  profileImage!: any;

  uploadImage(e: any): void {
    this.profileImage = e.currentFiles && e.currentFiles[0];

    this.profileImageEmitter.emit(this.profileImage);
  }

  removeImage(e: Event) {
    this.profileImage = null;

    this.profileImageEmitter.emit(this.profileImage);

    e.stopPropagation();
  }
}
