import { Component } from '@angular/core';
import { LoaderService } from './../../../services/loader-service';

@Component({
    selector: 'loader-component',
    templateUrl: 'loader.component.html'
})
export class LoaderComponent{
    constructor(private loaderService: LoaderService){}
    ngOnInit() {
    }
    
}