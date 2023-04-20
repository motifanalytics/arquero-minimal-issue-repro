import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArqComponent } from './arq.component';

describe('ArqComponent', () => {
  let component: ArqComponent;
  let fixture: ComponentFixture<ArqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
