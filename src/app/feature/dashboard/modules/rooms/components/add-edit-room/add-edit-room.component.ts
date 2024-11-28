import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RoomService } from '../../services/room.service';

import { MessageService } from 'primeng/api';

import { RoomFacility } from '../../interfaces/room-facility';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../interfaces/room';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.scss'],
})
export class AddEditRoomComponent {
  loading = false;

  facilitiesDropDown: RoomFacility[] = [];

  id: string;
  details: Room;

  multipleImages = true;
  imagesLimit = 5;
  initialImages: any[] = [];
  images: any[] = [];

  mode: string = '';

  roomForm = new FormGroup({
    roomNumber: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    capacity: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required]),
    facilities: new FormControl([], [Validators.required]),
  });

  constructor(
    private _room: RoomService,
    private _route: ActivatedRoute,
    private _router: Router,
    public messageService: MessageService
  ) {
    this._route.params.subscribe({
      next: ({ id }) => {
        this.id = id;
      },
    });
  }

  ngOnInit(): void {
    this.getRoomFacilities();
  }

  checkRoute(): void {
    const currentRoute = this._router.url;
    if (currentRoute.includes('view')) {
      this.mode = 'view';
      this.roomForm.disable();
    } else {
      this.mode = 'editable';
      this.roomForm.enable();
    }
  }
  getRoomFacilities(): void {
    this._room.getRoomFacilities().subscribe({
      next: ({ data }) => {
        this.facilitiesDropDown = data.facilities;

        if (this.id) {
          this.initRoom();
        } else {
          this.mode = 'add';
        }
      },
      error: () => {
        if (this.id) {
          this.initRoom();
        }
      },
    });
  }

  initRoom(): void {
    this._room.getRoomById(this.id).subscribe({
      next: ({ data }) => {
        this.details = data.room;

        const {
          roomNumber,
          price,
          capacity,
          discount,
          facilities,
          images,
        }: any = this.details;

        this.roomForm.patchValue({
          roomNumber,
          price,
          capacity,
          discount,
          facilities: facilities.map((facility: any) => facility._id) || [],
        });

        this.initialImages = images;
        console.log(this.details);

        this.checkRoute();
      },
    });
  }

  handleFormData(): FormData {
    const roomFormData: FormData = new FormData();

    for (const [key, value] of Object.entries(this.roomForm.value)) {
      if (Array.isArray(value)) {
        value.forEach((element) => {
          roomFormData.append(key, element);
        });
      } else if (typeof value === 'string') {
        roomFormData.append(key, value);
      } else {
        roomFormData.append( key, value as any );
      }
    }

    this.images.forEach((image: File) => {
      roomFormData.append( 'imgs', image );
      console.log(roomFormData.getAll);
      
    });

    return roomFormData;
  }

  cancel(): void {
    this._router.navigate(['dashboard', 'rooms', 'list']);
  }

  submit(): void {
    this.roomForm.markAllAsTouched();

    const roomFormData = this.handleFormData();

    if (this.roomForm.valid) {
      if (this.id) {
        this.editRoom(roomFormData);
      } else {
        this.addRoom(roomFormData);
      }
    }
  }

  addRoom(formData: FormData): void {
    this._room.addRoom(formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Room added successfully!',
        });

        this._router.navigate(['/dashboard/rooms/list']);
      },
    });
  }

  editRoom(formData: FormData): void {
    this._room.editRoom(formData, this.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Room updated successfully!',
        });

        this._router.navigate(['/dashboard/rooms/list']);
      },
    });
  }

  updateImages(e: any): void {
    this.images = Array.from(e);
  }

}
