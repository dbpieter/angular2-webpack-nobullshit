import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
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
            <a [routerLink]=" ['./c'] " routerLinkActive="active">
                C-Component
            </a>
        </nav>
        <main>
          <router-outlet></router-outlet>
        </main>
    `
})
export class AppComponent { }