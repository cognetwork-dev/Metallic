function check(value) {
    return value;
}

function scope(script) {
    return script.replace(/location/g, '_$1');
    //.replace(/(this|globalThis|window|location)/g, 'check($1)';
}

export { scope, check };
