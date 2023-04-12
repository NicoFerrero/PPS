import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { SpinnerService } from '../services/spinner.service';
import { CamaraService } from '../services/camara.service';
import { AuthService } from '../services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  /** GRAFICO BARRAS */
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = ['N° Votos fotos feas'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  /** GRAFICO TORTA*/
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  uid: string;
  datosFeas: any[];
  tipo: string;
  constructor(
    private spinnerService: SpinnerService,
    private camaraService: CamaraService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.tipo = 'feas';
    this.datosFeas = [];
    this.spinnerService.showSpinner().then(() => {
      this.uid = this.authService.user.uid;
      this.camaraService.traerFotos('fea').subscribe((imagenes: any) => {
        this.spinnerService.hideSpinner().then(() => {
          this.datosFeas = [];
          imagenes.forEach((imagen) => {
            const data = { data: [], label: '' };
            data.data.push(imagen.cantVotos);
            data.label = `${imagen.nombreCompleto}-${new Date(
              imagen.fecha.seconds * 1000,
            ).toLocaleDateString()} ${new Date(imagen.fecha.seconds * 1000).getHours()}:${new Date(
              imagen.fecha.seconds * 1000,
            ).getMinutes()}:${new Date(imagen.fecha.seconds * 1000).getSeconds()}`;
            this.datosFeas.push(data);
          });
          console.log(imagenes);
        });
      });
      this.camaraService.traerFotos('linda').subscribe((imagenes: any) => {
        this.spinnerService.hideSpinner().then(() => {
          this.pieChartLabels = [];
          this.pieChartData = [];
          imagenes.forEach((imagen) => {
            this.pieChartData.push(imagen.cantVotos);
            this.pieChartLabels.push(
              `${imagen.nombreCompleto}-${new Date(
                imagen.fecha.seconds * 1000,
              ).toLocaleDateString()} ${new Date(
                imagen.fecha.seconds * 1000,
              ).getHours()}:${new Date(imagen.fecha.seconds * 1000).getMinutes()}:${new Date(
                imagen.fecha.seconds * 1000,
              ).getSeconds()}`,
            );
          });
          /*this.datosFeas = [];
          imagenes.forEach((imagen) => {
            const data = { data: [], label: '' };
            data.data.push(imagen.cantVotos);
            data.label = `${imagen.nombreCompleto}-${new Date(
              imagen.fecha.seconds * 1000,
            ).toLocaleDateString()} ${new Date(imagen.fecha.seconds * 1000).getHours()}:${new Date(
              imagen.fecha.seconds * 1000,
            ).getMinutes()}:${new Date(imagen.fecha.seconds * 1000).getSeconds()}`;
            this.datosFeas.push(data);
          });
          console.log(imagenes);*/
        });
      });
    });
  }
  cerrarSesion() {
    this.authService.logOut();
  }

  elegirGrafico(e) {
    this.tipo = e.target.value;
  }
}
