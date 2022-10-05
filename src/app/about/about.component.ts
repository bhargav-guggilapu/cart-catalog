import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @ViewChild('slider') slider: ElementRef;
  previousBtn: HTMLSpanElement;
  clicked = true;

  constructor() {}

  ngOnInit(): void {}

  onClick(btn: HTMLSpanElement, count: number) {

    this.clicked = false;

    if (this.previousBtn) {
      this.previousBtn.classList.remove('active');
    }

    btn.classList.add('active');

    this.previousBtn = btn;
    const translate = 25 * count;
    this.slider.nativeElement.style.transform = `translateX(-${translate}%)`;
  }
}
