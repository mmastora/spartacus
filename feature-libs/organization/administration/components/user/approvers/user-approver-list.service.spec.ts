import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserApproverListService } from './user-approver-list.service';

const mockUserApproverEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: 'first',
      selected: true,
    },
    {
      uid: 'second',
      selected: false,
    },
    {
      uid: 'third',
      selected: true,
    },
  ],
};

class MockB2BUserService implements Partial<B2BUserService> {
  getApprovers(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUserApproverEntities);
  }
  assignApprover() {}
  unassignApprover() {}
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserApproverListService', () => {
  let service: UserApproverListService;
  let userService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserApproverListService,
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UserApproverListService);
    userService = TestBed.inject(B2BUserService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected approvers', () => {
    let result: EntitiesModel<UserGroup>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('second');
    expect(result.values[2].uid).toEqual('third');
  });

  it('should assign approver', () => {
    spyOn(userService, 'assignApprover');
    service.assign('customerId', 'userGroupUid');
    expect(userService.assignApprover).toHaveBeenCalledWith(
      'customerId',
      'userGroupUid'
    );
  });

  it('should unassign approver', () => {
    spyOn(userService, 'unassignApprover');
    service.unassign('customerId', 'userGroupUid');
    expect(userService.unassignApprover).toHaveBeenCalledWith(
      'customerId',
      'userGroupUid'
    );
  });
});
