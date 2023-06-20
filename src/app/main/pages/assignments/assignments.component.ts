// assignments.component.ts

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentSubject } from 'app/models/AssignmentSubject';
import { AssignmentsService } from 'app/services/assignments.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Assignment } from 'app/models/Assignment';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent {
  assignments: AssignmentSubject[] = [];

  assignmentDrag:AssignmentSubject;
  renduFalseAssignments: AssignmentSubject[] = [];
  renduTrueAssignments: AssignmentSubject[] = [];
  error = ''
  event : CdkDragDrop<AssignmentSubject[]>
  assignmentDetails: AssignmentSubject

    // propriétés pour la pagination
    page: number=1;
    limit: number=10;
    totalDocs: number = 0;
    totalPages: number = 0;
    hasPrevPage: boolean = false;
    prevPage: number = 0;
    hasNextPage: boolean = false;
    nextPage: number = 0;

    noteForm: FormGroup;
    modalRef: BsModalRef;
    @ViewChild('noteModal') noteModal: TemplateRef<any>;
    @ViewChild('details') details: TemplateRef<any>;


  constructor(private assignmentsService:AssignmentsService, private modalService: BsModalService, private formBuilder: FormBuilder) {}

  onDrop(event: CdkDragDrop<AssignmentSubject[]>) {
    this.assignmentDrag = event.item.data;
    this.openNoteModal();
    this.event = event
   // this.renduFalseAssignments.splice(event.previousIndex, 1);
  }

  openNoteModal() {
    console.log("open")
   this.modalRef = this.modalService.show(this.noteModal);
   this.renduTrueAssignments.push(this.assignmentDrag);
  }

  async submitNote() {
    console.log('Miditraa:', this.noteForm.valid, this.noteForm.value);
    if (this.noteForm.valid) {
      console.log('Miditraa22:');
      await this.addNote();
      // Faites quelque chose avec la note, par exemple, mettez à jour l'assignment
      console.log('NoteUpdated:');
      this.modalRef.hide();
      this.noteForm.reset();
    }
  }

  ngOnInit() {
    this.getAssignments();
    this.noteForm = this.formBuilder.group({
      dateRendu: ['', Validators.required],
      note: ['', Validators.required],
      remarque: ['', Validators.required]
    });
  }

  getAssignments() {
    this.assignmentsService.getAll(this.page, this.limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("get", this.assignments)
      console.log("Données reçues");

      this.renduFalseAssignments = this.assignments.filter(a => !a.rendu);
      this.renduTrueAssignments = this.assignments.filter(a => a.rendu);
    });
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  addNote() {
    var data : Assignment = {
      _id: this.assignmentDrag._id,
      auteur: this.assignmentDrag.auteur,
      rendu: true,
      dateRendu: this.noteForm.value.dateRendu,
      matiere:this.assignmentDrag.matiere,
      note:this.noteForm.value.note,
      remarque:this.noteForm.value.remarque
    }

    const success = response => {
      this.getAssignments()
    }
     
    const error = response => {
      this.error = response.error
    }

    this.assignmentsService.updateAssignment(data).subscribe(success, error)
  }

  openDetails(assign: AssignmentSubject) {
    this.assignmentDetails = assign;
    this.modalRef = this.modalService.show(this.details);
  }
}
