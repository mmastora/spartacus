import { Component } from '@angular/core';
import { ConfiguratorCommonsService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../../layout/config/layout-config';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-loading',
  templateUrl: './config-loading.component.html',
})
export class ConfigLoadingComponent {
  protected routerData$: Observable<
    ConfigurationRouter.Data
  > = this.configRouterExtractorService.extractRouterData(this.routingService);

  breakpoint$: Observable<BREAKPOINT> = this.breakpointService.breakpoint$;

  configuration$: Observable<boolean> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService.getConfiguration(routerData.owner)
    ),
    map(Boolean),
    distinctUntilChanged()
  );

  constructor(
    protected routingService: RoutingService,
    protected configRouterExtractorService: ConfigRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected breakpointService: BreakpointService
  ) {}
}
