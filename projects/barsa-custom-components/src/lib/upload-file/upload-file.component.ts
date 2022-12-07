import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FileAttachmentInfo,
  getIcon,
  getImagePath,
  UploadService,
} from 'barsa-novin-ray-core';
import { UiPdfViewerComponent } from 'barsa-sap-ui';
import { AttachmentIconTypes } from '../emums/attachmentIconTypes';
import { SkeletonsTypes } from '../emums/sketonsTypes';
import { UploadFileCardActionType } from '../emums/uploadFileCardActionType';

@Component({
  selector: 'bcc-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [UploadService],
})
export class UploadFileComponent
  extends UiPdfViewerComponent
  implements OnInit
{
  public UploadFileCardActionType = UploadFileCardActionType;
  public SkeletonsTypes = SkeletonsTypes;
  public AttachmentIconTypes = AttachmentIconTypes;
  public itemsAdded = 1;

  public lightBox: {
    open: boolean;
    src?: string;
  } = {
    open: false,
  };

  @ViewChild('uploader', { static: false })
  uploader;

  arrayOfValue: FileAttachmentInfo[] = [];
  hasReachedMaxCount = false;
  ngOnInit(): void {
    super.ngOnInit();
    console.log('hrees');
  }
  protected _setValue(value: any): void {
    console.log('inja');
    const arrayOfValue = Array.isArray(value) ? value : value ? [value] : [];
    for (let v of arrayOfValue) {
      v.url = getImagePath('ID', '', v.Id);
      v.icon = getIcon(v.Type);
    }
    this.arrayOfValue = arrayOfValue;
    this.checkMaxFilesCount(arrayOfValue.filter((c) => !c.IsDeleted));
    super._setValue(value);
  }

  private checkMaxFilesCount(value: any) {
    const setting = this.Setting;
    let maxFiles = 0;

    if (setting.IsSignleFile) {
      maxFiles = 1;
    } else {
      const maxFilesSetting = Number(setting.MaxFileCount);
      maxFiles = isNaN(maxFilesSetting) ? 0 : maxFilesSetting;
    }

    this.hasReachedMaxCount =
      maxFiles === 0 ? false : this.arrayOfValue.length >= maxFiles;
  }

  openLightBox(url: string) {
    this.lightBox.open = true;
    this.lightBox.src = url;
  }

  onDeleteFile(id: string) {
    this.context.fireEvent('CommandRequest', this, 'Delete', id);
  }

  onDownloadFile(id: string) {
    this.context.fireEvent('CommandRequest', this, 'Download', id);
  }

  protected _updateValue(value: any[]): void {
    const arrayOfValue = Array.isArray(value) ? value : value ? [value] : [];
    for (let v of arrayOfValue) {
      v.url = getImagePath('ID', '', v.Id);
      v.icon = getIcon(v.Type);
      v.IsDeleted = false;
    }
    this.arrayOfValue = arrayOfValue;
    console.log(this.arrayOfValue);
  }

  clickAction(event: {
    id?: string;
    url?: string;
    type: UploadFileCardActionType;
  }) {
    switch (event.type) {
      case this.UploadFileCardActionType.UPLOAD:
        this.uploader.open();
        break;

      case this.UploadFileCardActionType.SAVE:
        this.onDownloadFile(event.id as string);
        break;

      case this.UploadFileCardActionType.DELETE:
        this.onDeleteFile(event.id as string);
        break;

      case this.UploadFileCardActionType.ZOOM:
        console.log('here');
        this.openLightBox(event.url as string);
        break;
    }
  }
}
