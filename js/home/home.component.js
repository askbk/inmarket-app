import { Component } from '../component.js';
import { template } from './home.template.js';

export class HomeComponent extends Component {
    constructor(DEBUG_MODE) {
        super(DEBUG_MODE, {}, {}, undefined, template);
    }

    init() {
        if (this.DEBUG_MODE) {
            // console.log(this.page);
        }
        return true;
    }

    destroy() {}
}
