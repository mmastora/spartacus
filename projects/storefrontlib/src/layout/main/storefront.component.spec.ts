import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { MockFeatureDirective } from '../../shared/test/mock-feature-directive';
import { StorefrontComponent } from './storefront.component';

@Component({
  selector: 'cx-asm',
  template: '',
})
class MockAsmRootComponent {}
@Component({
  selector: 'cx-header',
  template: '',
})
class MockHeaderComponent {}

@Component({
  selector: 'cx-global-message',
  template: '',
})
class MockGlobalMessagerComponent {}

@Component({
  selector: 'cx-page-slot',
  template: '',
})
class DynamicSlotComponent {}

@Component({
  selector: 'cx-footer',
  template: '',
})
class MockFooterComponent {}

class MockRoutingService {
  isNavigating(): Observable<boolean> {
    return of();
  }
}

@Component({
  selector: 'cx-schema',
  template: '',
})
class MockSchemaComponent {}

@Component({
  selector: 'cx-page-layout',
  template: '',
})
class MockPageLayoutComponent {}

export class MockSVGInput implements SVGAnimatedString {
  animVal: string;
  baseVal: string;

  constructor(aniVal: string, basVal: string) {
    this.animVal = aniVal;
    this.baseVal = basVal;
  }
}

describe('StorefrontComponent', () => {
  let component: StorefrontComponent;
  let fixture: ComponentFixture<StorefrontComponent>;
  let el: DebugElement;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        StorefrontComponent,
        MockHeaderComponent,
        MockGlobalMessagerComponent,
        MockFooterComponent,
        DynamicSlotComponent,
        MockPageLayoutComponent,
        MockAsmRootComponent,
        MockFeatureDirective,
        MockSchemaComponent,
      ],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain start-navigating class', () => {
    spyOn(routingService, 'isNavigating').and.returnValue(of(true));
    fixture.detectChanges();
    expect(
      el.nativeElement.classList.contains('start-navigating')
    ).toBeTruthy();
  });

  it('should contain stop-navigating class', () => {
    spyOn(routingService, 'isNavigating').and.returnValue(of(false));
    fixture.detectChanges();
    expect(el.nativeElement.classList.contains('stop-navigating')).toBeTruthy();
    expect(el.nativeElement.classList.contains('start-navigating')).toBeFalsy();
  });

  it('should collapse menu when SVG element is input', () => {
    //Mock Input
    let svgDom: any = new MockSVGInput('is-expanded', 'is-expanded');
    let mockTarget = document.createElement('div') as HTMLDivElement;
    mockTarget['className'] = svgDom;

    var mockEvent: any = new Object();
    mockEvent['target'] = mockTarget;
    let mockInput: MouseEvent = mockEvent as MouseEvent;

    let expected: boolean = true;

    //Act
    component.collapseMenuIfClickOutside(mockInput);

    //Assert
    component.isExpanded$.subscribe((result) => (expected = result));
    expect(expected).toBeFalsy();
  });
});
