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

/*** start - helper code to create phases and counter-locking ***/

//helper code for phases

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

function CreateContent(story: Story, content: string): string {
  story.content[content] = content;
  return content;
}

interface Lock {
	var: VariableReference;
	lockFunction: StoryFunction;
	lockedCondition: StoryCondition;
}

let lockCount: number = 0;

function locks(lockingPages: Page[], pagesToLock: Page[]): Lock {
  lockCount += 1;
	let newVar = new VariableReference(VariableScope.shared, "locks", "lock" + lockCount);
  let newLock = {
		var: newVar,
		lockFunction: new StoryFunctionSet("lockLock" + lockCount, newVar, "true"),
		lockedCondition: new StoryConditionComparison(
            					"isLock" + lockCount + "Locked", 
            					ComparisonOperand.EQUAL,
           						newVar,
            					"true",
            					ComparisonType.Variable,
            					ComparisonType.String)
	}
	
	lockingPages.forEach(page => {
   		page.functions.push(newLock.lockFunction);
	});
  	
	//set each of the lockedPages to check the lock
	pagesToLock.forEach(page => {
   		page.conditions.push(newLock.lockedCondition);
	});
	
	return newLock;
}

let unlockCount: number = 0;

function unlocks(unlockingPages: Page[], pagesToUnlock: Page[]): Lock {
  unlockCount += 1;
	let newVar = new VariableReference(VariableScope.shared, "unlocks", "lock" + lockCount);
  let newLock = {
		var: newVar,
		lockFunction: new StoryFunctionSet("unlockLock" + lockCount, newVar, "true"),
		lockedCondition: new StoryConditionComparison(
            					"isLock" + lockCount + "Unlocked", 
            					ComparisonOperand.EQUAL,
           						newVar,
            					"true",
            					ComparisonType.Variable,
            					ComparisonType.String)
	}
	
	unlockingPages.forEach(page => {
   		page.functions.push(newLock.lockFunction);
	});
  	
	//set each of the lockedPages to check the lock
	pagesToUnlock.forEach(page => {
   		page.conditions.push(newLock.lockedCondition);
	});
	
	return newLock;
}

/*** end - helper code to create phases ***/

//story declaration
let story = new Story("The Ties That Bind");
story.author = "Callum Spawforth and David Millard";
story.schemaVersion = "";
story.publishDate = "1/7/2018";
story.publishState = PublishState.published;
story.audience = Audience.general;

//set up roles and functions to check for roles
let captorRole = new Role("Captor)")
story.roles.push(captorRole);
//let isCaptor = new StoryConditionIsRole("isCaptor", captorRole);

let prisonerRole = new Role("Prisoner)")
story.roles.push(prisonerRole);
//let isPrisoner = new StoryConditionIsRole("isPrisoner", prisonerRole);

// ********* INTRO - AND ROLE CHOICE *********


let chooseRoles = new Page({
    name: "Please Choose Your Role",
    contentRef: CreateContent(story, "Choose which role you would like to take in this story: Prisoner or Captor!"),
	  singleVisit: true,
    hint: new PageHint("Select your role in the story..."),
});
story.pages.push(chooseRoles);

//intro page for the captor
let chooseCaptor = new Page({
    name: "The Captor",
    contentRef: "Text introducing the captor...",
    singleVisit: true,
    hint: new PageHint("Choose to follow the captor")
});
//chooseCaptor.unlockedBy(chooseRoles);						***** WANT TO ADD THIS ****
story.pages.push(chooseCaptor);

//intro page for the prisoner
let choosePrisoner = new Page({
    name: "The Prisoner",
    contentRef: "Text introducing the prisoner...",
    singleVisit: true,
    hint: new PageHint("Choose to follow the prisoner")
});
//choosePrisoner.unlockedBy(chooseRoles);						***** WANT TO ADD THIS ****
story.pages.push(choosePrisoner);




// ********* ACT 1 - MORNING FOR THE CAPTOR / PRISONER *********

//create the structures for the captor and prisoner at the same time as they mirror one another
//we need two phases, as progress through the story is independent for each reader

let morningPhaseCaptor = CreatePhase("MorningPhaseCaptor");
chooseCaptor.functions.push(morningPhaseCaptor.enablePhaseFunction); //make sure its unlocked by the choose captor node

let morningPhasePrisoner = CreatePhase("MorningPhasePrisoner");
choosePrisoner.functions.push(morningPhasePrisoner.enablePhaseFunction); //make sure its unlocked by the choose prisoner node

//initial options - available throughout the morning
let whyHereCaptor = new Page({
    name: "For the Cause",
    contentRef: "Text explaining why the captor is doing this ...",
    hint: new PageHint("there is always a reason"),
    singleVisit: true,
});

let whyHerePrisoner = new Page({
    name: "For the Cause",
    contentRef: "Text explaining why the captor is doing this ...",
    hint: new PageHint("they always have a reason"),
    singleVisit: true
});



      					

//one-off pages - alternatives that close off options for the other reader
let offeringADrinkCaptor = new Page({
    name: "I offered him a drink",
    contentRef: "Text: captor helps the prisoner to take a drink",
    hint: new PageHint("He'll pass out in this heat"),
    singleVisit: true,
});
AddPagesToPhase([offeringADrinkCaptor], morningPhaseCaptor);

let forcingADrinkCaptor = new Page({
    name: "I forced him to drink",
    contentRef: "Text: captor forced the prisoner to take a drink",
    hint: new PageHint("I can't have him die on me"),
    singleVisit: true,
});
AddPagesToPhase([forcingADrinkCaptor], morningPhaseCaptor);

let offeringADrinkPrisoner = new Page({
    name: "He offered me a drink",
    contentRef: "Text: captor helps the prisoner to take a drink",
    hint: new PageHint("I'll pass out in this heat"),
    singleVisit: true,
});
AddPagesToPhase([offeringADrinkPrisoner], morningPhasePrisoner);

let forcingADrinkPrisoner = new Page({
    name: "He forced me to drink",
    contentRef: "Text: captor forced the prisoner to take a drink",
    hint: new PageHint("Is he worried that I'll die on him?"),
    singleVisit: true,
});
AddPagesToPhase([forcingADrinkPrisoner], morningPhasePrisoner);

locks([offeringADrinkCaptor, offeringADrinkPrisoner], 
		[forcingADrinkCaptor, forcingADrinkPrisoner] );
		
locks([forcingADrinkCaptor, forcingADrinkPrisoner],
		[offeringADrinkCaptor, offeringADrinkPrisoner] ); 



//transition node - moves the story onwards to the afternoon (same for both roles)
let moveToAfternoon = new Page({
    name: "Noon",
    contentRef: "Text explaining that time progresses to afternoon...",
    hint: new PageHint("Is it noon already?")
});



//add the pages to the relevant morning phase
AddPagesToPhase([whyHereCaptor, moveToAfternoon], morningPhaseCaptor);


//******** this line causes an error ******
//AddPagesToPhase([whyHerePrisoner, moveToAfternoon], morningPhasePrisoner);

//add the pages to the story
story.pages.push(whyHereCaptor, whyHerePrisoner, moveToAfternoon);




// ********* ACT 2 - AFTERNOON FOR THE CAPTOR / PRISONER *********

//create the structures for the captor and prisoner at the same time as they mirror one another

let afternoonPhaseCaptor = CreatePhase("AfternoonPhaseCaptor");
moveToAfternoon.functions.push(afternoonPhaseCaptor.enablePhaseFunction); //make sure its unlocked by the move to afternoon node

let afternoonPhasePrisoner = CreatePhase("AfternoonPhasePrisoner");
moveToAfternoon.functions.push(afternoonPhasePrisoner.enablePhaseFunction); //make sure its unlocked by the move to afternoon node




// ********* FLASHBACK - IN THE VAN *********


// output the JSON
let content = story.buildContent();
console.log(JSON.stringify(content, null, 2));
