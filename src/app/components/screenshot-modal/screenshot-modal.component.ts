import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import screenshot from 'src/app/models/screenshot';
import { igGame } from '../../models/igGame';

@Component({
  selector: 'app-screenshot-modal',
  templateUrl: './screenshot-modal.component.html',
  styleUrls: ['./screenshot-modal.component.css']
})
export class ScreenshotModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {screenshot: any}) { }

  screenshotReplace(screenshot: screenshot) {
    if (screenshot.url != null) {
      return this.data.screenshot.url.replace('t_thumb', 't_screenshot_big');
    } else {
      return '';
    }
  }
  ngOnInit(): void {
  }

}
