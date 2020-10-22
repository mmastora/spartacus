import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CostCenter } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { OrganizationFormService } from '../../shared/organization-form/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterFormService extends OrganizationFormService<CostCenter> {
  protected build() {
    const form = new FormGroup({});
    form.setControl(
      'code',
      new FormControl('', [
        Validators.required,
        CustomFormValidators.noSpecialCharacters,
      ])
    );
    form.setControl('name', new FormControl('', Validators.required));

    form.setControl(
      'currency',
      new FormGroup({
        isocode: new FormControl(undefined, Validators.required),
      })
    );
    form.setControl(
      'unit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
    this.form = form;
  }
}
