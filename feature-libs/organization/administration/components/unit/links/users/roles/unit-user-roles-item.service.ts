import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUser, RoutingService } from '@spartacus/core';
import {
  B2BUserService,
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { CurrentUnitUserService } from '../services/current-unit-user.service';
import { UnitUserRolesFormService } from './unit-user-roles-form.service';
import { MessageService } from '../../../../shared/organization-message/services/message.service';
@Injectable({
  providedIn: 'root',
})
export class UnitUserRolesItemService extends OrganizationItemService<B2BUser> {
  constructor(
    protected currentItemService: CurrentUnitUserService,
    protected routingService: RoutingService,
    protected formService: UnitUserRolesFormService,
    protected unitService: OrgUnitService,
    protected b2bUserService: B2BUserService,
    protected messageService: MessageService
  ) {
    super(currentItemService, routingService, formService, messageService);
  }

  save(form: FormGroup, key?: string) {
    // we enable the unit so that the underlying
    // save method can read the complete form.value.
    form.get('orgUnit').enable();
    super.save(form, key);
  }

  load(unitUid: string): Observable<B2BUser> {
    return this.b2bUserService.get(unitUid);
  }

  update(
    customerId: string,
    _user: B2BUser
  ): Observable<OrganizationItemStatus<B2BUser>> {
    return this.b2bUserService.getLoadingStatus(customerId);
  }

  protected create(_customerId: B2BUser): void {}

  protected getDetailsRoute(): string {
    return this.currentItemService.getDetailsRoute();
  }
}
