import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { FileUpload } from 'primeng/fileupload';

import { ImagePickerService } from '../../services/image-picker.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent {
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  @Output() imagesEmitter = new EventEmitter();

  @Input() initialImages: any[] = [];
  @Input() multiple = false;
  @Input() name: string;
  @Input() fileLimit: number = 3;
  @Input() isView: boolean;

  images: any[] = [];

  constructor(
    private _imagePicker: ImagePickerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._imagePicker.convertUrlsToFiles(this.initialImages).then((files) => {
      this.images = files;

      setTimeout(() => {
        this.fileUpload.files = [...files];

        this.cdr.detectChanges();
      });
    });
  }

  trackByFn(index: number, file: any): any {
    return file.name;
  }

  uploadImage(e: any): void {
    this.images = [...e.currentFiles];

    this.imagesEmitter.emit(this.images);
  }

  removeImage(index: number): void {
    this.fileUpload.files.splice(index, 1);

    this.images = [...this.fileUpload._files];

    this.imagesEmitter.emit(this.images);
  }
}
