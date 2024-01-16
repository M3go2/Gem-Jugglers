const { shouldBundle } = require("./script_shouldBundle")

describe("shouldBundle", () => {
    beforeEach(() => {
        jest.spyOn(process.stderr, "write").mockImplementation((_, cb) => cb());
        jest.spyOn(process, "exit").mockImplementation();
    });

    afterEach(() => {
        process.stderr.write.mockRestore();
        process.exit.mockRestore();
    });

    describe("when the script is empty", () => {
        let should;
        beforeEach(() => should = shouldBundle(""));

        it("has no bundling", () => {
            expect(should).toBe(false);
        });
    });

    describe("when the script exports only a function", () => {
        let should;
        beforeEach(() => should = shouldBundle("module.exports = () => {}"));

        it("has undefined shouldBundle", () => {
            expect(should).toBe(false);
        });
    });

    describe("when the script is invalid", () => {
        let should;
        beforeEach(() => {
            should = shouldBundle("not.valid.js")
        });

        it("has false bundling", () => {
            expect(should).toBe(false);
        });

        it("logs the error", () => {
            expect(process.stderr.write).toBeCalled()
        });
    });

    describe("when the script loads dependencies", () => {
        let should;
        beforeEach(() => {
            should = shouldBundle("require('tmp')")
        });

        it("does not log errors", () => {
            expect(process.stderr.write).not.toBeCalled()
        });
    });

    describe("when the script should be bundled", () => {
        let should;
        beforeEach(() => should = shouldBundle("module.exports.bundling = true"));

        it("shouldBundle", () => {
            expect(should).toBe(true);
        });
    });

    describe("when the uses ES Modules", () => {
        let should;
        beforeEach(() => should = shouldBundle("export const helloWorld = \"Hello world!\";"));

        it("does not bundle", () => {
            expect(should).toBe(false);
        });
    });
});
