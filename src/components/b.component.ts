import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'b-component',
    template: `
     <h2>I am B</h2>
    `
})
export class BComponent implements OnInit {

    ngOnInit() {
        console.log('b init'); 
    }
}