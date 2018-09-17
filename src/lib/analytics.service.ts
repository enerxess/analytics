import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { TrackingConsentComponent } from '../tracking-consent/tracking-consent.component';

export class AnalyticsConfig {
  acceptLabel = 'Akzeptieren';
  analyticsProviders: Array<string> = [];
  consentDescription = `Mit Besuch und Nutzung der Seite akzeptiere ich die <a href="#">
  <span class="mat-body-2">Datenschutzerklärung</span></a> und willige in die Verarbeitung
  meiner personenbezogenen Daten im Rahmen der Nutzung dieser Website sowie zum Setzen der
  erforderlichen Cookies ein.`;
  privacyStrategy = 'optIn';
  rejectLabel = 'Tracking nicht erlauben';
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private _analyticsConfig: Partial<AnalyticsConfig>;
  private _trackingConsentOverlayActionObserver$: Observable<boolean>;
  private _trackingConsentOverlayPortal: ComponentPortal<
    TrackingConsentComponent
  >;
  private _trackingConsentOverlayRef: OverlayRef;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    @Optional() private _config: AnalyticsConfig,
    private _overlay: Overlay,
    private _configService: ConfigService
  ) {
    this._trackingConsentOverlayActionObserver$ = this._configService.trackingConsentOverlayActionObserver$;
    if (this._config) {
      this._analyticsConfig = this._config;
      this.prepareTrackingConsentOverlay();
    }
  }

  private prepareTrackingConsentOverlay(): void {
    if (isPlatformBrowser(this._platformId)) {
      if (!localStorage.getItem('tracking_consent')) {
        this._configService.setAnalyticsConfig(this._analyticsConfig);
        this.showTrackingConsentOverlay();
      }
    }
  }

  initializeAnalytics(config: Partial<AnalyticsConfig>) {
    this._analyticsConfig = config;
    this._configService.enableTracking(
      this._analyticsConfig.privacyStrategy === 'optOut'
    );
    this.prepareTrackingConsentOverlay();
  }

  private showTrackingConsentOverlay(): void {
    this._trackingConsentOverlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .global()
        .bottom('32px')
        .left('32px'),
      maxWidth: 600,
      hasBackdrop: this._analyticsConfig.privacyStrategy === 'optIn'
    });

    this._trackingConsentOverlayPortal = new ComponentPortal(
      TrackingConsentComponent
    );
    this._trackingConsentOverlayRef.attach(this._trackingConsentOverlayPortal);

    this._trackingConsentOverlayActionObserver$.subscribe(() =>
      this._trackingConsentOverlayRef.dispose()
    );
  }
}
