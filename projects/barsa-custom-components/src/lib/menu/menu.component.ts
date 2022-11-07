import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutSetting } from 'barsa-novin-ray-core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() tabChanged = new EventEmitter<number>();
  @Input() tabs: any;

  ngOnInit(): void {
    console.log('tabs', this.tabs);
  }
  public onTabChanged(id: number) {
    this.tabChanged.emit(id);
  }
}
