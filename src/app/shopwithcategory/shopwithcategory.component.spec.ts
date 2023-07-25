import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopwithcategoryComponent } from './shopwithcategory.component';

describe('ShopwithcategoryComponent', () => {
  let component: ShopwithcategoryComponent;
  let fixture: ComponentFixture<ShopwithcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopwithcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopwithcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
