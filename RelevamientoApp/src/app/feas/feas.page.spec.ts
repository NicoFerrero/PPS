import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeasPage } from './feas.page';

describe('FeasPage', () => {
  let component: FeasPage;
  let fixture: ComponentFixture<FeasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
