import { Component } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';
import { AuthService } from '../services/auth.service';
import { PopoverController } from '@ionic/angular';
import { WorkoutPreviewComponent } from '../workout-preview/workout-preview.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  id: string;
  workoutList: any[];

  constructor(private data: DataProviderService, private auth: AuthService, public popoverController: PopoverController, private router: Router) { }

  ionViewDidEnter(): void {
    const clientEmail = this.auth.user.name;
    this.data.getClient(clientEmail).subscribe((response) => {
      this.id = response.data[0]._id;
      this.populateList(this.id);
    })
  }

  populateList(id): void {
    this.data.getWorkoutsList(id).subscribe((response) => {
      this.workoutList = response.data;
    })
  }

  async presentPopover(workout) {
    const popover = await this.popoverController.create({
      component: WorkoutPreviewComponent,
      translucent: true,
      componentProps: { "workout": workout }
    });
    return await popover.present();
  }

  startNewWorkout() {
    this.router.navigate(['training', {
      name: "New workout",
      clientId: this.id
    }]);
  }
}
