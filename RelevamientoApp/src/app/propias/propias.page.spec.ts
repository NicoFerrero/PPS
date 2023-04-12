import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropiasPage } from './propias.page';

describe('PropiasPage', () => {
  let component: PropiasPage;
  let fixture: ComponentFixture<PropiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
