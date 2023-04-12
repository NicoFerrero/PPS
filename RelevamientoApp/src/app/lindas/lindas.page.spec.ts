import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LindasPage } from './lindas.page';

describe('LindasPage', () => {
  let component: LindasPage;
  let fixture: ComponentFixture<LindasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LindasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LindasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
