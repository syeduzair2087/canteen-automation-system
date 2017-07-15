import { Component } from '@angular/core';

@Component({
    selector: 'container-component',
    templateUrl: 'container.component.html',
    styles:[`
    html.loading {
    background: #333 url('loading.gif') no-repeat 50% 50%;
    -webkit-transition: background-color 0;
    transition: background-color 0;
}

html.loading body {
    opacity: 0;
    -webkit-transition: opacity 0;
    transition: opacity 0;
}
    `]
})

export class ContainerComponent {
    constructor() { }
}