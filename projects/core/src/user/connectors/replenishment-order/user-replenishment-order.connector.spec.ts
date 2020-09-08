import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { OrderHistoryList, ReplenishmentOrder } from '../../../model/index';
import { UserReplenishmentOrderAdapter } from './user-replenishment-order.adapter';
import { UserReplenishmentOrderConnector } from './user-replenishment-order.connector';
import createSpy = jasmine.createSpy;

const userId = 'test-user-id';
const replenishmentCode = 'test-order-id';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

const mockOrderHistoryList: OrderHistoryList = {
  orders: [
    {
      code: 'test-order-code',
    },
  ],
  pagination: {},
  sorts: [],
};

class MockUserReplenishmentOrderAdapter
  implements UserReplenishmentOrderAdapter {

  loadHistory = createSpy(
    'UserReplenishmentOrderAdapter.loadHistory'
  ).and.callFake((userId) => of(`orderHistory-${userId}`));

  load(
    _userId: string,
    _replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }

  loadReplenishmentDetailsHistory(
    _userId: string,
    _replenishmentOrderCode: string,
    _pageSize?: number,
    _currentPage?: number,
    _sort?: string
  ): Observable<OrderHistoryList> {
    return of({});
  }

  cancelReplenishmentOrder(
    _userId: string,
    _replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }
}

describe('UserReplenishmentOrderConnector', () => {
  let adapter: UserReplenishmentOrderAdapter;
  let connector: UserReplenishmentOrderConnector;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        UserReplenishmentOrderConnector,
        {
          provide: UserReplenishmentOrderAdapter,
          useClass: MockUserReplenishmentOrderAdapter,
        },
      ],
    });
  });

  beforeEach(() => {
    adapter = TestBed.inject(UserReplenishmentOrderAdapter);
    connector = TestBed.inject(UserReplenishmentOrderConnector);
  });

  it('should create', () => {
    expect(connector).toBeTruthy();
  });

  it('load should call adapter', () => {
    spyOn(adapter, 'load').and.returnValue(of(mockReplenishmentOrder));

    let result: ReplenishmentOrder;

    connector
      .load(userId, replenishmentCode)
      .subscribe((res) => (result = res))
      .unsubscribe();

    expect(result).toBe(mockReplenishmentOrder);
    expect(adapter.load).toHaveBeenCalledWith(userId, replenishmentCode);
  });

  it('loadReplenishmentDetailsHistory should call adapter', () => {
    spyOn(adapter, 'loadReplenishmentDetailsHistory').and.returnValue(
      of(mockOrderHistoryList)
    );

    let result: OrderHistoryList;

    connector
      .loadReplenishmentDetailsHistory(userId, replenishmentCode)
      .subscribe((res) => (result = res))
      .unsubscribe();

    expect(result).toBe(mockOrderHistoryList);
    expect(adapter.loadReplenishmentDetailsHistory).toHaveBeenCalledWith(
      userId,
      replenishmentCode,
      undefined,
      undefined,
      undefined
    );
  });

  it('cancelReplenishmentOrder should call adapter', () => {
    spyOn(adapter, 'cancelReplenishmentOrder').and.returnValue(
      of(mockReplenishmentOrder)
    );

    let result: ReplenishmentOrder;

    connector
      .cancelReplenishmentOrder(userId, replenishmentCode)
      .subscribe((res) => (result = res))
      .unsubscribe();

    expect(result).toBe(mockReplenishmentOrder);
    expect(adapter.cancelReplenishmentOrder).toHaveBeenCalledWith(
      userId,
      replenishmentCode
    );
  });

  it('getHistory should call adapter', () => {
    let result;
    connector.getHistory('user3').subscribe((res) => (result = res));
    console.log(result);
    expect(result).toBe('orderHistory-user3');
    expect(adapter.loadHistory).toHaveBeenCalledWith(
      'user3',
      undefined,
      undefined,
      undefined
    );
  });
});