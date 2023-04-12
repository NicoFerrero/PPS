import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AulaBPage } from './aula-b.page';

describe('AulaBPage', () => {
  let component: AulaBPage;
  let fixture: ComponentFixture<AulaBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaBPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AulaBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
