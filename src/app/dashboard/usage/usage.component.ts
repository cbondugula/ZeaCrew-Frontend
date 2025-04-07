import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-usage',
  standalone: false,
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss'],
})
export class UsageComponent {
  title = 'ng-chart';
  lineChart: any = [];
  steppedChart: any = [];
  pieChart: any = [];

  constructor() {}

  ngOnInit() {
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: [
          '01 Nov 2024',
          '03 Nov 2024',
          '05 Nov 2024',
          '07 Nov 2024',
          '09 Nov 2024',
          '11 Nov 2024',
          '13 Nov 2024',
          '15 Nov 2024',
          '17 Nov 2024',
        ],
        datasets: [
          {
            label: 'Created',
            data: [null, null, null, 0, 2, 5, 6.5, 8],
            borderColor: 'red',
            borderWidth: 2,
            pointRadius: 2,
          },
          {
            label: 'Deploys',
            data: [null, null, null, 0, 1, 3, 5, 7],
            borderColor: 'cyan',
            borderWidth: 2,
            pointRadius: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            offset: true,
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 2,
            },
            title: {
              display: true,
              text: 'Creations',
              color: 'red',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        },
      },
    });

    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Red', 'White'],
        datasets: [
          {
            data: [60, 40],
            backgroundColor: ['red', 'white'],
            borderColor: ['black', 'black'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        layout: {
          padding: 0,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    this.steppedChart = new Chart('steppedChart', {
      type: 'line',
      data: {
        labels: [
          '',
          '05 Nov 2024',
          '09 Nov 2024',
          '13 Nov 2024',
          '17 Nov 2024',
          '21 Nov 2024',
          '26 Nov 2024',
        ],
        datasets: [
          {
            label: 'Cumulative Count',
            data: [0, 0, 0, 1, 2, 2],
            borderColor: 'red',
            backgroundColor: 'red',
            borderWidth: 2,
            stepped: true,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 3,
            title: {
              display: true,
              text: 'Cumulative Count',
              color: 'black',
              font: { size: 14, weight: 'bold' },
            },
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
