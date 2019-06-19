import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-workout-preview',
  templateUrl: './workout-preview.component.html',
  styleUrls: ['./workout-preview.component.scss'],
})
export class WorkoutPreviewComponent {
  @Input('workout') workout: any;

  constructor(public popoverController: PopoverController, private router: Router) { }

  async popoverDismiss() {
    await this.popoverController.dismiss();
  }

  async startWorkout() {
    await this.popoverController.dismiss();

    this.router.navigate(['training', { ...this.workout }]);
  }
}
