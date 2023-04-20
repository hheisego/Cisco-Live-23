import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  task: boolean = false;

  constructor(

  ) { }

  ngOnInit(): void {
  }

  mission(){

    this.task = true;
  }

}
