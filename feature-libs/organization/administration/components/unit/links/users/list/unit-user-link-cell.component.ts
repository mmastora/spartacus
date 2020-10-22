import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { OrganizationCellComponent } from '../../../../shared/organization-table/organization-cell.component';

@Component({
  template: `
    <a
      *ngIf="hasItem && unitKey$ | async as uid"
      [routerLink]="
        { cxRoute: 'unitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      {{ 'user.roles' | cxTranslate }}
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitUserRolesCellComponent extends OrganizationCellComponent {
  unitKey$ = this.itemService.key$;
  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected itemService: OrganizationItemService<B2BUnit>
  ) {
    super(outlet);
  }

  getRouterModel(uid: string): any {
    return { ...this.outlet.context, uid };
  }
}
