import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  exerciseIdList: string[];
  exerciseNameList: string[] = [];
  clientId: string;
  name: string;
  recomendationsList: string[];
  _id: string;
  historyList: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private data: DataProviderService) { }

  ngOnInit() {
    this.fetchRouteData();
  }

  fetchRouteData() {
    this.exerciseIdList = this.route.snapshot.paramMap.get('exerciseList').split(',');
    this.recomendationsList = this.route.snapshot.paramMap.get('recomendationsList').split(',');
    this._id = this.route.snapshot.paramMap.get('_id');
    this.name = this.route.snapshot.paramMap.get('name');
    this.clientId = this.route.snapshot.paramMap.get('clientId');
    this.getExerciseNames(this.route.snapshot.paramMap.get('exerciseList').split(','));
  }

  getExerciseNames(exerciseIdList) {
    exerciseIdList.map((id) => {
      this.data.getExercise(id).subscribe((response) => {
        console.log(response);
        this.exerciseNameList.push(response.data.name);
        this.historyList.push('');
      })
    })
  }

  cancelWorkout() {
    this.router.navigateByUrl('/view');
  }

  finishWorkout() {
    const regex = /x/g;
    const date = (new Date()).toISOString();
    this.historyList.map((history, index) => {
      const list = history.match(regex);
      if (list.length == 1) {
        const [kg, reps] = history.split('x');
        const repsList = reps.split(',');
        repsList.map((rep) => {
          const body = {
            kg: kg,
            repetitions: rep,
            repetitionsInReserve: 2,
            date: date
          }
          this.data.createHistoryEntry(body, this.clientId, this._id, this.exerciseIdList[index]);
        })
      }
    })
    this.router.navigateByUrl('/view');
  }
}
