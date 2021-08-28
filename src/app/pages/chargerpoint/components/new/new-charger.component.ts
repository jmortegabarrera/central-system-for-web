import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organization } from 'src/app/core/models/organization/organization.model';
import { CreateChargePointDto } from '../../../../core/models/chargepoint/create-chargepoint.dto';
import { ChargerPointService } from '../../../../core/services/charge-point.service';
import { OrganizationService } from '../../../../core/services/organization.service';

@Component({
  selector: 'app-new-charger',
  templateUrl: './new-charger.component.html',
  styleUrls: ['./new-charger.component.scss']
})
export class NewChargerComponent implements OnInit {

  name = '';
  cpo: string = null;
  organizations: Organization[] = [];

  constructor(
    private chargerPointService: ChargerPointService,
    private organizationService: OrganizationService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrganizations();
  }

  create(): void {
    const chargerPoint = new CreateChargePointDto();
    chargerPoint.name = this.name;
    chargerPoint.cpo = this.cpo
    this.chargerPointService.create$(chargerPoint).subscribe(
      data => {
        this.toastr.success(data.message, 'OK');
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail');
      }
    );
  }
  private loadOrganizations() {
    this.organizationService.getAllOrganizations$().subscribe(data => {
      this.organizations = data;
    });
  }

  goList(): void {
    this.router.navigate(['/']);
  }
}
