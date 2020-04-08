import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Breadcrumb } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { FacetList } from '../facet.model';
import { FacetService } from '../services/facet.service';

/**
 * Active facets render the applied facet values as a list of focusable buttons
 * which can be used to remove the applied facet value.
 */
@Component({
  selector: 'cx-active-facets',
  templateUrl: './active-facets.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ActiveFacetsComponent {
  /** Active facets which are applied to the product results. */
  facetList$: Observable<FacetList> = this.facetService.facetList$;

  /** Configurable icon which is used for the active facet close button */
  @Input() closeIcon = ICON_TYPE.CLOSE;

  constructor(protected facetService: FacetService) {}

  getLinkParams(facet: Breadcrumb) {
    return this.facetService.getLinkParams(facet.removeQuery?.query?.value);
  }

  /**
   * The focus key is used to persist the focus on the facet when the DOM is being
   * recreated. We only apply the focus key for the given facet when there are no
   * facets available. This is a great experience for the keyboard user, who keep the
   * focus on the activated facet all the time.
   */
  getFocusKey(facetList: FacetList, facet: Breadcrumb) {
    return !facetList.facets?.length ? facet.facetValueName : '';
  }
}