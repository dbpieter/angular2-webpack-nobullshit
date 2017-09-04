import 'core-js';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
declare var require: any

require('./styles/style.css');

platformBrowserDynamic().bootstrapModule(AppModule);
