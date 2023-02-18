import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMgrComponent } from './carousel-mgr.component';

describe('CarouselMgrComponent', () => {
  let component: CarouselMgrComponent;
  let fixture: ComponentFixture<CarouselMgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselMgrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
