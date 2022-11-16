import { Component, OnInit } from '@angular/core';
import { TimeColumnConfig } from '@fundamental-ngx/core/time/time-column/time-column-config';
import { FieldBaseComponent } from 'barsa-novin-ray-core';

export declare class SelectableViewItem<T> {
  value: T;
  label: string;
  index?: number;
}
type ViewItem = SelectableViewItem<number>;

@Component({
  selector: 'bcc-year-month-day',
  templateUrl: './year-month-day.component.html',
  styleUrls: ['./year-month-day.component.scss'],
})
export class YearMonthDayComponent
  extends FieldBaseComponent
  implements OnInit
{
  public isActive: boolean = true;
  public isOpen: boolean = false;

  public selectedYear: number = 0;
  public selectedMonth: number = 0;
  public selectedDay: number = 0;
  public selectedHours: number = 0;
  public selectedMinutes: number = 0;
  public submitYear: number = 0;
  public submitMonth: number = 0;
  public submitDay: number = 0;
  public submitHours: number = 0;
  public submitMinutes: number = 0;

  public showYear: boolean = true;
  public showMonth: boolean = true;
  public showDay: boolean = true;
  public showHour: boolean = true;
  public showMinute: boolean = true;

  public activeYearViewItem?: ViewItem;
  public activeMonthViewItem?: ViewItem;
  public activeDayViewItem?: ViewItem;
  public activeHoursViewItem?: ViewItem;
  public activeMinutesViewItem?: ViewItem;

  public yearsViewItems: ViewItem[] = [...Array(10).keys()].map((year) => {
    return { value: year, label: year.toString() };
  });
  public monthViewItems: ViewItem[] = [...Array(13).keys()].map((month) => {
    return { value: month, label: month.toString() };
  });
  public daysViewItems: ViewItem[] = [...Array(32).keys()].map((day) => {
    return { value: day, label: day.toString() };
  });

  public hoursViewItems: ViewItem[] = [...Array(12).keys()].map((day) => {
    return { value: day, label: day.toString() };
  });

  public minutesViewItems: ViewItem[] = [...Array(59).keys()].map((day) => {
    return { value: day, label: day.toString() };
  });

  public getYearConfig: TimeColumnConfig = {
    label: 'سال',
    decreaseLabel: '',
    increaseLabel: '',
    navigationInstruction: '',
  };
  public getMonthConfig: TimeColumnConfig = {
    label: 'ماه',
    decreaseLabel: '',
    increaseLabel: '',
    navigationInstruction: '',
  };
  public getDayConfig: TimeColumnConfig = {
    label: 'روز',
    decreaseLabel: '',
    increaseLabel: '',
    navigationInstruction: '',
  };

  public getHourConfig: TimeColumnConfig = {
    label: 'ساعت',
    decreaseLabel: '',
    increaseLabel: '',
    navigationInstruction: '',
  };

  public getMinuteConfig: TimeColumnConfig = {
    label: 'دقیقه',
    decreaseLabel: '',
    increaseLabel: '',
    navigationInstruction: '',
  };
  resultOfMS: { year: any; month: any; day: any; hour: any; minute: any };

  get yearMonthDay() {
    if (
      !this.submitYear &&
      !this.submitMonth &&
      !this.submitDay &&
      !this.submitHours &&
      !this.submitMinutes
    )
      return 'سال، روز، ماه، ساعت، دقیقه';

    return ` ${this.submitYear ? this.submitYear + 'سال' : ''} ${
      this.submitMonth ? this.submitMonth + 'ماه' : ''
    } ${this.submitDay ? this.submitDay + 'روز' : ''} ${
      this.submitHours ? this.submitHours + 'ساعت' : ''
    } ${this.submitMinutes ? this.submitMinutes + 'دقیقه' : ''}`;
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.parameters.MaxYear) {
      const max = Number(this.parameters.MaxYear);
      const min = Number(this.parameters.MinYear) || 0;
      const length = max - min + 1;
      this.yearsViewItems = Array.from({ length }, (_, i) => min + i * 1).map(
        (year) => {
          return { value: year, label: year.toString() };
        }
      );
    }

    this.showYear = this.parameters.Year;
    this.showMonth = this.parameters.Month;
    this.showDay = this.parameters.Day;

    this.valueToMilisecond(this.value);
  }

  public valueToMilisecond(value: string) {
    const splitedValue = value.split('.');
    if (splitedValue.length < 2 || !value) return;

    const hours = Number(splitedValue[0]);
    const minutes = Number(splitedValue[1]);
    const milMinutes = isNaN(minutes) ? 0 : minutes * 60000;
    const hoursMilisecond = isNaN(hours) ? 0 : hours * (60000 * 60);
    this.resultOfMS = this.ms(milMinutes + hoursMilisecond);

    this.submitYear = this.resultOfMS.year;
    this.submitMonth = this.resultOfMS.month;
    this.submitDay = this.resultOfMS.day;
    this.submitHours = this.resultOfMS.hour;
    this.submitMinutes = this.resultOfMS.minute;
  }

  onAdOnButtonClicked() {
    this.isOpen = !this.isOpen;
    this._setActiveItems();
  }
  private _resetActiveItems() {
    this.activeYearViewItem = undefined;
    this.activeMonthViewItem = undefined;
    this.activeDayViewItem = undefined;
    this.activeHoursViewItem = undefined;
    this.activeMinutesViewItem = undefined;
  }
  private _setActiveItems() {
    const yearIndex = this.yearsViewItems.findIndex(
      (c) => c.value === this.submitYear
    );
    const monthIndex = this.monthViewItems.findIndex(
      (c) => c.value === this.submitMonth
    );
    const dayIndex = this.daysViewItems.findIndex(
      (c) => c.value === this.submitDay
    );
    const hoursIndex = this.hoursViewItems.findIndex(
      (c) => c.value === this.submitHours
    );
    const minutesIndex = this.minutesViewItems.findIndex(
      (c) => c.value === this.submitMinutes
    );

    this.activeYearViewItem = this.yearsViewItems[yearIndex];
    this.activeMonthViewItem = this.monthViewItems[monthIndex];
    this.activeDayViewItem = this.daysViewItems[dayIndex];
    this.activeHoursViewItem = this.hoursViewItems[hoursIndex];
    this.activeMinutesViewItem = this.minutesViewItems[minutesIndex];
  }

  public savechangeTimes(): void {
    this.isOpen = false;

    const yearsHours: number = this.selectedYear * 360 * 24;
    const monthHours: number = this.selectedMonth * 30 * 24;
    const dayHours: number = this.selectedDay * 24;

    const hours = yearsHours + monthHours + dayHours + this.selectedHours;
    const minutes = this.selectedMinutes;

    console.log(
      `${String(hours).padStart(2, '0')}.${String(minutes).padStart(2, '0')}`
    );
    this.valueChange.emit(
      `${String(hours).padStart(2, '0')}.${String(minutes).padStart(2, '0')}`
    );

    this.submitYear = this.selectedYear;
    this.submitMonth = this.selectedMonth;
    this.submitDay = this.selectedDay;
    this.submitHours = this.selectedHours;
    this.submitMinutes = this.selectedMinutes;

    this._setActiveItems();
  }

  public cancel() {
    this.isOpen = false;

    this.selectedYear = this.submitYear;
    this.selectedMonth = this.submitMonth;
    this.selectedDay = this.submitDay;
    this.selectedHours = this.submitHours;
    this.selectedMinutes = this.submitMinutes;
    this._resetActiveItems();
  }

  private ms(t) {
    let year, month, day, hour, minute, second;

    second = Math.floor(t / 1000);
    minute = Math.floor(second / 60);
    second = second % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    month = Math.floor(day / 30);
    day = day % 30;
    year = Math.floor(month / 12);
    month = month % 12;

    return { year, month, day, hour, minute };
  }
}
