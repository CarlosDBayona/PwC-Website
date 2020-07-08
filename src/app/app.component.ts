import { AuthService } from './Services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stautsSideNav = false;
  title = 'prueba-pwc';
  constructor(public auth: AuthService){}
  open(event){
    this.stautsSideNav = !this.stautsSideNav;
  }
}
