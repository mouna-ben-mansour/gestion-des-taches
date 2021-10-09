import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import ApexCharts = require('apexcharts');




@Component({
  selector: 'app-dashbord',
  templateUrl: '../views/dashbord.html',
  styleUrls: ['../app.component.css'],
  providers: [UserService, TaskService]
  
})


export class DashbordComponent implements OnInit {
  public identity;
  public token;

  constructor(private _route	: ActivatedRoute,
		private _router	: Router,
		private _userService: UserService,
		private _taskService: TaskService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
   }

  ngOnInit() {
    this._taskService.typeTask().subscribe(
      response => {
        var options = {
          series: [response.new, response.todo, response.finished],
          chart: {
          type: 'donut',
        },
        labels: ["New Tasks", "Todo Tasks", "Finished Tasks"],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        var options1 = {
          series: [response.new],
          chart: {
          type: 'area',
          height: 100,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3,
        },
        yaxis: {
          min: 0
        },
        title: {
          text: response.new,
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'New Taks',
          offsetX: 0,
          style: {
            fontSize: '14px',
          }
        }
        };

        var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
        chart1.render();
      
        var options2 = {
          series: [response.todo],
          chart: {
          type: 'area',
          height: 100,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3,
        },
        yaxis: {
          min: 0
        },
        colors: ['#DCE6EC'],
        title: {
          text: response.todo,
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'Todo Tasks',
          offsetX: 0,
          style: {
            fontSize: '14px',
          }
        }
        };

        var chartSpark2 = new ApexCharts(document.querySelector("#chart2"), options2);
        chartSpark2.render();
        
      
        var optionsSpark3 = {
          series: [response.finished],
          chart: {
          type: 'area',
          height: 100,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3
        },
        xaxis: {
          crosshairs: {
            width: 1
          },
        },
        yaxis: {
          min: 0
        },
        title: {
          text: response.finished,
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'Finished Tasks',
          offsetX: 0,
          style: {
            fontSize: '14px',
          }
        }
        };

        var chartSpark3 = new ApexCharts(document.querySelector("#chart3"), optionsSpark3);
        chartSpark3.render();
        
      });
      
    }
  

}
