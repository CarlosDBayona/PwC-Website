import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-responsive',
  templateUrl: './header-responsive.component.html',
  styleUrls: ['./header-responsive.component.scss']
})
export class HeaderResponsiveComponent implements OnInit {

  @Output() 
  comand = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  open(){
    this.comand.emit(true);
  }
}
