const infiniteProxy = () => {
    return new Proxy(function () {}, {
        get: (_, p) => {
            if (p === "toJSON") {
                return () => {
                    throw new Error(
                        "'required' resource might be used during script parsing"
                    );
                };
            } else {
                return infiniteProxy();
            }
        },
        apply: () => infiniteProxy(),
    });
};
module.exports.infiniteProxy = infiniteProxy;

module.exports.handleError = (e) => {
    const enc = new TextEncoder();
    process.stderr.write(enc.encode(e.toString()), () => {
        process.exit(1);
    });
};
