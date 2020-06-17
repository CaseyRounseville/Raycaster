#!/bin/bash

# make a note of the location of the resource base folder
RES_BASE_DIR=$PWD/res

# make note of the location of the "packed" folder
PACKED_DIR=$RES_BASE_DIR/packed

# make a note of the location of the scene converter tool
SCENECONVERTER_JS=$PWD/tool/SceneConverter.js

# convert all of the scenes in the subfolders of the specified folder into their
# appropriate block map json files, actors # jsons file, and entrances json
# files;
# note that each subfolder must be a resource folder, and contain an index.json
# file
#
# arguments:
# $1 -- the path to a folder containing resource folders
convertScenes() {
	local containingFolder
	containingFolder=$1

	# convert the scenes in each resource folder contained inside the
	# containing folder
	for resFolder in $containingFolder/*
	do
		local containingFolderBaseName
		containingFolderBaseName=$(basename $containingFolder)

		# if none of the files in the resource folder have changed, then we do
		# not need to convert anything
		local anyFileChanged
		anyFileChanged=false

		local resFolderBaseName
		resFolderBaseName=$(basename $resFolder)

		for resFile in $resFolder/*
		do
			if [ $resFile -nt $PACKED_DIR/${resFolderBaseName}.json ]
			then
				anyFileChanged=true
				break
			fi
		done

		if [ $anyFileChanged = false ]
		then
			echo $containingFolderBaseName/$resFolderBaseName is unchanged
			return
		else
			echo $containingFolderBaseName/$resFolderBaseName has changed and needs to be rebuilt
		fi

		# we might need to convert some scenes, however this is not necessarily
		# the case since the files changed might not be related to any scene;
		# we will just convert it anyway to avoid a more detailed check
		node $SCENECONVERTER_JS $resFolder
	done
}

# convert any scenes in the loose resource groups
convertScenes $RES_BASE_DIR/loose

# convert any scenes in the scene resource groups
convertScenes $RES_BASE_DIR/scene

# convert any scenes in the actor resource groups
convertScenes $RES_BASE_DIR/actor
