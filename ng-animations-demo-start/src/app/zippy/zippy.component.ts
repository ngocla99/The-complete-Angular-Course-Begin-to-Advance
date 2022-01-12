import { Component, Input, OnInit } from '@angular/core';
import { expandCollapse } from './zippy.component.animation';

@Component({
  selector: 'app-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css'],
  animations: [expandCollapse],
})
export class ZippyComponent implements OnInit {
  @Input('title') title!: string;
  isExpanded!: boolean;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
