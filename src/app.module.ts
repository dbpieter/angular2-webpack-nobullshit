import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';

import { AComponent } from './components/a.component';
import { BComponent } from './components/b.component';
import { CComponent } from './components/c.component';

import { CustomReuseStrategy } from './routing/customRouteReuseStrategy';
import { DialogPlaceHolder } from './dialog/dialogPlaceHolder.component';
import { DialogService } from './dialog/dialog.service';
import { TestDialog, AnotherDialog } from './components/testDialog.component';

@Component({
  selector: 'empty',
  template: '<h1></h1>',
})
class EmptyComponent { }

@Component({
  selector: 'empty',
  template: '<h1>Hello from page1</h1>',
})
class Page1Component { }

@Component({
  selector: 'empty',
  template: '<h1>Hello from page2</h1>',
})
class Page2Component { }




let routes: Routes = [{ path: '', redirectTo: 'a', pathMatch: 'full' },
{ path: 'a', component: AComponent },
{ path: 'b', component: BComponent },
{ path: 'c', component: CComponent },
{ path: 'testDialogPage1', component: Page1Component, outlet: 'dialogOutlet' },
{ path: 'testDialogPage2', component: Page2Component, outlet: 'dialogOutlet' }
  // { path: '**', component: NoContentComponent },
];



@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, AComponent, BComponent, CComponent,
    DialogPlaceHolder, TestDialog, AnotherDialog, EmptyComponent, Page1Component, Page2Component],
  bootstrap: [AppComponent],
  entryComponents: [TestDialog, AnotherDialog],

  providers: [
    DialogService,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ]
})
export class AppModule { }