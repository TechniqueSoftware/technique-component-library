"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importStar(require("./index"));
describe('clubOsTheme', function () {
    test('should match snapshot', function () {
        expect(index_1.default).toMatchSnapshot();
    });
});
describe('clubOsThemeConfig', function () {
    test('should match snapshot', function () {
        expect(index_1.clubOSThemeConfig).toMatchSnapshot();
    });
});
