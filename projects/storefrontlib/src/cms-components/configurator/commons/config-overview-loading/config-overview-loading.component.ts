import { Component } from '@angular/core';
import { ConfiguratorCommonsService, RoutingService } from '@spartacus/core';
import { Observable, using } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../../layout/config/layout-config';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-overview-loading',
  templateUrl: './config-overview-loading.component.html',
})
export class ConfigOverviewLoadingComponent {
  breakpoint: BREAKPOINT;

  protected routerData$: Observable<
    ConfigurationRouter.Data
  > = this.configRouterExtractorService.extractRouterData(this.routingService);
  protected breakpoint$: Observable<
    BREAKPOINT
  > = this.breakpointService.breakpoint$.pipe(
    tap((breakpoint) => (this.breakpoint = breakpoint))
  );

  configuration$: Observable<boolean> = using(
    () => this.breakpoint$.subscribe(),
    () =>
      this.routerData$.pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        ),
        map(Boolean)
      )
  );

  constructor(
    protected routingService: RoutingService,
    protected configRouterExtractorService: ConfigRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected breakpointService: BreakpointService
  ) {}
}
