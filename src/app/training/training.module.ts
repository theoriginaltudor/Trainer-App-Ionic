import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrainingPage } from './training.page';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TrainingPage, ExerciseListComponent],
  entryComponents: [ExerciseListComponent]
})
export class TrainingPageModule { }
