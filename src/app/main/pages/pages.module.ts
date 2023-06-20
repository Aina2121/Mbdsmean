import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'

import { CoreCommonModule } from '@core/common.module'
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module'
import { RouterModule, Routes } from '@angular/router'
import { AuthenticationModule } from './authentication/authentication.module'
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

// routing
const routes: Routes = [
  {
    path: 'list',
    component: AssignmentsComponent
  },
  {
    path: 'add',
    component: AddAssignmentComponent
  },
  {
    path: 'edit',
    component: EditAssignmentComponent
  },
  {
    path: 'detail',
    component: AssignmentDetailComponent
  }
]

@NgModule({
  declarations: [AddAssignmentComponent, AssignmentDetailComponent, EditAssignmentComponent, AssignmentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    DragDropModule
  ],

  providers: []
})
export class PagesModule {}
