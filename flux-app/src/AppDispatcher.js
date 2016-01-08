/**
 * Created by chris on 2016-01-04.
 */

import {Dispatcher} from "flux";

function x() {
    const y = new Dispatcher();
    const z = {};
    for (var k in y) {
        z[k] = y[k];
    }
    z.dispatch = function (...options) {
        return y.dispatch(...options);
    };

    return z;
}

export default x();
