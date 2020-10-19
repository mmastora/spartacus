import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  RoutingService,
  User,
  UserToken,
  UserService,
  B2BUser,
  GlobalMessageService,
  GlobalMessageType,
  B2BUserGroup,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutAuthGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activeCartService: ActiveCartService,
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.getUserToken(),
      this.activeCartService.getAssignedUser(),
      this.userService.get(),
      this.activeCartService.isStable(),
    ]).pipe(
      filter(([, , , isStable]) => !!isStable),
      map(
        ([token, cartUser, user]: [
          UserToken,
          User,
          User | B2BUser,
          boolean
        ]) => {
          if (!token.access_token) {
            if (this.activeCartService.isGuestCart()) {
              return Boolean(cartUser);
            }
            this.authRedirectService.reportAuthGuard();
            if (this.checkoutConfigService.isGuestCheckout()) {
              this.routingService.go({ cxRoute: 'login' }, { forced: true });
            } else {
              this.routingService.go({ cxRoute: 'login' });
            }
          } else if ('roles' in user) {
            const roles = (<B2BUser>user).roles;
            if (roles.includes(B2BUserGroup.B2B_CUSTOMER_GROUP)) {
              return true;
            } else {
              this.globalMessageService.add(
                { key: 'checkout.invalid.accountType' },
                GlobalMessageType.MSG_TYPE_WARNING
              );
              return false;
            }
          }
          return !!token.access_token;
        }
      )
    );
  }
}
