import {Story} from "./models/Story";
import {Role} from "./models/Role";
import {Page} from "./models/Page";
import {PublishState} from "./schema/PublishState";
import {PageHint} from "./models/PageHint";
import {VariableReference} from "./models/VariableReference";
import {VariableScope} from "./schema/VariableScopes";
import {StoryFunction, StoryFunctionSet} from "./models/StoryFunction";
import {StoryCondition, StoryConditionComparison} from "./models/StoryCondition";
import {ComparisonOperand, ComparisonType} from "./schema/ConditionSchema";
import {Audience} from "./schema/AudienceSchema";

interface Phase {
  var: VariableReference;
  enablePhaseFunction: StoryFunction;
  disablePhaseFunction: StoryFunction;
  phaseEnabledCondition: StoryCondition;
}

function CreatePhase(name: string, scope: VariableScope = VariableScope.shared): Phase {
  let newVar = new VariableReference(VariableScope.shared, "phases", name);
  return {
    var: newVar,
    enablePhaseFunction: new StoryFunctionSet("enablePhase" + name, newVar, "true"),
    disablePhaseFunction: new StoryFunctionSet("disablePhase" + name, newVar, "false"),
    phaseEnabledCondition: new StoryConditionComparison("inPhase" + name, ComparisonOperand.EQUAL, newVar, "true", ComparisonType.Variable, ComparisonType.String)
  }
}

function AddPagesToPhase(pages: Page[], phase: Phase): void {
  pages.forEach(page => {
    page.conditions.push(phase.phaseEnabledCondition);
  });
}

let story = new Story("The Ties That Bind");
story.author = "Callum Spawforth and David Millard";
story.schemaVersion = "";
story.publishDate = "1/7/2018";
story.publishState = PublishState.published;
story.audience = Audience.general;
story.roles.push(new Role("Captor"));
story.roles.push(new Role("Prisoner"));


//create the start and main phases for both roles (vars and funcs)
let varCaptorMainPhase = new VariableReference(VariableScope.shared, "Captor", "varCaptorMainPhase")
let setCaptorMainPhaseTrue = new StoryFunctionSet("setThing", varCaptorMainPhase, "true");
let setCaptorMainPhaseFalse = new StoryFunctionSet("setThing", varCaptorMainPhase, "false");

let varPrisonerMainPhase = new VariableReference(VariableScope.shared, "Prisoner", "varPrisonerMainPhase")
let setPrisonerMainPhaseTrue = new StoryFunctionSet("setThing", varPrisonerMainPhase, "true");
let setPrisonerMainPhaseFalse = new StoryFunctionSet("setThing", varPrisonerMainPhase, "false");

let testPhase = CreatePhase("TestPhase");

//create the initial page to choose roles
let chooseRoles = new Page({
    name: "Please Choose Your Role",
    contentRef: "Choose which role you would like to take in this story: Prisoner or Captor!",
    hint: new PageHint("Select your role in the story..."),
    functions: [testPhase.enablePhaseFunction]
});
story.pages.push(chooseRoles);



//let varPrisonerMainPhase = new VariableReference(VariableScope.shared, "Captor", "varCaptorMainPhase")

story.content["TestContent"] = "bananas";

let page1 = new Page({
    name: "Test Page 1",
    contentRef: "TestContent",
    hint: new PageHint("Go north")
});
story.pages.push(page1);

let page2 = new Page({
    name: "Test Page 2",
    contentRef: "TestContent",
    hint: new PageHint("Page2"),
    singleVisit: true
});
story.pages.push(page2);

AddPagesToPhase([page1, page2], testPhase);

let content = story.buildContent();

console.log(JSON.stringify(content, null, 2));
