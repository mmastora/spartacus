import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EntitiesModel, normalizeHttpError } from '@spartacus/core';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { PermissionConnector } from '../../connectors/permission/permission.connector';
import {
  OrderApprovalPermissionType,
  Permission,
} from '../../model/permission.model';
import { isValidUser } from '../../utils/check-user';
import { normalizeListPage } from '../../utils/serializer';
import { OrganizationActions, PermissionActions } from '../actions';

@Injectable()
export class PermissionEffects {
  @Effect()
  loadPermission$: Observable<
    | PermissionActions.LoadPermissionSuccess
    | PermissionActions.LoadPermissionFail
  > = this.actions$.pipe(
    ofType(PermissionActions.LOAD_PERMISSION),
    map((action: PermissionActions.LoadPermission) => action.payload),
    filter((payload) => isValidUser(payload.userId)),
    switchMap(({ userId, permissionCode }) => {
      return this.permissionConnector.get(userId, permissionCode).pipe(
        map((permission: Permission) => {
          return new PermissionActions.LoadPermissionSuccess([permission]);
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new PermissionActions.LoadPermissionFail({
              permissionCode,
              error: normalizeHttpError(error),
            })
          )
        )
      );
    })
  );

  @Effect()
  loadPermissions$: Observable<
    | PermissionActions.LoadPermissionsSuccess
    | PermissionActions.LoadPermissionSuccess
    | PermissionActions.LoadPermissionsFail
  > = this.actions$.pipe(
    ofType(PermissionActions.LOAD_PERMISSIONS),
    map((action: PermissionActions.LoadPermissions) => action.payload),
    filter((payload) => isValidUser(payload.userId)),
    switchMap((payload) =>
      this.permissionConnector.getList(payload.userId, payload.params).pipe(
        switchMap((permissions: EntitiesModel<Permission>) => {
          const { values, page } = normalizeListPage(permissions, 'code');
          return [
            new PermissionActions.LoadPermissionSuccess(values),
            new PermissionActions.LoadPermissionsSuccess({
              page,
              params: payload.params,
            }),
          ];
        }),
        catchError((error: HttpErrorResponse) =>
          of(
            new PermissionActions.LoadPermissionsFail({
              params: payload.params,
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  @Effect()
  createPermission$: Observable<
    | PermissionActions.CreatePermissionSuccess
    | PermissionActions.CreatePermissionFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(PermissionActions.CREATE_PERMISSION),
    map((action: PermissionActions.CreatePermission) => action.payload),
    filter((payload) => isValidUser(payload.userId)),
    switchMap((payload) =>
      this.permissionConnector.create(payload.userId, payload.permission).pipe(
        switchMap((data) => [
          new PermissionActions.CreatePermissionSuccess(data),
          new OrganizationActions.OrganizationClearData(),
        ]),
        catchError((error: HttpErrorResponse) =>
          from([
            new PermissionActions.CreatePermissionFail({
              permissionCode: payload.permission.code,
              error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
          ])
        )
      )
    )
  );

  @Effect()
  updatePermission$: Observable<
    | PermissionActions.UpdatePermissionSuccess
    | PermissionActions.UpdatePermissionFail
    | OrganizationActions.OrganizationClearData
  > = this.actions$.pipe(
    ofType(PermissionActions.UPDATE_PERMISSION),
    map((action: PermissionActions.UpdatePermission) => action.payload),
    filter((payload) => isValidUser(payload.userId)),
    switchMap((payload) =>
      this.permissionConnector
        .update(payload.userId, payload.permissionCode, payload.permission)
        .pipe(
          switchMap((data) => [
            new PermissionActions.UpdatePermissionSuccess(data),
            new OrganizationActions.OrganizationClearData(),
          ]),
          catchError((error: HttpErrorResponse) =>
            from([
              new PermissionActions.UpdatePermissionFail({
                permissionCode: payload.permission.code,
                error: normalizeHttpError(error),
              }),
              new OrganizationActions.OrganizationClearData(),
            ])
          )
        )
    )
  );

  @Effect()
  loadPermissionTypes$: Observable<
    | PermissionActions.LoadPermissionTypesSuccess
    | PermissionActions.LoadPermissionTypesFail
  > = this.actions$.pipe(
    ofType(PermissionActions.LOAD_PERMISSION_TYPES),
    switchMap(() =>
      this.permissionConnector.getTypes().pipe(
        map(
          (permissionTypeList: OrderApprovalPermissionType[]) =>
            new PermissionActions.LoadPermissionTypesSuccess(permissionTypeList)
        ),
        catchError((error: HttpErrorResponse) =>
          of(
            new PermissionActions.LoadPermissionTypesFail({
              error: normalizeHttpError(error),
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private permissionConnector: PermissionConnector
  ) {}
}
