import {PageTransition} from "./PageTransition";
import {PageHint} from "./PageHint";
import {StoryFunctionRef} from "./StoryFunction";
import {StoryConditionRef} from "./StoryCondition";

export interface Page {
  id: string;
  name: string;
  contentRef: string;
  messageToObservers?: string;
  pageTransition: PageTransition;
  hint: PageHint;
  functions: [StoryFunctionRef];
  conditions: [StoryConditionRef];
}
