import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './pages/organization/components/edit/edit.component';
import { NewComponent } from './pages/organization/components/new/new.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { DetailComponent } from './pages/organization/components/detail/detail.component';
import { EditChargerPointComponent } from './pages/chargerpoint/components/edit/edit-charger.component';
import { NewChargerComponent } from './pages/chargerpoint/components/new/new-charger.component';


const routes: Routes = [
  { path: '', component: OrganizationComponent },
  { path: 'new', component: NewComponent },
  { path: 'newCharger', component: NewChargerComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'editCharger/:id', component: EditChargerPointComponent },
  {path: 'detail/:id', component: DetailComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
]; @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
