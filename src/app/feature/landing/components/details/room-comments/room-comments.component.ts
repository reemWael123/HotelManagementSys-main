import { Component, Input } from '@angular/core';

import { LandingService } from '../../../services/landing.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { RoomComment } from '../../../interfaces/room-comment';
import { AddComment } from '../../../interfaces/add-comment';

@Component({
  selector: 'app-room-comments',
  templateUrl: './room-comments.component.html',
  styleUrls: ['./room-comments.component.scss'],
})
export class RoomCommentsComponent {
  @Input() roomId: string;

  comment: string;
  commentsList: RoomComment[];

  userName: string = '';

  isLoggedIn: boolean = false;
  isCommentBefore: boolean = false;
  isEditable: boolean | string = false;

  constructor(
    private _landing: LandingService,
    private _message: MessageService,
    private _translate: TranslateService
  ) {
    this.isLoggedIn = localStorage.getItem('userToken') ? true : false;
    this.userName = localStorage.getItem('userName') ?? '';
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.getComments();
    }
  }

  getComments(): void {
    this._landing.getComments(this.roomId).subscribe({
      next: ({ data }) => {
        this.commentsList = data.roomComments;

        this.commentsList.forEach(({ user }) => {
          if (user.userName == this.userName) {
            this.isCommentBefore = true;
          }
        });
      },
    });
  }

  onComment(): void {
    if (!this.isLoggedIn) {
      this._message.add({
        severity: 'error',
        summary: this._translate.instant('ERROR_MESSAGES.ERROR_TITLE'),
        detail: this._translate.instant('ERROR_MESSAGES.LOGIN_FIRST'),
      });
    } else if (this.comment) {
      const roomComment = {
        roomId: this.roomId,
        comment: this.comment,
      };

      if (this.isEditable) {
        this.updateComment();
      } else {
        this.addComment(roomComment);
      }
    }
  }

  addComment(roomComment: AddComment): void {
    this._landing.addComment(roomComment).subscribe({
      next: () => {
        this.comment = '';

        this._message.add({
          severity: 'success',
          summary: this._translate.instant('SUCCESS_MESSAGES.SUCCESS_TITLE'),
          detail: this._translate.instant(
            'SUCCESS_MESSAGES.ADD_COMMENT_SUCCESS'
          ),
        });

        this.getComments();
      },
    });
  }

  updateComment(): void {
    this._landing.updateComment(this.isEditable, this.comment).subscribe({
      next: () => {
        this.comment = '';

        this._message.add({
          severity: 'success',
          summary: this._translate.instant('SUCCESS_MESSAGES.SUCCESS_TITLE'),
          detail: this._translate.instant(
            'SUCCESS_MESSAGES.ADD_COMMENT_SUCCESS'
          ),
        });

        this.isEditable = false;
        this.getComments();
      },
      error: () => (this.isEditable = false),
    });
  }

  deleteComment(comment: RoomComment): void {
    this._landing.deleteComment(comment).subscribe({
      next: () => {
        this._message.add({
          severity: 'success',
          summary: this._translate.instant('SUCCESS_MESSAGES.SUCCESS_TITLE'),
          detail: this._translate.instant(
            'SUCCESS_MESSAGES.DELETE_COMMENT_SUCCESS'
          ),
        });

        this.isCommentBefore = false;
        this.getComments();
      },
    });
  }
}
