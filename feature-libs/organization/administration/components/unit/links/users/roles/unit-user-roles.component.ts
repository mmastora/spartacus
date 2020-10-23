import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUser, B2BUserGroup } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { MessageService } from '../../../../shared/organization-message/services/message.service';
import { UnitUserRolesFormService } from './unit-user-roles-form.service';
import { UnitUserRolesItemService } from './unit-user-roles-item.service';
import { UserItemService } from '../../../../user/services/user-item.service';

@Component({
  templateUrl: './unit-user-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UnitUserRolesItemService,
    },
  ],
})
export class UnitUserRolesFormComponent {
  protected item: B2BUser;

  @ViewChild(MessageService, { read: MessageService })
  messageService: MessageService;

  form$: Observable<FormGroup> = this.itemService.current$.pipe(
    tap((item) => {
      if (!this.item) {
        this.item = item;
      }
      if (this.item.roles?.join() !== item.roles?.join()) {
        this.item = { ...this.item, ...item };
      }
    }),
    map((item) => this.formService.getForm(item))
  );

  availableRoles: B2BUserGroup[] = this.userService.getAllRoles();

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected formService: UnitUserRolesFormService,
    protected userService: B2BUserService,
    protected userItemService: UserItemService
  ) {}

  save(form: FormGroup) {
    form.disable();
    const roles = [...this.availableRoles].filter((r) => !!form.get(r).value);
    this.userItemService
      .update(this.item.customerId, { roles })
      .pipe(
        take(1),
        filter(
          (data: OrganizationItemStatus<B2BUser>) =>
            data.status === LoadStatus.SUCCESS
        )
      )
      .subscribe((data) => {
        this.notify({ ...this.item, ...data.item });
        form.enable();
      });
  }

  protected notify(item: B2BUser) {
    this.messageService.add({
      message: {
        key: 'unitUserRoles.messages.rolesUpdated',
        params: { item },
      },
    });
  }
}
