import { InjectionToken } from '@angular/core';
import { Converter, EntitiesModel } from '@spartacus/core';
import { UserGroup } from '../../model';

export const USER_GROUP_NORMALIZER = new InjectionToken<
  Converter<any, UserGroup>
>('UserGroupNormalizer');
export const USER_GROUPS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<UserGroup>>
>('UserGroupListNormalizer');
