import { Component, OnInit } from '@angular/core';
import { SiteI } from "../../models/site.interface";
import { SiteService } from "../../services/site.service";
import { ActivatedRoute } from "@angular/router";
import { NavController, LoadingController } from "@ionic/angular";
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.page.html',
  styleUrls: ['./site-details.page.scss'],
})
export class SiteDetailsPage implements OnInit {

  site: SiteI = {
    photoURL: "",
    name: "",
    description: "",
    quali: "",
  };
  siteId = null;
  constructor(private route: ActivatedRoute, private nav: NavController,
    private siteService: SiteService, private loadingController:
      LoadingController, private storage: AngularFireStorage) { }
  ngOnInit() {
    this.siteId = this.route.snapshot.params["id"];
    if (this.siteId) {
      this.loadSite();
    }
  }
  async loadSite() {
    const loading = await this.loadingController.create({
      message: "Loading..."
    });
    await loading.present();
    this.siteService.getSite(this.siteId).subscribe(res => {
      loading.dismiss();
      this.site = res;
    });
  }
  async saveSite() {
    const loading = await this.loadingController.create({
      message: "Saving..."
    });
    await loading.present();
    if (this.siteId) {
      this.siteService.updateSite(this.site, this.siteId).then(() => {
        loading.dismiss();
        this.nav.navigateForward("/");
      })
    } else {
      this.siteService.addSite(this.site).then(() => {
        loading.dismiss();
        this.nav.navigateForward("/");
      })
    }
    console.log(this.site.photoURL);
  }
  onRemove(idSite: string) {
    if (idSite) {
      this.siteService.deleteSite(idSite);
    } else {
      this.nav.navigateForward("/");
    }
  }
  async onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = await this.storage.ref(filePath);
    const task = await this.storage.upload(filePath, file);
    ref.getDownloadURL().subscribe((data) => {
      this.site.photoURL = data;
    })
  }


}
