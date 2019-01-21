import {Story} from "./models/Story";
import {Role} from "./models/Role";
import {Page} from "./models/Page";
import {PublishState} from "./schemas/multiplayer/PublishState";
import {PageHint} from "./models/PageHint";
import {VariableReference} from "./models/VariableReference";
import {VariableScope} from "./schemas/multiplayer/VariableScopes";
import {StoryFunctionSet} from "./models/StoryFunction";
import {Audience} from "./schemas/multiplayer/AudienceSchema";
import { MultiplayerBuilder } from "./builders/Multiplayer";

let story = new Story("Test Story");
story.author = "Someone";
story.schemaVersion = "";
story.publishDate = "1/1/1111";
story.publishState = PublishState.published;
story.audience = Audience.general;
story.roles.push(new Role("Main"));

let var1 = new VariableReference(VariableScope.shared, "this", "magic");
let setFunc = new StoryFunctionSet("setThing", var1, "false");
let page1 = new Page({
    name: "Test",
    content: "TestContent",
    hint: new PageHint("Go north"),
    functions: [setFunc]
});
story.pages.push(page1);

let page2 = new Page({
    name: "Page 2",
    content: "TestContent",
    hint: new PageHint("Page2"),
    functions: [setFunc],
    singleVisit: true
});
story.pages.push(page2);

let builder = new MultiplayerBuilder();
let content = builder.build(story);

console.log(JSON.stringify(content, null, 2));