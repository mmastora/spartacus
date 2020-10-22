import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UserAssignedApproverListService } from './user-assigned-approver-list.service';

@Component({
  templateUrl: './user-assigned-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserAssignedApproverListService,
    },
  ],
})
export class UserAssignedApproverListComponent {}
