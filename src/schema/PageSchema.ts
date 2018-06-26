import {PageTransition} from "./PageTransition";
import {PageHintSchema} from "./PageHintSchema";
import {FunctionRefSchema} from "./FunctionSchema";
import {ConditionRefSchema} from "./ConditionSchema";

export interface PageSchema {
  id: string;
  name: string;
  contentRef: string;
  messageToObservers?: string;
  pageTransition: PageTransition;
  hint: PageHintSchema;
  functions: FunctionRefSchema[];
  conditions: ConditionRefSchema[];
}
