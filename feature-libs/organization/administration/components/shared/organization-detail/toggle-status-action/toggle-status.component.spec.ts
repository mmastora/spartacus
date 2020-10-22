import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ConfirmationMessageComponent } from '@spartacus/organization/administration/components';
import {
  Budget,
  LoadStatus,
} from '@spartacus/organization/administration/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of, Subject } from 'rxjs';
import { OrganizationItemService } from '../../organization-item.service';
import { ConfirmationMessageData } from '../../organization-message/confirmation/confirmation-message.model';
import { MessageService } from '../../organization-message/services/message.service';
import { ToggleStatusComponent } from './toggle-status.component';
import createSpy = jasmine.createSpy;

class MockMessageService {
  add() {
    return new Subject();
  }
  close() {}
}

class MockOrganizationItemService {
  current$ = of();
  update() {
    return of();
  }
}

describe('ToggleStatusComponent', () => {
  let component: ToggleStatusComponent<Budget>;
  let fixture: ComponentFixture<ToggleStatusComponent<Budget>>;
  let organizationItemService: OrganizationItemService<Budget>;
  let messageService: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      declarations: [ToggleStatusComponent],

      providers: [
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
        {
          provide: OrganizationItemService,
          useClass: MockOrganizationItemService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleStatusComponent);
    component = fixture.componentInstance;
    component.i18nRoot = 'testRoot';
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('isDisabled', () => {
    it('should use disabled input', () => {
      component.disabled = true;
      expect(component.isDisabled({ orgUnit: { active: false } })).toBeTruthy();
    });

    it('should use falsy disabled input', () => {
      component.disabled = false;
      expect(component.isDisabled({ orgUnit: { active: true } })).toBeFalsy();
    });

    it('should use orgUnit.active instead of input', () => {
      component.disabled = undefined;
      expect(component.isDisabled({ orgUnit: { active: false } })).toBeTruthy();
    });

    it('should use unit.active instead of input', () => {
      component.disabled = undefined;
      expect(
        component.isDisabled({ unit: { active: false } } as any)
      ).toBeTruthy();
    });
  });

  describe('toggle inactive items', () => {
    beforeEach(() => {
      organizationItemService = TestBed.inject(OrganizationItemService);
      messageService = TestBed.inject(MessageService);
    });

    it('should enable inactive items right away', () => {
      spyOn(organizationItemService, 'update').and.returnValue(of());
      const mockItem = { code: 'b1', active: false };
      component.toggle(mockItem);
      expect(organizationItemService.update).toHaveBeenCalledWith(
        mockItem.code,
        {
          code: 'b1',
          active: true,
        }
      );
    });

    it('should only patch code and active flag', () => {
      spyOn(organizationItemService, 'update').and.returnValue(of());
      const mockItem = { code: 'b1', active: false, foo: 'bar' };
      component.toggle(mockItem);
      expect(organizationItemService.update).toHaveBeenCalledWith(
        mockItem.code,
        {
          code: 'b1',
          active: true,
        }
      );
    });

    it('should display confirmation for enabled item', () => {
      const mockItem = { code: 'b1', active: false };
      const updatedItem = { code: 'b1', active: true };
      spyOn(messageService, 'add').and.returnValue(new Subject());
      spyOn(organizationItemService, 'update').and.returnValue(
        of({ status: LoadStatus.SUCCESS, item: updatedItem })
      );
      component.toggle(mockItem);
      expect(messageService.add).toHaveBeenCalledWith({
        message: {
          key: 'testRoot.messages.confirmEnabled',
          params: { item: updatedItem },
        },
      });
    });
  });

  describe('toggle active items', () => {
    beforeEach(() => {
      organizationItemService = TestBed.inject(OrganizationItemService);
      messageService = TestBed.inject(MessageService);

      spyOn(organizationItemService, 'update').and.returnValue(of());
    });

    it('should not enable active items right away', () => {
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });

    it('should prompt a disable confirmation prompt', () => {
      spyOn(messageService, 'add').and.returnValue(new Subject());
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      expect(messageService.add).toHaveBeenCalledWith({
        message: { key: 'testRoot.messages.deactivate' },
        component: ConfirmationMessageComponent,
      });
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });

    it('should confirm disabling', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      spyOn(messageService, 'add').and.returnValue(eventData);
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      eventData.next({ confirm: true });
      expect(organizationItemService.update).toHaveBeenCalledWith(
        mockItem.code,
        {
          code: 'b2',
          active: false,
        }
      );
    });

    it('should display confirmation for disabled item', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      const mockItem = { code: 'b2', active: true };
      const updatedItem = { code: 'b1', active: false };
      spyOn(messageService, 'add').and.returnValue(eventData);
      organizationItemService.update = createSpy().and.returnValue(
        of({ status: LoadStatus.SUCCESS, item: updatedItem })
      );
      component.toggle(mockItem);
      eventData.next({ confirm: true });
      expect(messageService.add).toHaveBeenCalledWith({
        message: {
          key: 'testRoot.messages.confirmDisabled',
          params: { item: updatedItem },
        },
      });
    });

    it('should cancel disabling', () => {
      const eventData: Subject<ConfirmationMessageData> = new Subject();
      spyOn(messageService, 'add').and.returnValue(eventData);
      const mockItem = { code: 'b2', active: true };
      component.toggle(mockItem);
      eventData.next({ close: true });
      expect(organizationItemService.update).not.toHaveBeenCalled();
    });
  });
});
