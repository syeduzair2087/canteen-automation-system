import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class LoaderService {
    loader: boolean =  false;
    constructor(){}

    showLoader(){
        this.loader = true;
        $('<div class="backdropClass" ></div>').appendTo(document.body);
    }

    hideLoader(){
        this.loader = false;
        $('.backdropClass').remove();
    }
}