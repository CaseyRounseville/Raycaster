#!/bin/bash

# make a note of the location of the resource base folder
RES_BASE_DIR=$PWD/res

# make note of the location of the resource packer tool
RESPACKER_JS=$PWD/tool/ResPacker.js

# make note of the location of the "packed" folder
PACKED_DIR=$RES_BASE_DIR/packed

# make a function to pack a resource group
# arguments:
# $1 -- folder containing subfolders that have index.json files
packResources() {
    local containingFolder
    containingFolder=$1

    # move into the containing folder of all the resource group folders
    cd $containingFolder

    # pack each resource group in the containing folder
    for folder in ./*
    do
        node $RESPACKER_JS $folder $PACKED_DIR
    done
}

# pack the loose resource groups
packResources $RES_BASE_DIR/loose

# pack the scene resource groups
packResources $RES_BASE_DIR/scene

# pack the actor resource groups
packResources $RES_BASE_DIR/actor
