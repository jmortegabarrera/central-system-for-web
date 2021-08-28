import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization/organization.component';
import { RouterModule } from '@angular/router';
import { NewComponent } from './organization/components/new/new.component';
import { EditComponent } from './organization/components/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './organization/components/detail/detail.component';
import { EditChargerPointComponent } from './chargerpoint/components/edit/edit-charger.component';
import { NewChargerComponent } from './chargerpoint/components/new/new-charger.component';

@NgModule({
  declarations: [
    OrganizationComponent,
    NewComponent,
    EditComponent,
    DetailComponent,
    EditChargerPointComponent,
    NewChargerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    OrganizationComponent,
  ]
})
export class PagesModule { }
