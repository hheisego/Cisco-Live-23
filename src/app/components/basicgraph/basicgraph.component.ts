import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-basicgraph',
  templateUrl: './basicgraph.component.html',
  styleUrls: ['./basicgraph.component.scss']
})


export class BasicgraphComponent {

  @ViewChild('chart2') private chartRef!: ElementRef;
  private chart!: Chart;

  reportsResponse: any;

  constructor(private service: GenericService) { }

  ngAfterViewInit(): void {
    this.service.getReport().subscribe(res => {
      this.reportsResponse = res;
      console.log(this.reportsResponse)
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Co2', 'Humidity', 'Pressure', 'Temperature'],
          datasets: [{
            label: 'GrowFlux',
            data: [this.reportsResponse.CO2, this.reportsResponse.humidity, this.reportsResponse.pressure, this.reportsResponse.temperature,],
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
            borderWidth: 2
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
    }); // Added closing parenthesis
  }
}