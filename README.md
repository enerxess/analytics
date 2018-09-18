# @enerxess/analytics

## Einrichtung

Um das @enerxess/analytics-Modul einzurichten, gibt es zwei Möglichkeiten.

## Statische Konfiguration

Bei einer statischen Konfiguration kann das Modul mit

`import { AnalyticsModule } from '@enerxess/analytics';`

importiert werden und anschließend im @NgModule({ imports: []}-Array mit

```
AnalyticsModule.withConfig({
      acceptLabel: 'Akzeptieren',
      consentDescription: '<strong>Happyness</strong>',
      privacyStrategy: 'optOut',
      rejectLabel: 'Tracking nicht erlauben'
    })
```

eingerichtet werden.

## Dynamische Konfiguration

Ist die Konfiguration nicht bei App-Start bekannt, kann das Modul auch mit

`AnalyticsModule.initialize()`

eingerichtet werden. Dann lässt sich später in einer Komponente über den bereitgestellten AnalyticsService

```
import { AnalyticsService } from '@enerxess/analytics';
...
constructor(private _analyticsService: AnalyticsService) {
  this._analyticsService.initializeAnalytics(...config...);
}
```

ein Konfigurationsobjekt übergeben.

## Unterstützung

Bei Fragen oder Anregungen: [dennis.herbers@enerxess.com](mailto:dennis.herbers@enerxess.com)
