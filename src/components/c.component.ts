import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'c-component',
    template: `
     <h2>I am C</h2>
    `
})
export class CComponent implements OnInit {

    ngOnInit() {
        console.log('c init');
    }
}