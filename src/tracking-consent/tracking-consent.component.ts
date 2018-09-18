import { Component, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';

import { ConfigService } from '../lib/config.service';
import { AnalyticsConfig } from '../lib/analytics.service';

@Component({
  selector: 'exs-tracking-consent',
  templateUrl: './tracking-consent.component.html',
  styleUrls: ['./tracking-consent.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s 2s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
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
