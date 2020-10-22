import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { CostCenter, GlobalMessageType } from '@spartacus/core';
import { ExistCostCenterGuard } from './exist-cost-center.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveCostCenterGuard extends ExistCostCenterGuard {
  protected isValid(costCenter: CostCenter): boolean {
    return costCenter.active;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    const urlPath = this.semanticPathService.transform({
      cxRoute: 'costCenterDetails',
      params: { code: _urlParams.code },
    });

    return this.router.parseUrl(urlPath.join('/'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.disabled',
        params: { item: 'Cost Center' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}
