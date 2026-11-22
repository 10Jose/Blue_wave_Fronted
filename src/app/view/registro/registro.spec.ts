import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resgistro } from './registro';

describe('Resgistro', () => {
  let component: Resgistro;
  let fixture: ComponentFixture<Resgistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resgistro],
    }).compileComponents();

    fixture = TestBed.createComponent(Resgistro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
