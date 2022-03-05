"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
var cliOutputs_1 = require("./samples/cliOutputs");
var hash_1 = require("../src/hash");
describe("hash", function () {
  it("Returns stable signature for single site", function () {
    var signSingle = (0, hash_1.createDeploySignature)(
      cliOutputs_1.channelSingleSiteSuccess
    );
    expect(signSingle).toEqual("ca07ce2c831b1990b78fcf2ecdfe230a486dc973");
  });
  it("Returns stable signature for multi site", function () {
    var signMulti1 = (0, hash_1.createDeploySignature)(
      cliOutputs_1.channelMultiSiteSuccess
    );
    expect(signMulti1).toEqual("980f04126fb629deaadace7d6ee8a0628942e3d3");
    var signMulti2 = (0, hash_1.createDeploySignature)(
      __assign(__assign({}, cliOutputs_1.channelMultiSiteSuccess), {
        result: {
          targetX: cliOutputs_1.channelMultiSiteSuccess.result.target2,
          targetY: cliOutputs_1.channelMultiSiteSuccess.result.target1,
        },
      })
    );
    expect(signMulti2).toEqual("980f04126fb629deaadace7d6ee8a0628942e3d3");
  });
});
