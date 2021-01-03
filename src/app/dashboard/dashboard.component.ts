import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { BackendService } from '../services/backend.service';
import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexLegend,
    ApexOptions
  } from 'ng-apexcharts';
import { atom, Derivable } from '@politie/sherlock';
import { formattedError } from '@angular/compiler';

// export type ChartOptions = {
//     series: Derivable<ApexNonAxisChartSeries>;
//     chart: ApexChart;
//     legend: ApexLegend;
//     responsive: ApexResponsive[];
//     labels: any;
//   };
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private readonly app: AppService, private readonly backend: BackendService) {

     }

    user$ = this.backend.portalUser$;
    dataDump$ = this.user$.map(u => JSON.stringify(u, null, 2));
    series$ = this.user$.map(u => [
        (u.kring.contribution || 0) - (u.contribution_discount || 0),
        8,
        (u.payment * u.kring.saving_percentage / 100.0)
    ]);

    chartOptions: Partial<ApexOptions> = {

        chart: {
            type: 'donut',
            width: '100%',
            // height: 250,
        },
        legend: {
            show: true,
            position: 'right',
            fontSize: '12px',
            offsetY: 20,
            formatter: (v, opt) => {return v + ' ( €' + opt.w.globals.series[opt.seriesIndex] + ' )'; }
        },
        stroke: {
            show: false,
        },
        plotOptions: {
          pie: {
              donut: {
                  size: '80%',
                  labels: {
                      show: true,
                      value: {
                          fontSize: '22px',
                          offsetY: -3,
                      },
                      total: {
                          show: true,
                          showAlways: true,
                          label: 'Maandinleg',
                          fontSize: '12px',
                          color: '#aaa',
                          formatter: v =>  '€ ' + v.globals.series.reduce((a: number , c: number) => a + c, 0),
                      }
                  }
              }
          }
        },
        labels: [' Contributie', ' Bankkosten', ' Spaarbedrag'],
        colors: ['#107B9E', '#9F2041', '#DBD253'],
        dataLabels: {
            enabled: false,
        },
        theme: {
            mode: 'dark',
        },
        fill: {
            colors: ['#107B9E', '#9F2041', '#DBD253'],
        },
        responsive: [
            {
              breakpoint: 350,
              options: {
                chart: {
                  width: '100%',
                },
                legend: {
                  floating: true,
                  position: 'left',
                  height: 400,
                  offsetY: 200,
                  horizontalAlign: 'center',
                  containerMargin: {
                      top: 100,
                  }
                },
                plotOptions: {
                    customScale: 0.4,
                },
              }
            }
          ]
    };

    ngOnInit(): void {
        this.app.showFooter(true);
        // this.chartOptions.series?.react(p => console.log(p));
    }

}
