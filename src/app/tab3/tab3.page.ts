import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  id: string;
  entry = {};

  constructor(private data: DataProviderService, private auth: AuthService, private router: Router) { }

  ionViewDidEnter(): void {
    const clientId = this.auth.user.name;
    this.data.getClient(clientId).subscribe((response) => {
      this.id = response.data[0]._id;
    })
  }

  submitEntry(): void {
    const date = (new Date()).toISOString();
    this.entry = { ...this.entry, date: date };
    this.data.createDiet(this.id, this.entry).subscribe((response) => {
      console.log(response);
    })
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
