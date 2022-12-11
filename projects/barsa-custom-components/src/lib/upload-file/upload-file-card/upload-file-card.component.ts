import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkeletonsTypes } from '../../emums/sketonsTypes';
import { UploadFileCardActionType } from '../../emums/uploadFileCardActionType';

@Component({
  selector: 'bcc-upload-file-card',
  templateUrl: './upload-file-card.component.html',
  styleUrls: ['./upload-file-card.component.scss'],
})
export class UploadFileCardComponent implements OnInit {
  public SkeletonsTypes = SkeletonsTypes;
  public UploadFileCardActionType = UploadFileCardActionType;

  @Input() fileIsUploaded: boolean = false;
  @Input() fileItem;
  @Input() context;
  @Input() file;
  @Output() buttonTypeAction = new EventEmitter<{
    id?: string;
    url?: string;
    type: UploadFileCardActionType;
  }>();

  constructor() {}

  ngOnInit(): void {}

  onClick(type: UploadFileCardActionType, id?: string, url?: string) {
    if (!this.fileIsUploaded && type == this.UploadFileCardActionType.UPLOAD) {
      this.buttonTypeAction.emit({
        type: this.UploadFileCardActionType.UPLOAD,
      });
    } else {
      switch (type) {
        case this.UploadFileCardActionType.DELETE:
          this.buttonTypeAction.emit({
            id,
            type: this.UploadFileCardActionType.DELETE,
          });
          break;
        case this.UploadFileCardActionType.SAVE:
          this.buttonTypeAction.emit({
            id,
            type: this.UploadFileCardActionType.SAVE,
          });
          break;
        case this.UploadFileCardActionType.ZOOM:
          this.buttonTypeAction.emit({
            url,
            type: this.UploadFileCardActionType.ZOOM,
          });
          break;
      }
    }
  }
}
