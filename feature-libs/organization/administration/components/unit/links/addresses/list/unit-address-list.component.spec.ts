import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OrganizationSubListTestingModule } from 'feature-libs/organization/administration/components/shared/organization-sub-list/organization-sub-list.testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { UnitAddressListComponent } from './unit-address-list.component';
import { UnitAddressListService } from './unit-address-list.service';

class MockUnitAddressListService {}

describe('UnitAddressListComponent', () => {
  let component: UnitAddressListComponent;
  let fixture: ComponentFixture<UnitAddressListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OrganizationSubListTestingModule,
        UrlTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: UnitAddressListService,
          useClass: MockUnitAddressListService,
        },
      ],
      declarations: [UnitAddressListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitAddressListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
