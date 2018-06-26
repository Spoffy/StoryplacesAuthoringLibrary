import {PageHint} from "./PageHint";
import {StoryFunctionRef} from "./StoryFunction";
import {StoryConditionRef} from "./StoryCondition";
import {PageTransitionSchema} from "../schema/PageTransitionSchema";

export class Page {
  id: string;
  name: string;
  contentRef: string;
  messageToObservers?: string;
  pageTransition: PageTransitionSchema;
  hint: PageHint;
  functions: [StoryFunctionRef];
  conditions: [StoryConditionRef];
}
