"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Story_1 = require("./models/Story");
var Role_1 = require("./models/Role");
var Page_1 = require("./models/Page");
var PublishState_1 = require("./schemas/multiplayer/PublishState");
var PageHint_1 = require("./models/PageHint");
var VariableReference_1 = require("./models/VariableReference");
var VariableScopes_1 = require("./schemas/multiplayer/VariableScopes");
var StoryFunction_1 = require("./models/StoryFunction");
var AudienceSchema_1 = require("./schemas/multiplayer/AudienceSchema");
var Multiplayer_1 = require("./builders/Multiplayer");
var story = new Story_1.Story("Test Story");
story.author = "Someone";
story.schemaVersion = "";
story.publishDate = "1/1/1111";
story.publishState = PublishState_1.PublishState.published;
story.audience = AudienceSchema_1.Audience.general;
story.roles.push(new Role_1.Role("Main"));
var var1 = new VariableReference_1.VariableReference(VariableScopes_1.VariableScope.shared, "this", "magic");
var setFunc = new StoryFunction_1.StoryFunctionSet("setThing", var1, "false");
var page1 = new Page_1.Page({
    name: "Test",
    content: "TestContent",
    hint: new PageHint_1.PageHint("Go north"),
    functions: [setFunc]
});
story.pages.push(page1);
var page2 = new Page_1.Page({
    name: "Page 2",
    content: "TestContent",
    hint: new PageHint_1.PageHint("Page2"),
    functions: [setFunc],
    singleVisit: true
});
story.pages.push(page2);
var builder = new Multiplayer_1.MultiplayerBuilder();
var content = builder.build(story);
console.log(JSON.stringify(content, null, 2));
//# sourceMappingURL=main.js.map