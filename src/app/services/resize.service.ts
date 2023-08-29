import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { BREAKPOINT } from '../components/constants';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private screenWidthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth)

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  private onResize(){
    this.screenWidthSubject.next(window.innerWidth);
  }

  getScreenWidth(): Observable<number> {
    return this.screenWidthSubject.asObservable()
    .pipe(
      debounceTime(100),
      distinctUntilChanged()
    );
  }

  isScreenAboveBreakpoint(): boolean {
    return window.innerWidth > BREAKPOINT;
  }

}
