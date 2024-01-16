const _fs = require("fs");
const _path = require("path");

globalThis.__fs__realpath = _fs.realpathSync;
globalThis.__fs__stat = _fs.statSync;
globalThis.__fs__readFile = _fs.readFileSync;
globalThis.__fs__exists = _fs.existsSync;
globalThis.__path__parse = _path.parse;
globalThis.__path__resolve = _path.resolve;
globalThis.__path__join = _path.join;
globalThis.__path__dirname = _path.dirname;
globalThis.__path__extname = _path.extname;
globalThis.__path__isAbsolute = _path.isAbsolute;
globalThis.__path__normalize = _path.normalize;
globalThis.__path__sep = _path.sep;
globalThis.__path__basename = _path.basename;
globalThis.__path__relative = _path.relative;

if (require.main === module)
{
    require("./bundler.cjs")
        .bundle(process.argv[2])
        .then((output) => console.log(JSON.stringify(output)))
        .catch(e => {
            console.error(e);
            process.exit(1);
        });
}
