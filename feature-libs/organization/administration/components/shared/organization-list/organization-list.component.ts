import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Table, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationListService } from './organization-list.service';

@Component({
  selector: 'cx-organization-list',
  templateUrl: './organization-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationListComponent<T = any, P = PaginationModel> {
  // temp as long as unit tree is not merged
  @HostBinding('class.organization') orgCls = true;

  @HostBinding('class.ghost') hasGhostData = false;

  constructor(
    protected service: OrganizationListService<T, P>,
    protected organizationItemService: OrganizationItemService<T>
  ) {}

  @HostBinding('class')
  viewType = this.service.viewType;

  domainType = this.service.domainType;

  sortCode: string;

  /**
   * The current key represents the current selected item from the dataset.
   * This key is used to load the item details as well as highlight the item in
   * a list of items.
   */
  readonly currentKey$ = this.organizationItemService.key$;

  readonly structure$: Observable<TableStructure> = this.service.getStructure();

  readonly listData$: Observable<
    EntitiesModel<T>
  > = this.service.getData().pipe(
    tap((data) => {
      this.sortCode = data.pagination?.sort;
      this.hasGhostData = this.service.hasGhostData(data);
    })
  );

  get key(): string {
    return this.service.key();
  }

  /**
   * Returns the total number of items.
   */
  getListCount(dataTable: Table): number {
    return dataTable.pagination?.totalResults;
  }

  /**
   * Browses to the given page number
   */
  browse(pagination: P, pageNumber: number) {
    this.service.view(pagination, pageNumber);
  }

  /**
   * Navigates to the detailed view of the selected list item.
   */
  launchItem(event: T): void {
    this.organizationItemService.launchDetails(event);
  }

  /**
   * Sorts the list.
   */
  sort(pagination: P): void {
    this.service.sort({
      ...pagination,
      ...({ sort: this.sortCode } as PaginationModel),
    });
  }
}
