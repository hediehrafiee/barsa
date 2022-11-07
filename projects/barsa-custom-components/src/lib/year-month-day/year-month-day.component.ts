import { Component, OnInit, Optional } from '@angular/core';
import { TimeColumnConfig } from '@fundamental-ngx/core/time/time-column/time-column-config';
import { UiMoInfoSubFormUiComponent } from 'barsa-sap-ui';

export declare class SelectableViewItem<T> {
  value: T;
  label: string;
  index?: number;
}
type HourViewItem = SelectableViewItem<number>;

@Component({
  selector: 'bcc-year-month-day',
  templateUrl: './year-month-day.component.html',
  styleUrls: ['./year-month-day.component.scss'],
})
export class YearMonthDayComponent
  extends UiMoInfoSubFormUiComponent
  implements OnInit
{
  year: number = 5;
  month: number = 2;
  day: number = 1;
  yearsViewItems: HourViewItem[] = [...Array(10).keys()].map((year) => {
    return { value: year, label: year.toString() };
  });
  monthViewItems: HourViewItem[] = [...Array(13).keys()].map((year) => {
    return { value: year, label: year.toString() };
  });
  daysViewItems: HourViewItem[] = [...Array(32).keys()].map((year) => {
    return { value: year, label: year.toString() };
  });
  selectedValue1: string;

  spinnerButtons = true;

  isActive = true;
  // offset = 0;

  activeHourViewItem: HourViewItem;

  getYearConfig: TimeColumnConfig = {
    label: 'سال',
    decreaseLabel: 's',
    increaseLabel: 'v',
    navigationInstruction: 'ss',
  };

  getMonthConfig: TimeColumnConfig = {
    label: 'ماه',
    decreaseLabel: 's',
    increaseLabel: 'v',
    navigationInstruction: 'ss',
  };

  buttonFocusable = true;

  getDayConfig: TimeColumnConfig = {
    label: 'روز',
    decreaseLabel: 's',
    increaseLabel: 'v',
    navigationInstruction: 'ss',
  };

  isOpen = false;

  get yearMonthDay() {
    return ` ${this.year || ''} سال و ${this.month || ''} ماه و ${
      this.day || ''
    } روز`;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.activeHourViewItem = this.yearsViewItems[0];
  }

  handleMeridianChange(event): void {
    console.log(event);
  }

  choose(): void {
    this.isOpen = !this.isOpen;
  }

  isOpenChange(e) {
    console.log;
  }

  _onOpenStateChanged(e) {
    console.log('_onOpenStateChanged');
  }
  _addOnButtonClicked() {
    console.log('_addOnButtonClicked');
    this.isOpen = !this.isOpen;
  }
  _timeInputChanged(e) {
    console.log('_timeInputChanged', e);
  }

  changeTimes(): void {
    this.isOpen = false;
    let day = this.customFormPanelUi._dictFieldUi.Day;
    day.setValue(this.day);
    day.fireEvent('change', this.day);

    let month = this.customFormPanelUi._dictFieldUi.Month;
    month.setValue(this.day);
    month.fireEvent('change', this.month);

    let year = this.customFormPanelUi._dictFieldUi.Year;
    year.setValue(this.year);
    year.fireEvent('change', this.year);
  }
}
