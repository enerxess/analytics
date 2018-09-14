import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Angulartics2 } from 'angulartics2';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _trackingConsentOverlayActionObserver$: Subject<boolean>;

  constructor(private _angulartics2: Angulartics2) {
    this._trackingConsentOverlayActionObserver$ = new Subject<boolean>();
  }

  get trackingConsentOverlayActionObserver$(): Observable<boolean> {
    return this._trackingConsentOverlayActionObserver$.asObservable();
  }

  handleConsentChange(consent: boolean): void {
    this.enableTracking(consent);
    if (consent) {
      localStorage.setItem('tracking_consent', 'true');
    }
    this._trackingConsentOverlayActionObserver$.next(true);
  }

  enableTracking(state: boolean): void {
    this._angulartics2.settings.developerMode = !state;
  }
}
