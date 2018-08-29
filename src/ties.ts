import {Story} from "./models/Story";
import {Role} from "./models/Role";
import {Page} from "./models/Page";
import {PublishState} from "./schema/PublishState";
import {PageHint} from "./models/PageHint";
import {VariableReference} from "./models/VariableReference";
import {VariableScope} from "./schema/VariableScopes";
import {StoryFunction, StoryFunctionSet} from "./models/StoryFunction";
import {
    StoryCondition, StoryConditionCheck, StoryConditionComparison,
    StoryConditionLogical
} from "./models/StoryCondition";
import {ComparisonOperand, ComparisonType, LogicalOperand} from "./schema/ConditionSchema";
import {Audience} from "./schema/AudienceSchema";

/**
 * Extensions to base library for shorthand.
 * At some point, merge these back into the library
 */

class TiesStory extends Story {
    public NewPage(pageArgs): Page {
        let page = new Page(pageArgs);
        this.pages.push(page);
        return page;
    }
}

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

interface AlternativePages {
    pages: Page[],
    functions: StoryFunction[],
    conditions: StoryCondition[]
}

function alternativePages(pages: Page[], variable?: VariableReference, name?: string): AlternativePages {
    //Should be unique
    name = name || "[" + pages.map(page => page.id).join() + "]";
    variable = variable || new VariableReference(VariableScope.shared, "alternativePages", name);
    let alternativePages = {pages: [], functions: [], conditions: []};
    let isSetCondition = new StoryConditionCheck("Alternate Node Chosen for " + name, variable);

    pages.forEach(page => {
        alternativePages.pages.push(page);
        let lockOthersFunction = new StoryFunctionSet("Disable All But " + page.name + " for " + name, variable, page.id);
        let pageWasNotChosenCondition = new StoryConditionComparison(
            "Is " + page.name + " selected for " + name,
            ComparisonOperand.NOT_EQUAL,
            variable,
            page.id,
            ComparisonType.Variable,
            ComparisonType.String);

        //Node is unavailable if Alternate Node Choice has occurred && this page wasn't chosen - so invert using NAND.
        let isAvailableCondition = new StoryConditionLogical(
            "Is " + page.id + " available for alternate node " + name,
            LogicalOperand.NAND,
            [isSetCondition, pageWasNotChosenCondition]
        );


        alternativePages.functions.push(lockOthersFunction);
        alternativePages.conditions.push(isAvailableCondition);

        page.functions.push(lockOthersFunction);
        page.conditions.push(isAvailableCondition);
    });

    return alternativePages;
}

/*** end - helper code to create phases ***/

//story declaration
let story = new TiesStory("The Ties That Bind");
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


let chooseRoles = story.NewPage({
    name: "Please Choose Your Role",
    content: "Choose which role you would like to take in this story: Prisoner or Captor!",
    singleVisit: true,
    hint: new PageHint("Select your role in the story..."),
});

//intro page for the captor
let chooseCaptor = story.NewPage({
    name: "The Captor",
    content: "Text introducing the captor...",
    singleVisit: true,
    hint: new PageHint("Choose to follow the captor")
});

//intro page for the prisoner
let choosePrisoner = story.NewPage({
    name: "The Prisoner",
    content: "Text introducing the prisoner...",
    singleVisit: true,
    hint: new PageHint("Choose to follow the prisoner")
});

unlocks([chooseRoles], [chooseCaptor, choosePrisoner]);
alternativePages([chooseCaptor, choosePrisoner]);


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
    content: "Text explaining why the captor is doing this ...",
    hint: new PageHint("there is always a reason"),
    singleVisit: true,
});

let whyHerePrisoner = new Page({
    name: "For the Cause",
    content: "Text explaining why the captor is doing this ...",
    hint: new PageHint("they always have a reason"),
    singleVisit: true
});



      					

//one-off pages - alternatives that close off options for the other reader
let offeringADrinkCaptor = new Page({
    name: "I offered him a drink",
    content: "Text: captor helps the prisoner to take a drink",
    hint: new PageHint("He'll pass out in this heat"),
    singleVisit: true,
});
AddPagesToPhase([offeringADrinkCaptor], morningPhaseCaptor);

let forcingADrinkCaptor = new Page({
    name: "I forced him to drink",
    content: "Text: captor forced the prisoner to take a drink",
    hint: new PageHint("I can't have him die on me"),
    singleVisit: true,
});
AddPagesToPhase([forcingADrinkCaptor], morningPhaseCaptor);

let offeringADrinkPrisoner = new Page({
    name: "He offered me a drink",
    content: "Text: captor helps the prisoner to take a drink",
    hint: new PageHint("I'll pass out in this heat"),
    singleVisit: true,
});
AddPagesToPhase([offeringADrinkPrisoner], morningPhasePrisoner);

let forcingADrinkPrisoner = new Page({
    name: "He forced me to drink",
    content: "Text: captor forced the prisoner to take a drink",
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
    content: "Text explaining that time progresses to afternoon...",
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
