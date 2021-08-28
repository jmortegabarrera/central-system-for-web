import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organization } from '../../../../core/models/organization/organization.model';
import { OrganizationService } from '../../../../core/services/organization.service';
import { ChargerPointService } from '../../../../core/services/charge-point.service';
import { ChargerPoint } from 'src/app/core/models/chargepoint/chargepoint.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  organization: Organization = null;
  chargerPoints: ChargerPoint[] = [];

  constructor(
    private organizationService: OrganizationService,
    private chargerPointService: ChargerPointService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDetails();
  }
  
  private loadDetails() {
    const id = this.activatedRoute.snapshot.params.id;
    this.organizationService.getOrganizationById$(id).subscribe(
      data => {
        this.organization = data;
        if (this.organization) {
          this.chargerPointService.getAllChargerPoints$(id).subscribe(
            data => {
              this.chargerPoints = data;
            }
          );
        }
      },
      err => {
        this.toastr.error(err.error.message, 'Fail');
        this.goList();
      }
    );
  }

  delete(id: string): void {
    this.chargerPointService.deleteChargePoint$(id).subscribe(res => {
      if(res){
        this.loadDetails();
        this.toastr.success('Se ha borrado con exito', 'OK');
      }else {
        this.toastr.error('Ha ocurrido un error al borrar el cargador', 'Fail');
      }
    });
  }

  goList(): void {
    this.router.navigate(['/']);
  }
}
