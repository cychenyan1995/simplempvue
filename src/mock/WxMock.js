var __request = wx.request;
var Mock = require("mockjs");
Object.defineProperty(wx, "request", { writable: true });
wx.request = function(config) {
  // debugger
  if (typeof Mock._mocked[config.url] == "undefined") {
    __request(config);
    return
  }
  var resTemplate = Mock._mocked[config.url].template;
  var response = Mock.mock(resTemplate);
  if (!response.status && typeof config.fail == "function") {
    config.fail(response)
  }
  if (response.status && typeof config.success == "function") {
    config.success(response)
  }
  if (typeof config.complete == "function") {
    config.complete(response)
  }
};
module.exports = Mock;
