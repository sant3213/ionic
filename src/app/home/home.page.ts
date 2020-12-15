import { Component } from '@angular/core';
import { SiteI } from "../models/site.interface";
import { SiteService } from "../services/site.service";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sites: SiteI[];
  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.siteService.getSites().subscribe(res => {
      this.sites = res;
    });
  }


}
