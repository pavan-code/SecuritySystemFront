import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-media-home',
  templateUrl: './media-home.component.html',
  styleUrls: ['./media-home.component.scss']
})
export class MediaHomeComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    localStorage.setItem('bankopen', 'false')
  }

}
