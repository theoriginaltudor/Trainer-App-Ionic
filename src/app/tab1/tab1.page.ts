import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  id: string;
  list: any[];

  constructor(private data: DataProviderService, private auth: AuthService) { }

  ngOnInit(): void {

  }

  ionViewDidEnter(): void {
    const clientId = this.auth.user.name;
    this.data.getClient(clientId).subscribe((response) => {
      this.id = response.data[0]._id;
      this.populateList(this.id);
    })
  }

  populateList(id): void {
    this.data.getWorkoutsList(id).subscribe((response) => {
      this.list = response.data;
    })
  }
}
