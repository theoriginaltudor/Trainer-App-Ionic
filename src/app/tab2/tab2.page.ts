import { Component } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  id: string;
  entry = {};

  constructor(private data: DataProviderService, private auth: AuthService) { }

  ionViewDidEnter(): void {
    const clientId = this.auth.user.name;
    this.data.getClient(clientId).subscribe((response) => {
      this.id = response.data[0]._id;
    })
  }

  submitEntry(): void {
    const date = (new Date()).toISOString();
    this.entry = { ...this.entry, date: date };
    this.data.createMeasurement(this.id, this.entry).subscribe((response) => {
      console.log(response);
    })
  }
}
