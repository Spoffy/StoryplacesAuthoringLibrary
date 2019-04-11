import {Story} from "./models/Story";
import {Role} from "./models/Role";
import {Page} from "./models/Page";
import {PublishState} from "./schemas/multiplayer/PublishState";
import {PageHint} from "./models/PageHint";
import {VariableReference} from "./models/VariableReference";
import {VariableScope} from "./schemas/multiplayer/VariableScopes";
import {StoryFunctionSet} from "./models/StoryFunction";
import {Audience} from "./schemas/multiplayer/AudienceSchema";
import {StoryPlacesBuilder} from "./builders/StoryPlaces";
import {MultiplayerBuilder} from "./builders/Multiplayer";

let story = new Story("Test Story");
story.author = "Someone";
story.schemaVersion = "";
story.publishDate = "1/1/1111";
story.publishState = PublishState.published;
story.audience = Audience.general;

let role1 = new Role("Role1");
let role2 = new Role("Role2");
story.roles.push(role1, role2);

let setRole1Page = new Page({
    name: "Set Role 1",
    content: "Setting Role 1",
    hint: new PageHint("Set to role 1"),
    functions: [role1.getSetRoleFunction()]
});
story.pages.push(setRole1Page);

let setRole2Page = new Page({
    name: "Set Role 2",
    content: "Setting Role 2",
    hint: new PageHint("Set to role 2"),
    functions: [role2.getSetRoleFunction()]
});
story.pages.push(setRole2Page);

let var1 = new VariableReference(VariableScope.shared, "this", "magic");
let setFunc = new StoryFunctionSet("setThing", var1, "false");

let page1 = new Page({
    name: "Fayre St. Luke's Vicarage30",
    content: "TestContent",
    hint: new PageHint("Go north"),
    conditions: [role1.getIsRoleCondition()],
    functions: [setFunc]
});
story.pages.push(page1);

let page2 = new Page({
    name: "Page 2",
    content: "TestContent",
    hint: new PageHint("Page2"),
    functions: [setFunc],
    conditions: [role2.getIsRoleCondition()],
    singleVisit: true
});
story.pages.push(page2);

let builder = new MultiplayerBuilder();
let content = builder.build(story);

console.log(JSON.stringify(content, null, 2));