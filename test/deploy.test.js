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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var deploy_1 = require("../src/deploy");
var exec = require("@actions/exec");
var cliOutputs_1 = require("./samples/cliOutputs");
var baseChannelDeployConfig = {
  channelId: "my-channel",
  expires: undefined,
  projectId: "my-project",
};
var baseLiveDeployConfig = {
  projectId: "my-project",
};
function fakeExecFail(mainCommand, args, options) {
  var _a;
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_b) {
      (_a =
        options === null || options === void 0 ? void 0 : options.listeners) ===
        null || _a === void 0
        ? void 0
        : _a.stdout(
            Buffer.from(JSON.stringify(cliOutputs_1.channelError), "utf8")
          );
      throw new Error("I am an error");
    });
  });
}
function fakeExec(mainCommand, args, options) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function () {
    var isChannelDeploy, successOutput;
    return __generator(this, function (_c) {
      if (args.includes("--debug")) {
        return [
          2 /*return*/,
          (_a =
            options === null || options === void 0
              ? void 0
              : options.listeners) === null || _a === void 0
            ? void 0
            : _a.stdout(Buffer.from("I am a very long debug output", "utf8")),
        ];
      }
      isChannelDeploy = args[0] === "hosting:channel:deploy";
      if (args.includes("--target")) {
        successOutput = isChannelDeploy
          ? cliOutputs_1.channelMultiSiteSuccess
          : cliOutputs_1.liveDeployMultiSiteSuccess;
      } else {
        successOutput = isChannelDeploy
          ? cliOutputs_1.channelSingleSiteSuccess
          : cliOutputs_1.liveDeploySingleSiteSuccess;
      }
      (_b =
        options === null || options === void 0 ? void 0 : options.listeners) ===
        null || _b === void 0
        ? void 0
        : _b.stdout(Buffer.from(JSON.stringify(successOutput), "utf8"));
      return [2 /*return*/];
    });
  });
}
describe("deploy", function () {
  it("retries with the --debug flag on error", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var deployOutput, args, firstCallDeployFlags, secondCallDeployFlags;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            // @ts-ignore read-only property
            exec.exec = jest.fn(fakeExec).mockImplementationOnce(fakeExecFail);
            return [
              4 /*yield*/,
              (0, deploy_1.deployPreview)("my-file", baseChannelDeployConfig),
            ];
          case 1:
            deployOutput = _a.sent();
            expect(exec.exec).toBeCalledTimes(2);
            expect(deployOutput).toEqual(cliOutputs_1.channelError);
            args = exec.exec.mock.calls;
            firstCallDeployFlags = args[0][1];
            secondCallDeployFlags = args[1][1];
            expect(firstCallDeployFlags).toContain("--json");
            expect(secondCallDeployFlags).not.toContain("--json");
            expect(firstCallDeployFlags).not.toContain("--debug");
            expect(secondCallDeployFlags).toContain("--debug");
            return [2 /*return*/];
        }
      });
    });
  });
  describe("deploy to preview channel", function () {
    it("calls exec and interprets the output", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var deployOutput, args, deployFlags;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              // @ts-ignore read-only property
              exec.exec = jest.fn(fakeExec);
              return [
                4 /*yield*/,
                (0, deploy_1.deployPreview)("my-file", baseChannelDeployConfig),
              ];
            case 1:
              deployOutput = _a.sent();
              expect(exec.exec).toBeCalled();
              expect(deployOutput).toEqual(
                cliOutputs_1.channelSingleSiteSuccess
              );
              args = exec.exec.mock.calls;
              deployFlags = args[0][1];
              expect(deployFlags).toContain("hosting:channel:deploy");
              return [2 /*return*/];
          }
        });
      });
    });
    it("specifies a target when one is provided", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var config, args, deployFlags;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              // @ts-ignore read-only property
              exec.exec = jest.fn(fakeExec);
              config = __assign(__assign({}, baseChannelDeployConfig), {
                target: "my-second-site",
              });
              return [
                4 /*yield*/,
                (0, deploy_1.deployPreview)("my-file", config),
              ];
            case 1:
              _a.sent();
              args = exec.exec.mock.calls;
              deployFlags = args[0][1];
              expect(deployFlags).toContain("--only");
              expect(deployFlags).toContain("my-second-site");
              return [2 /*return*/];
          }
        });
      });
    });
  });
  describe("deploy to live channel", function () {
    it("calls exec and interprets the output", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var deployOutput, args, deployFlags;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              // @ts-ignore read-only property
              exec.exec = jest.fn(fakeExec);
              return [
                4 /*yield*/,
                (0, deploy_1.deployProductionSite)(
                  "my-file",
                  baseLiveDeployConfig
                ),
              ];
            case 1:
              deployOutput = _a.sent();
              expect(exec.exec).toBeCalled();
              expect(deployOutput).toEqual(
                cliOutputs_1.liveDeploySingleSiteSuccess
              );
              args = exec.exec.mock.calls;
              deployFlags = args[0][1];
              expect(deployFlags).toContain("deploy");
              expect(deployFlags).toContain("--only");
              expect(deployFlags).toContain("hosting");
              return [2 /*return*/];
          }
        });
      });
    });
  });
});
