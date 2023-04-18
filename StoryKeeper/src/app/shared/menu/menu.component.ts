import { EventEmitter,Component, OnInit, Output, Input } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() currentPage: string = '';

  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter(); 
  @Output() selectedPage: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  menuSwitch(){
    this.selectedPage.emit(this.currentPage.length > 0);
  }

  close(){
    this.onCloseSidenav.emit(true);
  }

}
