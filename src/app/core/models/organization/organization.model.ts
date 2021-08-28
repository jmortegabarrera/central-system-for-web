import { ChargerPoint } from '../chargepoint/chargepoint.model';
export class Organization {
  id: string;
  name: string;
  legalEntity: string;
  chargerPoints: ChargerPoint[];
}