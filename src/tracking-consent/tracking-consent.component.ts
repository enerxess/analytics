import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from '../lib/config.service';
import { AnalyticsConfig } from '../lib/analytics.service';
import { fadeInAnimation } from '../lib/animations';

@Component({
  selector: 'exs-tracking-consent',
  templateUrl: './tracking-consent.component.html',
  styleUrls: ['./tracking-consent.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation]
})
export class TrackingConsentComponent {
  analyticsConfig$: Observable<Partial<AnalyticsConfig>>;

  constructor(private _configService: ConfigService) {
    this.analyticsConfig$ = this._configService.analyticsConfig$;
  }

  changeConsentState(consent: boolean): void {
    this._configService.handleConsentChange(consent);
  }
}
