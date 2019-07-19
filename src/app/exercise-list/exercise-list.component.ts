import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent {
  @Input('exerciseIdList') exerciseIdList: any;
  exercisesList: any[];

  constructor(public popoverController: PopoverController, private data: DataProviderService) { }

  ionViewDidEnter(): void {
    this.data.getExercisesList().subscribe((response) => {
      this.exercisesList = response.data;
    })
  }

  async popoverDismiss() {
    await this.popoverController.dismiss();
  }

  async addExercises() {
    await this.popoverController.dismiss(this.exerciseIdList);
  }

  select(id) {
    this.exerciseIdList.push(id);
  }
}
