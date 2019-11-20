import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() activeClass = 'active';

  constructor( public authService: AuthService) { }

  ngOnInit() {
  }

}
