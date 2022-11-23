import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bcc-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  public expanded: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
