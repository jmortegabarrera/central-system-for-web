import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Organization } from '../../core/models/organization/organization.model';
import { OrganizationService } from '../../core/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[] = [];


  constructor(
    private organizationService: OrganizationService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.loadOrganization();
  }

  loadOrganization(): void {
    this.organizationService.getAllOrganizations$().subscribe(
      data => {
        this.organizations = data;
      },
      err => {
        this.organizations = [];
      }
    );
  }

  delete(id: string): void {
    this.organizationService.deleteOrganization$(id).subscribe(res => {
      if(res){
        this.loadOrganization();
        this.toastr.success('Se ha borrado con exito', 'OK');
      }else {
        this.toastr.error('Ha ocurrido un error al borrar la organizacion', 'Fail');
      }
    });
  }
}
