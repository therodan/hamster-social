import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
    selector: 'app-page-error',
    styleUrls: ['page-error.component.scss'],
    templateUrl: 'page-error.component.html'
})
export class PageErrorComponent implements OnInit {
    year = '2017';

    constructor() {
        this.year = new Date().getFullYear().toString();
    }

    ngOnInit() {
    }
}
