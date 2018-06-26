import {PageHint} from "./PageHint";
import {StoryFunctionRef} from "./StoryFunction";
import {StoryConditionRef} from "./StoryCondition";
import {PageTransition} from "../schema/PageTransition";

export class Page {
  id: string;
  name: string;
  contentRef: string;
  messageToObservers?: string;
  pageTransition: PageTransition;
  hint: PageHint;
  functions: [StoryFunctionRef];
  conditions: [StoryConditionRef];
}
