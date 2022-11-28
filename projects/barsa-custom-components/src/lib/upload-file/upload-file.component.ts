import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  BbbTranslatePipe,
  DateService,
  getIcon,
  getImagePath,
  NumeralPipe,
  PictureFieldSourcePipe,
  PortalService,
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

  ngOnInit(): void {
    super.ngOnInit();
  }
  protected _setValue(value: any): void {
    for (let v of value) {
      v.url = getImagePath('ID', '', v.Id);
      v.icon = getIcon(v.Type);
    }
    super._setValue(value);
  }

  openLightBox(url: string) {
    this.lightBox.open = true;
    this.lightBox.src = url;
  }
}
