import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from 'app/models/Assignment';
import { Subject } from 'app/models/Subject';
import { AssignmentsService } from 'app/services/assignments.service';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  private horizontalWizardStepper: Stepper;
  assignment: Assignment = new Assignment
  subjects: Subject
  error: ''

  constructor(private assignmentService: AssignmentsService, private _router: Router) { }

  ngOnInit(): void {
    //this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});
  }

  ngAfterViewInit() {
    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false, // Si vous souhaitez permettre la navigation non linéaire
      animation: true // Si vous souhaitez activer les animations
    });
  }

  next() {
    this.horizontalWizardStepper.next();
  }

  previous() {
    this.horizontalWizardStepper.previous();
  }
  
  getSubject() {
    const success = response => {
      this.subjects = response
    }

    const error = response => {
      this.error = response.error
    }

    this.assignmentService.getSubject().subscribe(success, error);
  }

  submit() {
    const success = response => {
      this._router.navigate(['/pages/list'])
    }

    const error = response => {
      this.error = response.error
    }

    this.assignmentService.addAssignment(this.assignment).subscribe(success, error);
  }

}
