import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FoodPreference } from '../../../../../models/preference.model'

@Component({
    selector: 'preference-form',
    templateUrl: 'preference-modal.component.html'
})

export class PreferenceModalComponent {
    constructor() { }

    ////////OUTPUTS////////

    @Output() prefObjectEvent = new EventEmitter();

    ////////INPUTS////////

    @Input() prefObject: FoodPreference;

    ////////EVENTS////////

    changeType() {
        this.nullValues();
    }

    ngOnInit() {
        this.nullObject();
    }

    ////////BUTTONS////////

    clickConfirm(prefTitle: string, prefType: string, val: any) {
        console.log(this.prefObject);
        this.prefObjectEvent.emit(this.prefObject);
        this.nullObject();
    }

    clickCancel() {
        this.nullObject();
    }

    ////////METHODS////////

    nullObject() {
        this.prefObject = {
            pref_title: '',
            pref_type: '',
            pref_values: []
        }
    }

    nullValues() {
        this.prefObject.pref_values = [];
    }
}