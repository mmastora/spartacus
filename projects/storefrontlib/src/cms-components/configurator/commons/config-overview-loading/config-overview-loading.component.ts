import { Component } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable, using } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BREAKPOINT } from '../../../../layout';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-overview-loading',
  templateUrl: './config-overview-loading.component.html',
  styles: [],
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
    // TODO: instead of the breakpoint, we could load an appropriate SVG here,
    // and set it as a property of the component.
  );

  configuration$: Observable<Configurator.Configuration> = using(
    () => this.breakpoint$.subscribe(),
    () =>
      this.routerData$.pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      )
  );

  constructor(
    protected routingService: RoutingService,
    protected configRouterExtractorService: ConfigRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected breakpointService: BreakpointService
  ) {}
}
