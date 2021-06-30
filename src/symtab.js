/*******************************************************************************
 * Copyright (c) 2013 Max Schaefer
 * Copyright (c) 2018 Persper Foundation
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

/* Simple implementation of symbol tables. */

function mangle(name) {
    return '$' + name;
}

function isMangled(name) {
    return name && name[0] === '$';
}

class Symtab {
    constructor(outer) {
        this.outer = outer;
        this.data = {};
    }

    get(name, deflt) {
        const mangled = mangle(name);
        if (!deflt || this.has(name)) {
            return this.data[mangled];
        }
        this.data[mangled] = deflt;
        return deflt;
    }

    has(name) {
        return mangle(name) in this.data || mangle(name) in this;
    }

    hasOwn(name) {
        return mangle(name) in this.data;
    }

    set(name, value) {
        if (!name) {
            console.log('WARNING: name is falsy for Symtab, check bindings.js.');
        }
        return this.data[mangle(name)] = value;
    }

    values() {
        const values = [];
        for (const p in this.data)
            if (isMangled(p)) {
                values[values.length] = this.data[p];
            }
        return values;
    }

}

exports.Symtab = Symtab;
