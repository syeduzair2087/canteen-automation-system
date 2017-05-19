import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


@Injectable()
export class ToastService {
    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) { 
        this.toastyConfig.theme = 'bootstrap';
    }

      showToast(toastTitle: string, toastMessage: string, toastType: string) {
        var toastOptions: ToastOptions = {
            title: toastTitle,
            msg: toastMessage,
            showClose: false,
            timeout: 4000,
            theme: 'default',
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        // if (toastType == 'success') {
        //     this.toastyService.success(toastOptions);
        // }

        // else if (toastType == 'error') {
        //     this.toastyService.error(toastOptions);
        // }

        // else if (toastType == 'warning') {
        //     this.toastyService.warning(toastOptions);
        // }

             switch (toastType) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
}