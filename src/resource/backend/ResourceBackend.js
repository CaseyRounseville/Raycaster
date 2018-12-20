/*
need to make a distinction between a resource and a group of resources
maybe have 2 functions:
  loadResource(resId)
  loadResourceGroup(resGroupId)
where loadResourceGroup calls loadResource for each resId in resGroup

and a resouce is just a blob of data
and a resource group is just and array of ids

or

a resource is an object of this format
res {
  type: string,
  blob: { data }
}
*/

/*
export const loadResource = (id) => {
  look up texIds, animIds, etc using resId
  loop through and call appropriate loaders
  add to list of loaded resources
  
  *** no file IO here, put that somewhere else(SRP) ***
}
*/

export function ResourceBackend() {
  this.idToRes = {};
}