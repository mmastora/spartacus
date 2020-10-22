import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { B2BUser, B2BUserGroup } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { OrganizationFormService } from '../../shared/organization-form/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class UserFormService extends OrganizationFormService<B2BUser> {
  protected build() {
    const form = new FormGroup({});
    form.setControl('customerId', new FormControl(''));
    form.setControl('titleCode', new FormControl(''));
    form.setControl('firstName', new FormControl('', Validators.required));
    form.setControl('lastName', new FormControl('', Validators.required));
    form.setControl(
      'email',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ])
    );
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl('roles', new FormArray([]));
    form.setControl('isAssignedToApprovers', new FormControl(false));

    form.get('roles').valueChanges.subscribe((roles: string[]) => {
      if (roles.includes(B2BUserGroup.B2B_APPROVER_GROUP)) {
        form.get('isAssignedToApprovers').enable();
      } else {
        form.get('isAssignedToApprovers').disable();
        form.get('isAssignedToApprovers').reset();
      }
    });

    this.form = form;
  }

  protected patchData(item: B2BUser) {
    super.patchData(item);
    if (item) {
      const roles = this.form.get('roles') as FormArray;
      item.roles?.forEach((role) => {
        if (!(roles.value as string[]).includes(role)) {
          roles.push(new FormControl(role));
        }
      });
    }
  }
}
