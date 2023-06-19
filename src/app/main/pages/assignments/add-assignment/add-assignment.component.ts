import { Component, OnInit } from '@angular/core';
import { Assignment } from 'app/models/Assignment';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  private horizontalWizardStepper: Stepper;
  private assignment: Assignment

  constructor() { }

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
  
  

}
