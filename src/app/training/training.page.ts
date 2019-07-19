import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProviderService } from '../services/data-provider.service';
import { PopoverController } from '@ionic/angular';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  exerciseIdList: string[] = [];
  exerciseNameList: string[] = [];
  clientId: string;
  name: string;
  recomendationsList: string[] = [];
  _id: string;
  historyList: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, public popoverController: PopoverController, private data: DataProviderService) { }

  ngOnInit() {
    this.fetchRouteData();
  }

  fetchRouteData() {
    this._id = this.route.snapshot.paramMap.get('_id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.clientId = this.route.snapshot.paramMap.get('clientId');
    if (this.route.snapshot.paramMap.get('_id')) {
      this.exerciseIdList = this.route.snapshot.paramMap.get('exerciseList').split(',');
      this.recomendationsList = this.route.snapshot.paramMap.get('recomendationsList').split(',');
      this.getExerciseNames(this.route.snapshot.paramMap.get('exerciseList').split(','));
    }
  }

  getExerciseNames(exerciseIdList) {
    this.exerciseNameList = [];
    this.historyList = [];
    exerciseIdList.map((id) => {
      this.data.getExercise(id).subscribe((response) => {
        this.exerciseNameList.push(response.data.name);
        this.historyList.push(['']);
      })
    })
  }

  cancelWorkout() {
    this.router.navigateByUrl('/view');
  }

  finishWorkout() {
    if (this.name === "New workout") {
      const workout = {
        name: this.name,
        exerciseList: this.exerciseIdList,
        recommendationsList: this.recomendationsList,
        clientId: this.clientId
      }

      this.data.addNewWorkout(workout).subscribe((response) => {
        this._id = response.data._id;
        this.createWorkoutHistory();
      })
    } else {
      this.createWorkoutHistory();
    }

    this.router.navigateByUrl('/view');
  }

  async addExercise() {
    const popover = await this.popoverController.create({
      component: ExerciseListComponent,
      translucent: true,
      componentProps: { "exerciseIdList": this.exerciseIdList }
    });
    popover.onDidDismiss().then(value => {
      this.exerciseIdList = value.data
      this.getExerciseNames(this.exerciseIdList);
    });
    return await popover.present();
  }

  addSet(i) {
    this.historyList[i].push('');
  }

  removeSet(i, j) {
    this.historyList[i].splice(j, 1);
  }

  createWorkoutHistory() {
    const date = (new Date()).toISOString();
    console.log("history list ", this.historyList);
    this.historyList.map((history, index) => {
      // console.log("history ", history);
      history.map((set) => {
        // console.log("set ", set);
        const setData = set.split('x');
        // console.log("set data ", setData)
        const body = {
          kg: setData[0],
          repetitions: setData[1],
          repetitionsInReserve: 2,
          date: date
        }
        // console.log(body);
        this.data.createHistoryEntry(body, this.clientId, this._id, this.exerciseIdList[index]).subscribe((response) => {
          console.log(response.msg);
          console.log(response.success);
        });
      })
    })
  }
}
