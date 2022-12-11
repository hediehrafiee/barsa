import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  BbbTranslatePipe,
  DateService,
  FileAttachmentInfo,
  getIcon,
  getImagePath,
  NumeralPipe,
  PictureFieldSourcePipe,
  PortalService,
  UploadService,
} from 'barsa-novin-ray-core';
import { UiPdfViewerComponent } from 'barsa-sap-ui';
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

  public itemsAdded = 1;

  public lightBox: {
    open: boolean;
    src?: string;
  } = {
    open: false,
  };

  @ViewChild('uploader', { static: false })
  uploader;

  private selectedCardIndex: number = -1;
  public filesMaped;
  public requiredCount: number = 0;
  public calcuteRequiredCount: number = 0;

  ngOnInit(): void {
    super.ngOnInit();
    this.filesMaped = this.context.Setting.CustomUi.Parameters.Files.MoDataList;
    this.requiredCount = this.filesMaped.filter(
      (file) => file.IsRequire === true
    ).length;

    this._updateValue(this.value);
  }

  openLightBox(url: string) {
    this.lightBox.open = true;
    this.lightBox.src = url;
  }

  onDeleteFile(id: string, index) {
    setTimeout(() => {
      this.filesMaped[index].items.IsDeleted = true;
      this._cdr.detectChanges();
    }, 1);
    if (this.filesMaped[index].IsRequire) {
      if (this.calcuteRequiredCount > 0) this.calcuteRequiredCount--;
      this._checkSetValueOrClear();
    }
  }

  onDownloadFile(id: string) {
    this.context.fireEvent('CommandRequest', this, 'Download', id);
  }

  protected _updateValue(value: any[]): void {
    const arrayOfValue = Array.isArray(value) ? value : value ? [value] : [];
    for (let i = 0; i < arrayOfValue.length; i++) {
      arrayOfValue[i].url = getImagePath('ID', '', arrayOfValue[i].FileId);
      arrayOfValue[i].icon = getIcon(arrayOfValue[i].FileName.split('.')[1]);
      arrayOfValue[i].IsDeleted = false;

      if (this.selectedCardIndex === -1 && this.filesMaped[i])
        this.filesMaped[i].items = arrayOfValue[i];
    }
    if (this.selectedCardIndex !== -1) {
      this.filesMaped[this.selectedCardIndex].items = {
        index: this.selectedCardIndex,
        ...arrayOfValue[0],
      };
    }

    if (this.filesMaped[this.selectedCardIndex]?.IsRequire) {
      this.calcuteRequiredCount++;
      this._checkSetValueOrClear();
    }

    this._cdr.detectChanges();
  }

  _checkSetValueOrClear() {
    if (this.calcuteRequiredCount === this.requiredCount) {
      const files = this.filesMaped.map((item) => item.items);
      this.fireContextEvent('Change', this.context, files);
    } else {
      this.context.fireEvent('CommandRequest', this, 'Clear');
    }
  }

  clickAction(
    event: {
      id?: string;
      url?: string;
      type: UploadFileCardActionType;
    },
    index?
  ) {
    switch (event.type) {
      case this.UploadFileCardActionType.UPLOAD:
        this.selectedCardIndex = index;
        this.uploader.open();
        break;

      case this.UploadFileCardActionType.SAVE:
        this.onDownloadFile(event.id as string);
        break;

      case this.UploadFileCardActionType.DELETE:
        this.onDeleteFile(event.id as string, index);
        break;

      case this.UploadFileCardActionType.ZOOM:
        this.openLightBox(event.url as string);
        break;
    }
  }
}
