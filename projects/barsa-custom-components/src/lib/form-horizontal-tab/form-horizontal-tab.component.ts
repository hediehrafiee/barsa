import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBaseComponent,
  FormPanelService,
  FormPropsBaseComponent,
  LayoutSetting,
} from 'barsa-novin-ray-core';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'bcc-form-horizontal-tab',
  templateUrl: './form-horizontal-tab.component.html',
  styleUrls: ['./form-horizontal-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [FormPanelService],
})
// extends FormBaseComponent
export class FormHorizontalTabComponent
  extends FormPropsBaseComponent
  implements OnInit
{
  // public layout$: Observable<LayoutSetting | null>;

  ngOnInit(): void {
    super.ngOnInit();
    // this.layout$ = this.layout94;
  }
}
