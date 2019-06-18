import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-workout-cell',
  templateUrl: './workout-cell.component.html',
  styleUrls: ['./workout-cell.component.scss'],
})
export class WorkoutCellComponent implements OnInit {
  @Input('value') value: any;

  exerciseList = [];
  constructor(private data: DataProviderService) { }

  ngOnInit() {
    this.value.exerciseList.map((id) => {
      this.data.getExercise(id).subscribe((response) => {
        this.exerciseList.push(response.data);
      })
    })
  }

}
