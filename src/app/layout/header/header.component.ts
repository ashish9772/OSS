import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiservice: ApiService, private route: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  logout() {
    this.spinner.show();
    this.apiservice.logout('gswfmt/logout').subscribe(data => {
      localStorage.removeItem('token');
      localStorage.removeItem('EINVALUE');
      this.spinner.hide();
      this.route.navigate(['/login']);

    })
  }
}
