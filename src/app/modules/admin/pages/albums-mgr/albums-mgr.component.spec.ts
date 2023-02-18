import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsMgrComponent } from './albums-mgr.component';

describe('AlbumsMgrComponent', () => {
  let component: AlbumsMgrComponent;
  let fixture: ComponentFixture<AlbumsMgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsMgrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
