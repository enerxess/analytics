import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions
} from '@angular/material';
import { Observable } from 'rxjs';

import { ConfigService } from '../lib/config.service';
import { AnalyticsConfig } from '../lib/analytics.service';
import { fadeInAnimation } from '../lib/animations';

const globalRippleConfig: RippleGlobalOptions = { disabled: true };

@Component({
  selector: 'exs-tracking-consent',
  templateUrl: './tracking-consent.component.html',
  styleUrls: ['./tracking-consent.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }
  ],
  animations: [fadeInAnimation]
})
export class TrackingConsentComponent implements OnInit {
  analyticsConfig$: Observable<Partial<AnalyticsConfig>>;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    @Inject(DOCUMENT) private _document: any,
    private _renderer: Renderer2,
    private _configService: ConfigService
  ) {
    this.analyticsConfig$ = this._configService.analyticsConfig$;
  }

  ngOnInit(): void {
    this.appendFont();
  }

  private appendFont(): void {
    if (isPlatformBrowser(this._platformId)) {
      const roboto = this._renderer.createElement('link');
      roboto.href = 'https://fonts.googleapis.com/css?family=Roboto:400,500';
      roboto.rel = 'stylesheet';
      this._renderer.appendChild(this._document.head, roboto);
    }
  }

  changeConsentState(consent: boolean): void {
    this._configService.handleConsentChange(consent);
  }
}
