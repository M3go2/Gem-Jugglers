#!/usr/bin/env node
const fs = require("fs");
const { infiniteProxy, handleError } = require("./proxy_env");

let tmpConsole;

function withPatchedEnv(fn) {
    const tmpModule = module;
    const tmpRequire = require;
    tmpConsole = console;
    try {
        module = {};
        module.exports = exports = {};
        require = infiniteProxy();
        console = infiniteProxy();
        fn();
    } catch (e) {
        handleError(e);
    } finally {
        module = tmpModule;
        require = tmpRequire;
        console = tmpConsole;
    }
}

function shouldBundle(source) {
    let bundling;
    withPatchedEnv(() => {
        try {
            eval(source);
        } finally {
            bundling = module?.exports?.bundling || false;
        }
    });
    return bundling;
}
exports.shouldBundle = shouldBundle;

if (require.main === module) {
    const args = process.argv.slice(2);
    const scriptPath = args[0];

    if(scriptPath && fs.existsSync(scriptPath)) {
        const source = fs.readFileSync(args[0])?.toString();
        const bundling = shouldBundle(source);
        const serialized = JSON.stringify(bundling);
        console.log(serialized);
    }
    else {
        if (typeof scriptPath === 'undefined') {
            console.log("No script path parameter was passed");
        }
        else {
            console.log(`Could not find script '${scriptPath}'`);
        }
        process.exit(1);
    }
}
