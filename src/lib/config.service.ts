import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Angulartics2 } from 'angulartics2';
import { AnalyticsConfig } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _analyticsConfig$: BehaviorSubject<Partial<AnalyticsConfig>>;
  private _trackingConsentOverlayActionObserver$: Subject<boolean>;

  constructor(private _angulartics2: Angulartics2) {
    this._analyticsConfig$ = new BehaviorSubject<Partial<AnalyticsConfig>>({});
    this._trackingConsentOverlayActionObserver$ = new Subject<boolean>();
  }

  get analyticsConfig$(): Observable<Partial<AnalyticsConfig>> {
    return this._analyticsConfig$.asObservable();
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

  setAnalyticsConfig(config: Partial<AnalyticsConfig>): void {
    this._analyticsConfig$.next(config);
  }
}
