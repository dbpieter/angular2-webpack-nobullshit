import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'a-component',
    template: `
     <h2>I am A</h2>
    `
})
export class AComponent implements OnInit {

    ngOnInit(){
        console.log('a init');
    }

}