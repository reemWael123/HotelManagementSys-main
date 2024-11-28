import { Component, Input } from '@angular/core';
import { Chart } from '../../interfaces/chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() chartData: Chart;

  dataDt: any;
  dataPie: any;

  optionsDt: any;
  optionsPie: any;

  ngOnInit() {
    this.dtChart();
    this.pieChart();
  }

  dtChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataDt = {
      labels: ['Completed', 'Pending'],
      datasets: [
        {
          data: [
            this.chartData.data.bookings.completed,
            this.chartData.data.bookings.pending,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-400'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.optionsDt = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        title: {
          display: true,
          text: 'Booking Status',
          color: textColor,
          font: {
            size: 18,
          },
          align: 'center',
          position: 'bottom',
        },
      },
    };
  }

  pieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataPie = {
      labels: ['Admin', 'User'],
      datasets: [
        {
          data: [
            this.chartData.data.users.admin,
            this.chartData.data.users.user,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-400'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.optionsPie = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
        title: {
          display: true,
          text: 'User Roles',
          color: textColor,
          font: {
            size: 18,
          },
          align: 'center',
          position: 'bottom',
        },
      },
    };
  }
}
