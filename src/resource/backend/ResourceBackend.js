import * as Keeper from "../../util/Keeper";

const MAX_RESOURCES = 64;

export const create = (loadResource, destroyResource) => {
  return {
    resourceKeeper: Keeper.create(64),
    loadResource,
    destroyResource
  };
};