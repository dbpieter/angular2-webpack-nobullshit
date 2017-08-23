import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';

import { AComponent } from './components/a.component';
import { BComponent } from './components/b.component';
import { CComponent } from './components/c.component';

import { CustomReuseStrategy } from './routing/customRouteReuseStrategy';
import { DialogPlaceHolder } from './dialog/dialogPlaceHolder.component';
import { DialogService } from './dialog/dialog.service';
import { TestDialog, AnotherDialog } from "./components/testDialog.component";

let routes: Routes = [{ path: '', component: AComponent },
{ path: 'a', component: AComponent },
{ path: 'b', component: BComponent },
{ path: 'c', component: CComponent },
  // { path: '**', component: NoContentComponent },
];



@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, AComponent, BComponent, CComponent, DialogPlaceHolder, TestDialog, AnotherDialog],
  bootstrap: [AppComponent],
  entryComponents: [TestDialog, AnotherDialog],

  providers: [
    DialogService,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ]
})
export class AppModule { }