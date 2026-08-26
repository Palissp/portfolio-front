import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo')?.textContent).toContain('Marco Pérez');
  });

  it('should point the skip link at a focusable main', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const target = compiled.querySelector<HTMLElement>('.skip-link')?.getAttribute('href');
    expect(target).toBe('#top');
    expect(compiled.querySelector('main#top')?.getAttribute('tabindex')).toBe('-1');
  });

  it('should leave content visible when reduced motion is requested', () => {
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as unknown as MediaQueryList);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const lede = fixture.nativeElement.querySelector('.hero-lede') as HTMLElement;
    expect(lede.style.opacity).toBe('');
  });

  it('should render every project card', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.project-card').length).toBe(
      fixture.componentInstance.projects.length,
    );
  });
});
