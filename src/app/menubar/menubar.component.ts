import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// declare var openNav: any;

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    //this.router.navigate(['dashboard'])
    //new openNav();
  }

}
