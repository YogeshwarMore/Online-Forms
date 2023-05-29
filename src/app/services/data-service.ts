import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class DataService {

    private sharedData: any;

    constructor() { }

    setSharedData(data: any) {
        this.sharedData = data;
    }

    getSharedData(): any {
        return this.sharedData;
    }

}