import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserGroup } from '@spartacus/organization/administration/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { OrganizationFormService } from '../../shared/organization-form/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class UserGroupFormService extends OrganizationFormService<UserGroup> {
  protected build() {
    const form = new FormGroup({});
    form.setControl(
      'uid',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.noSpecialCharacters,
      ])
    );
    form.setControl('name', new FormControl('', Validators.required));
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
    this.form = form;
  }
}
