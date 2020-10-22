import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  templateUrl: '../organization-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveLinkCellComponent extends OrganizationCellComponent {
  get tabIndex() {
    return 0;
  }
}
