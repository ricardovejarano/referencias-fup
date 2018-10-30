import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  flag = true;
  // Array para gráfica
  arrayProgramas = [];
  arrayContadorProgramas = [];

  // public barChartData: any[];
  public barChartLabels: string[] = [];

  public barChartData: any[] = [];

  public data = [];


  public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#4665BD	',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public barChartType = 'bar';
  public barChartLegend = true;



  constructor(public profileService: PerfilService) { }

  ngOnInit() {
    this.getValueConunterProgram();
  }

  getValueConunterProgram() {
    if (localStorage.getItem('logged') === 'true') {
      console.log('ÉNTRA!!!');
      this.profileService.getContadorProgramas()
        .snapshotChanges().subscribe(item => {
          this.arrayProgramas = [];
          this.arrayContadorProgramas = [];
          item.forEach(element => {
            const x = element.payload.toJSON();
            this.arrayProgramas.push(element.key);
            this.arrayContadorProgramas.push(x['contadorActualizado']);
          });
          console.log(this.arrayContadorProgramas, this.arrayProgramas);
          this.flag = false;
          setTimeout(() => {
            this.barChartData = this.barChartDataFunct();
            // this.barChartData = this.barChartDataFunct();
            // this.barChartData = [
            // { data: [5, 59, 80], label: 'Series A' }
            //  ];
            this.barChartLabels = this.barChartLabelsFunct();
            console.log(this.barChartData);
            this.flag = true;
          }, 500);
        });
    }
  }

  barChartDataFunct(): any {
    return [
      { data: this.arrayContadorProgramas, label: 'Uso por programa' }
    ];
  }

  barChartLabelsFunct(): any {
    return this.arrayProgramas;
  }
}
