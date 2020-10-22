import { B2BUser, ListModel, SearchConfig, StateUtils } from '@spartacus/core';
import { serializeSearchConfig } from '../../utils/serializer';
import {
  B2B_USER_APPROVERS,
  B2B_USER_ENTITIES,
  B2B_USER_PERMISSIONS,
  B2B_USER_USER_GROUPS,
  PERMISSION_ENTITIES,
  USER_GROUP_ENTITIES,
  USER_LIST,
} from '../organization-state';

export const LOAD_B2B_USER = '[B2BUser] Load B2BUser Data';
export const LOAD_B2B_USER_FAIL = '[B2BUser] Load B2BUser Data Fail';
export const LOAD_B2B_USER_SUCCESS = '[B2BUser] Load B2BUser Data Success';

export const CREATE_B2B_USER = '[B2BUser] Create B2BUser Data';
export const CREATE_B2B_USER_FAIL = '[B2BUser] Create B2BUser Data Fail';
export const CREATE_B2B_USER_SUCCESS = '[B2BUser] Create B2BUser Data Success';

export const UPDATE_B2B_USER = '[B2BUser] Update B2BUser Data';
export const UPDATE_B2B_USER_FAIL = '[B2BUser] Update B2BUser Data Fail';
export const UPDATE_B2B_USER_SUCCESS = '[B2BUser] Update B2BUser Data Success';

export const LOAD_B2B_USERS = '[B2BUser] Load B2BUsers';
export const LOAD_B2B_USERS_FAIL = '[B2BUser] Load B2BUsers Fail';
export const LOAD_B2B_USERS_SUCCESS = '[B2BUser] Load B2BUsers Success';

export const LOAD_B2B_USER_APPROVERS = '[B2BUser] Load B2BUser Approvers';
export const LOAD_B2B_USER_APPROVERS_FAIL =
  '[B2BUser] Load B2BUser Approvers Fail';
export const LOAD_B2B_USER_APPROVERS_SUCCESS =
  '[B2BUser] Load B2BUser Approvers Success';

export const CREATE_B2B_USER_APPROVER = '[B2BUser] Create B2BUser Approver';
export const CREATE_B2B_USER_APPROVER_FAIL =
  '[B2BUser] Create B2BUser Approver Fail';
export const CREATE_B2B_USER_APPROVER_SUCCESS =
  '[B2BUser] Create B2BUser Approver Success';

export const DELETE_B2B_USER_APPROVER = '[B2BUser] Delete B2BUser Approver';
export const DELETE_B2B_USER_APPROVER_FAIL =
  '[B2BUser] Delete B2BUser Approver Fail';
export const DELETE_B2B_USER_APPROVER_SUCCESS =
  '[B2BUser] Delete B2BUser Approver Success';

export const LOAD_B2B_USER_PERMISSIONS = '[B2BUser] Load B2BUser Permissions';
export const LOAD_B2B_USER_PERMISSIONS_FAIL =
  '[B2BUser] Load B2BUser Permissions Fail';
export const LOAD_B2B_USER_PERMISSIONS_SUCCESS =
  '[B2BUser] Load B2BUser Permissions Success';

export const CREATE_B2B_USER_PERMISSION = '[B2BUser] Create B2BUser Permission';
export const CREATE_B2B_USER_PERMISSION_FAIL =
  '[B2BUser] Create B2BUser Permission Fail';
export const CREATE_B2B_USER_PERMISSION_SUCCESS =
  '[B2BUser] Create B2BUser Permission Success';

export const DELETE_B2B_USER_PERMISSION = '[B2BUser] Delete B2BUser Permission';
export const DELETE_B2B_USER_PERMISSION_FAIL =
  '[B2BUser] Delete B2BUser Permission Fail';
export const DELETE_B2B_USER_PERMISSION_SUCCESS =
  '[B2BUser] Delete B2BUser Permission Success';

export const LOAD_B2B_USER_USER_GROUPS = '[B2BUser] Load B2BUser User Groups';
export const LOAD_B2B_USER_USER_GROUPS_FAIL =
  '[B2BUser] Load B2BUser User Groups Fail';
export const LOAD_B2B_USER_USER_GROUPS_SUCCESS =
  '[B2BUser] Load B2BUser User Groups Success';

export const CREATE_B2B_USER_USER_GROUP = '[B2BUser] Create B2BUser User Group';
export const CREATE_B2B_USER_USER_GROUP_FAIL =
  '[B2BUser] Create B2BUser User Group Fail';
export const CREATE_B2B_USER_USER_GROUP_SUCCESS =
  '[B2BUser] Create B2BUser User Group Success';

export const DELETE_B2B_USER_USER_GROUP = '[B2BUser] Delete B2BUser User Group';
export const DELETE_B2B_USER_USER_GROUP_FAIL =
  '[B2BUser] Delete B2BUser User Group Fail';
export const DELETE_B2B_USER_USER_GROUP_SUCCESS =
  '[B2BUser] Delete B2BUser User Group Success';

export class LoadB2BUser extends StateUtils.EntityLoadAction {
  readonly type = LOAD_B2B_USER;
  constructor(public payload: { userId: string; orgCustomerId: string }) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId);
  }
}

export class LoadB2BUserFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_B2B_USER_FAIL;
  constructor(public payload: { orgCustomerId: string; error: any }) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class LoadB2BUserSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_B2B_USER_SUCCESS;
  constructor(public payload: B2BUser | B2BUser[]) {
    super(
      B2B_USER_ENTITIES,
      Array.isArray(payload)
        ? payload.map((orgUnitCustomer) => orgUnitCustomer?.customerId)
        : payload?.customerId
    );
  }
}

export class CreateB2BUser {
  readonly type = CREATE_B2B_USER;
  constructor(public payload: { userId: string; orgCustomer: B2BUser }) {}
}

export class CreateB2BUserFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_B2B_USER_FAIL;
  constructor(public payload: { orgCustomerId: string; error: any }) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class CreateB2BUserSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_B2B_USER_SUCCESS;
  constructor(public payload: B2BUser) {
    super(B2B_USER_ENTITIES, payload.customerId, payload);
  }
}

export class UpdateB2BUser extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_B2B_USER;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      orgCustomer: B2BUser;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomer.customerId);
  }
}

export class UpdateB2BUserFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_B2B_USER_FAIL;
  constructor(public payload: { orgCustomerId: string; error: any }) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class UpdateB2BUserSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_B2B_USER_SUCCESS;
  constructor(
    public payload: {
      orgCustomer: B2BUser;
      orgCustomerId: string;
      userId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.orgCustomer);
  }
}

export class LoadB2BUsers extends StateUtils.EntityLoadAction {
  readonly type = LOAD_B2B_USERS;
  constructor(
    public payload: {
      userId: string;
      params: SearchConfig;
    }
  ) {
    super(USER_LIST, serializeSearchConfig(payload.params));
  }
}

export class LoadB2BUsersFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_B2B_USERS_FAIL;
  constructor(public payload: { params: SearchConfig; error: any }) {
    super(USER_LIST, serializeSearchConfig(payload.params), payload.error);
  }
}

export class LoadB2BUsersSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_B2B_USERS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(USER_LIST, serializeSearchConfig(payload.params));
  }
}

export class LoadB2BUserApprovers extends StateUtils.EntityLoadAction {
  readonly type = LOAD_B2B_USER_APPROVERS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      params: SearchConfig;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      serializeSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class LoadB2BUserApproversFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_B2B_USER_APPROVERS_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      params: SearchConfig;
      error: any;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      serializeSearchConfig(payload.params, payload.orgCustomerId),
      payload.error
    );
  }
}

export class LoadB2BUserApproversSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_B2B_USER_APPROVERS_SUCCESS;
  constructor(
    public payload: {
      orgCustomerId: string;
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(
      B2B_USER_APPROVERS,
      serializeSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class CreateB2BUserApprover extends StateUtils.EntityLoadAction {
  readonly type = CREATE_B2B_USER_APPROVER;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      approverId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.approverId);
  }
}

export class CreateB2BUserApproverFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_B2B_USER_APPROVER_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      approverId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.approverId);
  }
}

export class CreateB2BUserApproverSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_B2B_USER_APPROVER_SUCCESS;
  constructor(
    public payload: {
      approverId: string;
      selected: boolean;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.approverId, payload);
  }
}

export class DeleteB2BUserApprover extends StateUtils.EntityLoadAction {
  readonly type = DELETE_B2B_USER_APPROVER;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      approverId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.approverId);
  }
}

export class DeleteB2BUserApproverFail extends StateUtils.EntityFailAction {
  readonly type = DELETE_B2B_USER_APPROVER_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      approverId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.approverId);
  }
}

export class DeleteB2BUserApproverSuccess extends StateUtils.EntitySuccessAction {
  readonly type = DELETE_B2B_USER_APPROVER_SUCCESS;
  constructor(
    public payload: {
      approverId: string;
      selected: boolean;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.approverId, payload);
  }
}

export class LoadB2BUserPermissions extends StateUtils.EntityLoadAction {
  readonly type = LOAD_B2B_USER_PERMISSIONS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      params: SearchConfig;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      serializeSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class LoadB2BUserPermissionsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_B2B_USER_PERMISSIONS_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      params: SearchConfig;
      error: any;
    }
  ) {
    super(B2B_USER_PERMISSIONS, payload.orgCustomerId, payload.error);
  }
}

export class LoadB2BUserPermissionsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_B2B_USER_PERMISSIONS_SUCCESS;
  constructor(
    public payload: {
      orgCustomerId: string;
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(
      B2B_USER_PERMISSIONS,
      serializeSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class CreateB2BUserPermission extends StateUtils.EntityLoadAction {
  readonly type = CREATE_B2B_USER_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      permissionId: string;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionId);
  }
}

export class CreateB2BUserPermissionFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_B2B_USER_PERMISSION_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      permissionId: string;
      error: any;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionId, payload.error);
  }
}

export class CreateB2BUserPermissionSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_B2B_USER_PERMISSION_SUCCESS;
  constructor(
    public payload: {
      permissionId: string;
      selected: boolean;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionId, payload);
  }
}

export class DeleteB2BUserPermission extends StateUtils.EntityLoadAction {
  readonly type = DELETE_B2B_USER_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      permissionId: string;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionId);
  }
}

export class DeleteB2BUserPermissionFail extends StateUtils.EntityFailAction {
  readonly type = DELETE_B2B_USER_PERMISSION_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      permissionId: string;
      error: any;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionId, payload.error);
  }
}

export class DeleteB2BUserPermissionSuccess extends StateUtils.EntitySuccessAction {
  readonly type = DELETE_B2B_USER_PERMISSION_SUCCESS;
  constructor(
    public payload: {
      permissionId: string;
      selected: boolean;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionId, payload);
  }
}

export class LoadB2BUserUserGroups extends StateUtils.EntityLoadAction {
  readonly type = LOAD_B2B_USER_USER_GROUPS;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      params: SearchConfig;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      serializeSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class LoadB2BUserUserGroupsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_B2B_USER_USER_GROUPS_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      params: SearchConfig;
      error: any;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      serializeSearchConfig(payload.params, payload.orgCustomerId),
      payload.error
    );
  }
}

export class LoadB2BUserUserGroupsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_B2B_USER_USER_GROUPS_SUCCESS;
  constructor(
    public payload: {
      orgCustomerId: string;
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(
      B2B_USER_USER_GROUPS,
      serializeSearchConfig(payload.params, payload.orgCustomerId)
    );
  }
}

export class CreateB2BUserUserGroup extends StateUtils.EntityLoadAction {
  readonly type = CREATE_B2B_USER_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      userGroupId: string;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroupId);
  }
}

export class CreateB2BUserUserGroupFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_B2B_USER_USER_GROUP_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      userGroupId: string;
      error: any;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class CreateB2BUserUserGroupSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_B2B_USER_USER_GROUP_SUCCESS;
  constructor(
    public payload: {
      uid: string;
      selected: boolean;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class DeleteB2BUserUserGroup extends StateUtils.EntityLoadAction {
  readonly type = DELETE_B2B_USER_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      orgCustomerId: string;
      userGroupId: string;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroupId);
  }
}

export class DeleteB2BUserUserGroupFail extends StateUtils.EntityFailAction {
  readonly type = DELETE_B2B_USER_USER_GROUP_FAIL;
  constructor(
    public payload: {
      orgCustomerId: string;
      userGroupId: string;
      error: any;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class DeleteB2BUserUserGroupSuccess extends StateUtils.EntitySuccessAction {
  readonly type = DELETE_B2B_USER_USER_GROUP_SUCCESS;
  constructor(
    public payload: {
      uid: string;
      selected: boolean;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export type B2BUserAction =
  | LoadB2BUser
  | LoadB2BUserFail
  | LoadB2BUserSuccess
  | CreateB2BUser
  | CreateB2BUserFail
  | CreateB2BUserSuccess
  | UpdateB2BUser
  | UpdateB2BUserFail
  | UpdateB2BUserSuccess
  | LoadB2BUsers
  | LoadB2BUsersFail
  | LoadB2BUsersSuccess
  | LoadB2BUserApprovers
  | LoadB2BUserApproversFail
  | LoadB2BUserApproversSuccess
  | CreateB2BUserApprover
  | CreateB2BUserApproverFail
  | CreateB2BUserApproverSuccess
  | DeleteB2BUserApprover
  | DeleteB2BUserApproverFail
  | DeleteB2BUserApproverSuccess
  | LoadB2BUserPermissions
  | LoadB2BUserPermissionsFail
  | LoadB2BUserPermissionsSuccess
  | CreateB2BUserPermission
  | CreateB2BUserPermissionFail
  | CreateB2BUserPermissionSuccess
  | DeleteB2BUserPermission
  | DeleteB2BUserPermissionFail
  | DeleteB2BUserPermissionSuccess
  | LoadB2BUserUserGroups
  | LoadB2BUserUserGroupsFail
  | LoadB2BUserUserGroupsSuccess
  | CreateB2BUserUserGroup
  | CreateB2BUserUserGroupFail
  | CreateB2BUserUserGroupSuccess
  | DeleteB2BUserUserGroup
  | DeleteB2BUserUserGroupFail
  | DeleteB2BUserUserGroupSuccess;
