import { Injectable, ViewChild } from '@angular/core';
import { SmartTableData } from '../data/smart-table';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { type } from 'os';
import { ServerDataSource } from 'ng2-smart-table';
import { tap, catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
@Injectable()
export class SmartTableService extends SmartTableData {



  title = 'Angular Example';
  public products: any = [];
  listSearch: any;
	clientHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json; utf-8'});



  url = `http://www.gostore.tn/db.php`;

  constructor(private http: HttpClient) {
    super();

  }
  getData1() {
    var test = this.http.get(this.url);
    console.log(test);
    return test;
  } 

  


  getData() {
    const items = [];
    this.http.get('http://www.gostore.tn/db.php').toPromise().then(data => {
      console.log(data);
      for (let key in data)
        if (data.hasOwnProperty(key))
          items.push(data[key]);

    });

    console.log("the valued " + items);
    
    return items;
  }

}

