import { Component } from '../component.js';

export class ErrorComponent extends Component{
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE, {}, {}, undefined,
            `<article class="w3-content">
            <h3>404 - siden finnes ikke!</h3>
            </article>`
        );
    }

    init() {
        return false;
    }

    destroy() {

    }
}
