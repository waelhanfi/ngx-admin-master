import { Component, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ServerDataSource } from 'ng2-smart-table';
import { SmartTableService } from '.././../../@core/mock/smart-table.service';
import saveas from 'file-saver';
import { SmartTableData } from '../../../@core/data/smart-table';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})

export class SmartTableComponent {
  num = 0;
  settings = {
    actions: false,

    pager: {
      display: false,

    },

    columns: {

      index: {
        title: 'Number',
        type: 'text',
        valuePrepareFunction: (value, row, cell) => {
          localStorage.setItem("1", cell.row.index+1);

          console.log(cell.row.data)
          return cell.row.index + 1;
        }

      },

      Date: {
        title: 'DateTime',

      },
      shortcode: {
        title: 'AccessNumber'
      },
      num: {
        title: 'CgPN'
      },
      Value1: {
        title: 'CallID'

      },
      Value2: {
        title: 'CurrentState',
        type: 'string'
      },
      Value3: {
        title: 'NextState '
      },

      Value4: {
        title: 'Event '
      },

      Value5: {
        title: 'ServiceVersion '
      },

      Value6: {
        title: 'CurrentStateType '
      },

      Value7: {
        title: 'Status '
      },

      Value8: {
        title: 'Action '
      },

      Value9: {
        title: 'DurationInStateSec '
      },

      Value10: {
        title: 'ServiceID '
      },

      Value11: {
        title: 'ServiceName '
      },

      Value12: {
        title: 'RegionID '
      },

      Value13: {
        title: 'CustomerID '
      },

      Value14: {
        title: 'ExternalCustomerID '
      },

      Value15: {
        title: 'AdditionalEventInfoMap '
      },

      Value16: {
        title: 'RegionName '
      },
      Value17: {
        title: 'CustomerName '
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private service: SmartTableService, private httpClient: HttpClient) {

    var items: typereport[];

    this.service.getData1().subscribe(

      (data: any[]) => {

        console.log("News Success");
        console.log(data);

        this.source.load(data);

      },
      error => {
        alert("ERROR");
      }
    );
    console.log(items);
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  @ViewChild('TABLE') table: ElementRef;
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }


  ExportTOExcel() {
    var blob = new Blob([document.getElementById("exportable").innerText], {
      type: "application/json;charset=utf-8"
    });
    console.log([document.getElementById("exportable").innerText].length);
    var fileName = 'your_file_name.csv';
    saveas(blob, fileName);
    // const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [localStorage.getItem("1"), '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.chart.chart.data.datasets[0].data = [55, 355, 35, 50, 50, 60, 10]
      this.chart.chart.update()
  }, 2000);
  }
}

export interface typereport {
  Date: string;
  shortcode: number;
  num: number;
  Value1: string;
  Value2: string;
  Value3: string;
  Value4: string;
  Value5: number;
  Value6: string;
  Value7: string;
  Value8: string;
  Value9: number;
  Value10: number;
  Value11: string;
  Value12: string;
  Value13: number;
  Value14: string;
  Value15: string;
  Value16: string;
  Value17: string;
}

