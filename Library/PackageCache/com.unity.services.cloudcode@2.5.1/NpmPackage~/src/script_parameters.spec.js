const { scriptParameters } = require("./script_parameters");

describe("scriptParameters", () => {
    beforeEach(() => {
        jest.spyOn(process.stderr, "write").mockImplementation((_, cb) => cb());
        jest.spyOn(process, "exit").mockImplementation();
    });

    afterEach(() => {
        process.stderr.write.mockRestore();
        process.exit.mockRestore();
    });

    describe("when the script is empty", () => {
        let parameters;
        beforeEach(() => (parameters = scriptParameters("")));

        it("has undefined parameters", () => {
            expect(parameters).toBeUndefined();
        });
    });

    describe("when the script exports only a function", () => {
        let parameters;
        beforeEach(
            () => (parameters = scriptParameters("module.exports = () => {}"))
        );

        it("has undefined parameters", () => {
            expect(parameters).toBeUndefined();
        });
    });

    describe("when the script is invalid", () => {
        let parameters;
        beforeEach(() => {
            parameters = scriptParameters("not.valid.js");
        });

        it("has undefined parameters", () => {
            expect(parameters).toBeUndefined();
        });

        it("logs the error", () => {
            expect(process.stderr.write).toBeCalled();
        });

        it("exits the app", () => {
            expect(process.exit).toBeCalledWith(1);
        });
    });

    describe("when the script loads dependencies", () => {
        beforeEach(() => {
            scriptParameters("require('tmp')");
        });

        it("does not log errors", () => {
            expect(process.stderr.write).not.toBeCalled();
        });
    });

    describe("when the script exports parameters", () => {
        let parameters;
        beforeEach(
            () => (parameters = scriptParameters("module.exports.params = {}"))
        );

        it("return those params", () => {
            expect(parameters).toMatchObject({});
        });
    });
});
