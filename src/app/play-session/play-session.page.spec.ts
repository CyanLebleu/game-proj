import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaySessionPage } from './play-session.page';

describe('PlaySessionPage', () => {
  let component: PlaySessionPage;
  let fixture: ComponentFixture<PlaySessionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlaySessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
