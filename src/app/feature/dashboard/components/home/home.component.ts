import { Component } from '@angular/core';
import { Chart } from '../../interfaces/chart';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  chartData: Chart;

  constructor(private chart: ChartService) {}

  ngOnInit() {
    this.getChartData();
  }

  getChartData() {
    this.chart.getChartData().subscribe({
      next: (res) => {
        this.chartData = res;
      },
    });
  }
}
