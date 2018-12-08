import {Story} from "../models/Story";
import {findDependencies} from "../interfaces/Dependencies";
import {Page} from "../models/Page";
import {StoryFunction} from "../models/StoryFunction";
import {StorySchema} from "../schemas/core/StorySchema";
import {FunctionSchema} from "../schemas/core/FunctionSchema";

/*
=> Initial population
=> Build initial structure
=> Allow objects to populate structure
=> Verify final structure
=> Return
*/

namespace Schema.Builders {

    interface Identifiable {id: any}

    export class Core {
        public build(story: Story): StorySchema {
            let dependencies = findDependencies(story.pages);

            return {
                name: story.name,
                author: story.author,
                publishState: story.publishState,
                publishDate: story.publishDate,
                roles: story.roles.map(role => role.buildContent()),
                pages: story.pages.map(page => page.buildContent()),
                content: this.buildContentStore(story),
                functions: this.deduplicateItems(dependencies.functions).map(this.buildFunction),
                conditions: story.buildConditions(dependencies.conditions),
                cachedMediaIds: story.cachedMediaIds,
                locations: story.locations.map(location => location.buildContent()),
                tags: story.tags,
                pagesMapViewSettings: story.pagesMapViewSettings && this.pagesMapViewSettings.buildContent(),
                schemaVersion: story.schemaVersion,
                audience: story.audience
            }
        }

        public calculateReferenceForPageContent(page: Page) {
            return page.id;
        }

        public buildContentStore(story): {[index: string]: string} {
            let contentStore = {};
            story.pages.forEach(page => {
                contentStore[this.calculateReferenceForPageContent(page)] = page.content;
            });
            return contentStore;
        }

        public buildFunction(func: StoryFunction): FunctionSchema {

        }

        public deduplicateItems<ItemType extends Identifiable>(rawItems: ItemType[]): ItemType[] {
            return rawItems.reduce((processed: ItemType[], currentItem: ItemType) => {
                let itemProcessedWithSameId = processed.find(processedItem =>
                    processedItem.id == currentItem.id
                );

                //De-duplicate: Add function only if not already processed
                if(!itemProcessedWithSameId) {
                    processed.push(currentItem);
                //Throw error if the definitions differ.
                } else if(itemProcessedWithSameId != currentItem) {
                    throw new Error("Two items with id " + currentItem.id + " have different definitions.")
                }
                return processed;
            }, []);
        }
    }


}