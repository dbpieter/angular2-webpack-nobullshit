import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <dialog-placeholder></dialog-placeholder>
        <h1>It Works</h1>
        <nav>
            <br>
            <a [routerLink]=" ['./a'] " routerLinkActive="active">
                A-Component
            </a>
             <br>
            <a [routerLink]=" ['./b'] " routerLinkActive="active">
                B-Component
            </a>
            <br>

        </nav>
        <main>
          <router-outlet></router-outlet>
        </main>
    `
})
export class AppComponent { }