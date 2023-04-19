//import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
//import Chart from 'chart.js/auto';
//import { getRelativePosition } from 'chart.js/helpers';

@Component({
  selector: 'app-basichart',
  templateUrl: './basichart.component.html',
  styleUrls: ['./basichart.component.scss']
})


export class BasichartComponent implements OnInit {

 // @ViewChild('myChart') myChart!: ElementRef;

//  chart: any;

  constructor(private service: GenericService){}

  ngOnInit(): void {

}

}


