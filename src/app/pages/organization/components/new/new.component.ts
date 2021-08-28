import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrganizationService } from '../../../../../app/core/services/organization.service';
import { Organization } from '../../../../core/models/organization/organization.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  name = '';
  cif: string = null;

  constructor(
    private organizationService: OrganizationService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  create(): void {
    const organization = new Organization();
    organization.name = this.name;
    organization.legalEntity = this.cif
    this.organizationService.create$(organization).subscribe(
      data => {
        this.toastr.success(data.message, 'OK');
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail');
      }
    );
  }

  goList(): void {
    this.router.navigate(['/']);
  }
}
