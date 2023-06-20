// assignments.component.ts

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentSubject } from 'app/models/AssignmentSubject';
import { AssignmentsService } from 'app/services/assignments.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
    noteModal: TemplateRef<any>; // Ajoutez cette ligne


  constructor(private assignmentsService:AssignmentsService, private modalService: BsModalService, private formBuilder: FormBuilder) {}

  onDrop(event: CdkDragDrop<AssignmentSubject[]>) {
    this.assignmentDrag = event.item.data;
    this.assignmentDrag.rendu = true;
    this.openNoteModal();
    this.renduFalseAssignments.splice(event.previousIndex, 1);
  }

  openNoteModal() {
    console.log("open")
   this.modalRef = this.modalService.show(this.noteModal);
   this.renduTrueAssignments.push(this.assignmentDrag);
  }

  submitNote() {
    if (this.noteForm.valid) {
      const note = this.noteForm.value.note;
      // Faites quelque chose avec la note, par exemple, mettez à jour l'assignment
      console.log('Note:', note);
      this.modalRef.hide();
      this.noteForm.reset();
    }
  }

  ngOnInit() {
    this.getAssignments();
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
}
