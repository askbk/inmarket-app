import { Component } from './component.js';

export class HomeComponent extends Component {
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE, {}, {}, "../../templates/hjem.html")
    }

    init() {
        return true;
    }

    destroy() {}
}
