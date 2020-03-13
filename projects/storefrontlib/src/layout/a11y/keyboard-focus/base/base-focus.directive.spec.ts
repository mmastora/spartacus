import { Component, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseFocusDirective } from './base-focus.directive';
import { BaseFocusService } from './base-focus.service';

// create custom mock to test extending from the abstract base
@Directive({
  selector: '[cxCustomFocus]',
})
class CustomFocusDirective extends BaseFocusDirective {}

@Component({
  selector: 'cx-host',
  template: `
    <div id="a" cxCustomFocus></div>
    <div id="b" tabindex="-1" cxCustomFocus></div>
    <div id="c" tabindex="0" cxCustomFocus></div>
    <div id="d" tabindex="5" cxCustomFocus></div>
    <button cxCustomFocus>button</button>
    <input cxCustomFocus />
    <a id="active" href="www.spartacus.com" cxCustomFocus>active link</a>
    <a id="inactive" cxCustomFocus>inactive link</a>
  `,
})
class MockComponent {}

class MockBaseFocusService {}

describe('BaseFocusDirective', () => {
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFocusDirective, MockComponent],
      providers: [
        {
          provide: BaseFocusService,
          useClass: MockBaseFocusService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);

    fixture.detectChanges();
  }));

  it('should default tabindex to -1', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#a'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('-1');
  });

  it('should keep tabindex -1 on the host component', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#b'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('-1');
  });

  it('should keep tabindex 0 on the host component', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#c'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('0');
  });

  it('should keep tabindex 5 on the host component', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('#d'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('5');
  });

  it('should not add tabindex to button element', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('button'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toBeFalsy();
  });

  it('should not add tabindex to input element', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toBeFalsy();
  });

  it('should not add tabindex to active anchor', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('a#active'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toBeFalsy();
  });

  it('should add tabindex to inactive anchor ', () => {
    const el: HTMLElement = fixture.debugElement.query(By.css('a#inactive'))
      .nativeElement;
    expect(el.getAttribute('tabindex')).toEqual('-1');
  });
});
