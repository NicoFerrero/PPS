import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AulaAPage } from './aula-a.page';

describe('AulaAPage', () => {
  let component: AulaAPage;
  let fixture: ComponentFixture<AulaAPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaAPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AulaAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
