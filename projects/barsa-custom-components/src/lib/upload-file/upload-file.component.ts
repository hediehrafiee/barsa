import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {
  FileAttachmentInfo,
  getIcon,
  getImagePath,
  UploadService,
} from 'barsa-novin-ray-core';
import { UiPdfViewerComponent } from 'barsa-sap-ui';
import { SkeletonsTypes } from '../emums/sketonsTypes';

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
  public SkeletonsTypes = SkeletonsTypes;
  public itemsAdded = 1;

  public lightBox: {
    open: boolean;
    src?: string;
  } = {
    open: false,
  };

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  arrayOfValue: FileAttachmentInfo[] = [];
  hasReachedMaxCount = false;
  ngOnInit(): void {
    super.ngOnInit();
  }
  protected _setValue(value: any): void {
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
}
