import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organization } from 'src/app/core/models/organization/organization.model';
import { ChargerPoint } from '../../../../core/models/chargepoint/chargepoint.model';
import { UpdateChargerPointDto } from '../../../../core/models/chargepoint/update-chargepoint.dto';
import { ChargerPointService } from '../../../../core/services/charge-point.service';
import { OrganizationService } from '../../../../core/services/organization.service';

@Component({
  selector: 'app-edit-charger',
  templateUrl: './edit-charger.component.html',
  styleUrls: ['./edit-charger.component.scss']
})
export class EditChargerPointComponent implements OnInit {

  chargerPoint: ChargerPoint = null;
  organizationId: string = null;
  organizations: Organization[] = [];

  constructor(
    private organizationService: OrganizationService,
    private chargerPointService: ChargerPointService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.chargerPointService.getChargerPointById$(id).subscribe(
      data => {
        this.chargerPoint = data;
        this.loadOrganizations();
      },
      err => {
        this.toastr.error(err.error.message, 'Fail');
        this.router.navigate(['/']);
      }
    );
  }

  private loadOrganizations() {
    this.organizationService.getAllOrganizations$().subscribe(data => {
      this.organizations = data;
    });
  }

  update(): void {
    const id = this.activatedRoute.snapshot.params.id;
    const updateChargerPoint = new UpdateChargerPointDto();
    updateChargerPoint.name = this.chargerPoint.name;
    updateChargerPoint.cpo = this.organizationId;

    this.chargerPointService.update$(updateChargerPoint).subscribe(
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
