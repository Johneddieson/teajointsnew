import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmaterialsComponent } from './viewmaterials.component';

describe('ViewmaterialsComponent', () => {
  let component: ViewmaterialsComponent;
  let fixture: ComponentFixture<ViewmaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmaterialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewmaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
