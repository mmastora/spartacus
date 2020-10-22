import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CartNotEmptyGuard } from '../../../cart/cart-not-empty.guard';
import { IconModule } from '../../../misc/icon/icon.module';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { ScheduleReplenishmentOrderComponent } from './schedule-replenishment-order.component';

@NgModule({
  imports: [CommonModule, RouterModule, I18nModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutScheduleReplenishmentOrder: {
          component: ScheduleReplenishmentOrderComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [ScheduleReplenishmentOrderComponent],
  entryComponents: [ScheduleReplenishmentOrderComponent],
  exports: [ScheduleReplenishmentOrderComponent],
})
export class ScheduleReplenishmentOrderModule {}
