import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-basicgraph',
  templateUrl: './basicgraph.component.html',
  styleUrls: ['./basicgraph.component.scss']
})


export class BasicgraphComponent implements OnInit{

  @ViewChild('chart2') private chartRef!: ElementRef;
  private chart!: Chart;

  

  constructor(private service: GenericService,

  ) { }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['CO2', 'CO2', 'CO2', 'CO2', 'CO2', 'CO2', 'co2'],
        datasets: [{
          label: 'Nirt',
          data: [12, 19, 3, 5, 2, 3, 7],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Home Office',
          data: [5, 7, 10, 8, 3, 9, 6],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        animation: {
          duration: 2000,
          easing: "easeInOutQuart"
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


  }
}



