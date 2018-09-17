import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material';

import { AnalyticsConfig, AnalyticsService } from './analytics.service';
import { TrackingConsentComponent } from '../tracking-consent/tracking-consent.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, OverlayModule],
  declarations: [TrackingConsentComponent],
  entryComponents: [TrackingConsentComponent]
})
export class AnalyticsModule {
  constructor(private _analyticsService: AnalyticsService) {}

  static initialize(): ModuleWithProviders<AnalyticsModule> {
    return { ngModule: AnalyticsModule };
  }

  static withConfig(
    config: Partial<AnalyticsConfig>
  ): ModuleWithProviders<AnalyticsModule> {
    return {
      ngModule: AnalyticsModule,
      providers: [
        {
          provide: AnalyticsConfig,
          useValue: config
        }
      ]
    };
  }
}
