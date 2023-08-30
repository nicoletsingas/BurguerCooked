import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ResizeService } from './resize.service';
import { BREAKPOINT } from '../components/constants';

describe('ResizeService', () => {
  let service: ResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it (' should emit the initial screen width', (done) => {
    let screenWidth: number | undefined;
    service.getScreenWidth().subscribe(width => {
      screenWidth = width;
      expect(screenWidth).toBe(window.innerWidth);
      done();
    });
  });

  it ('should emit screen width changes', fakeAsync(() => {
    let screenWidth: number | undefined;

    service.getScreenWidth().subscribe(width => {
      screenWidth = width;
    });

    window.dispatchEvent(new Event('resize'));
    tick(100);
    expect(screenWidth).toBe(window.innerWidth);
  }));

  it ('should return true if screen width is above breakpoint', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(BREAKPOINT + 1);
    const result = service.isScreenAboveBreakpoint();
    expect(result).toBeTrue();
  });

  it ('should return false if screen width is below or equal to breakpoint', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(BREAKPOINT);
    const result = service.isScreenAboveBreakpoint();
    expect(result).toBeFalse();
  });

});
