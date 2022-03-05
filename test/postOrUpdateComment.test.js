"use strict";
exports.__esModule = true;
var comments_1 = require("./samples/comments");
var postOrUpdateComment_1 = require("../src/postOrUpdateComment");
var cliOutputs_1 = require("./samples/cliOutputs");
var hash_1 = require("../src/hash");
describe("postOrUpdateComment", function () {
  it("Creates the expected comment for a single site", function () {
    var comment = (0, postOrUpdateComment_1.getChannelDeploySuccessComment)(
      cliOutputs_1.channelSingleSiteSuccess,
      "fe211ff"
    );
    expect(comment).toEqual(comments_1.singleSiteComment);
  });
  it("Creates the expected comment for multisite", function () {
    var comment = (0, postOrUpdateComment_1.getChannelDeploySuccessComment)(
      cliOutputs_1.channelMultiSiteSuccess,
      "fe211ff"
    );
    expect(comment).toEqual(comments_1.multiSiteComment);
  });
  it("Can tell if a comment has been written by itself", function () {
    var signature = (0, hash_1.createDeploySignature)(
      cliOutputs_1.channelSingleSiteSuccess
    );
    var isCommentByBot = (0, postOrUpdateComment_1.createBotCommentIdentifier)(
      signature
    );
    var testComment = {
      user: { type: "Bot" },
      body: comments_1.singleSiteComment,
    };
    expect(isCommentByBot(testComment)).toEqual(true);
  });
  it("Can tell if a comment has not been written by itself", function () {
    var signature = (0, hash_1.createDeploySignature)(
      cliOutputs_1.channelMultiSiteSuccess
    );
    var isCommentByBot = (0, postOrUpdateComment_1.createBotCommentIdentifier)(
      signature
    );
    var testComment = {
      user: { type: "Bot" },
      body: comments_1.notABotComment,
    };
    expect(isCommentByBot(testComment)).toEqual(false);
  });
});
