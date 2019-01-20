import { Component } from '../component.js';

export class ErrorComponent extends Component{
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE, {}, {}, "../../templates/error.html");
    }

    init() {
        return false;
    }

    destroy() {

    }
}
