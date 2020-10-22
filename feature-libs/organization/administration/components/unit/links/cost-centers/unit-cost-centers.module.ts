import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationSubListModule } from '../../../shared/organization-sub-list/organization-sub-list.module';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';

@NgModule({
  imports: [I18nModule, RouterModule, OrganizationSubListModule],
  declarations: [UnitCostCenterListComponent],
})
export class UnitCostCenterListModule {}
