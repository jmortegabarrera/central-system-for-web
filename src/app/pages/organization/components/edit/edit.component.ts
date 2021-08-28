import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organization } from '../../../../core/models/organization/organization.model';
import { OrganizationService } from '../../../../core/services/organization.service';
import { UpdateOrganizationDto } from '../../../../core/models/organization/update-organization.dto';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  organization: Organization = null;

  constructor(
    private organizationService: OrganizationService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.organizationService.getOrganizationById$(id).subscribe(
      data => {
        this.organization = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail');
        this.router.navigate(['/']);
      }
    );
  }

  update(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.organizationService.update$(this.organization).subscribe(
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
