#!/bin/bash

# make a note of the location of the resource base folder
RES_BASE_DIR=$PWD/res

# make note of the location of the "packed" folder
PACKED_DIR=$RES_BASE_DIR/packed

# make a note of the location of the scene converter tool
SCENECONVERTER_JS=$PWD/tool/SceneConverter.js

# make note of the location of the resource packer tool
RESPACKER_JS=$PWD/tool/ResPacker.js

# enumerate all known resource folders, as absolute paths
RES_FOLDERS=()
RES_FOLDERS+=($RES_BASE_DIR/loose/*)
RES_FOLDERS+=($RES_BASE_DIR/scene/*)
RES_FOLDERS+=($RES_BASE_DIR/actor/*)

# maintain a list of all resource folders which need to be rebuilt, by absolute
# path;
# these are parallel arrays
REBUILD_LIST_RES_FOLDER=()
REBUILD_LIST_PACKED_FILE=()

# return 1 if the resource needs to be rebuilt, or 0 if it does not
#
# arguments:
# $1 -- the absolute path to the packed resource file(might not exist)
# $2 -- the absolute path to the resource folder
#
# return code:
# 1 -- the resource needs to be rebuilt
# 0 -- the resource does not need to be rebuilt
needsRebuild() {
	local packedFile
	local resFolder
	packedFile=$1
	resFolder=$2

	# if the packed file does not exist, then we need to build it
	if [ ! -f $packedFile ]
	then
		return 1
	fi

	# if any file in the resource folder is newer than the packed file, then we
	# need to rebuild it
	for resFile in $resFolder/*
	do
		if [ $resFile -nt $packedFile ]
		then
			return 1
		fi
	done

	# we do not need to rebuild the resource
	return 0
}

# generate the rebuild list in the form of two parallel arrays
#
# no arguments
genRebuildList() {
	for resFolder in ${RES_FOLDERS[@]}
	do
		# determine the base name of the resource folder(the last name of the
		# path)
		resFolderBase=$(basename $resFolder)

		# determine the corresponding packed file in the packed directory, if
		# it exists, as an absolute path
		packedFile=$PACKED_DIR/${resFolderBase}.json

		# if the packed file does not exist, or if the packed file is older
		# than any file in the resource folder, then the resource need to be
		# rebuilt
		needsRebuild $packedFile $resFolder
		if [ $? -eq 1 ]
		then
			REBUILD_LIST_RES_FOLDER+=($resFolder)
			REBUILD_LIST_PACKED_FILE+=($packedFile)
		fi
	done
}

# print out the list of resources that need to be rebuilt
#
# no arguments
printRebuildList() {
	# make sure there actually are resources that need to be rebuilt
	if [ ${#REBUILD_LIST_RES_FOLDER[@]} -eq 0 ]
	then
		printf 'All resources up to date\n'
		return
	fi

	# determine the base name of the root resource folder(should be "res") and
	# the root packed folder(should be "packed")
	local rootResBase
	local rootPackedBase
	rootResBase=$(basename $RES_BASE_DIR)
	rootPackedBase=$(basename $PACKED_DIR)

	printf '%s\n' "Resources that need to be rebuilt:"
	for rebuildIndex in ${!REBUILD_LIST_RES_FOLDER[@]}
	do
		local resFolder
		local packedFile
		local resFolderBase
		local packedFileBase
		local containingFolderBase

		# get the current resource folder and packed file as absolute paths
		resFolder=${REBUILD_LIST_RES_FOLDER[$rebuildIndex]}
		packedFile=${REBUILD_LIST_PACKED_FILE[$rebuildIndex]}

		# get the base names of the resource folder and packed file
		resFolderBase=$(basename $resFolder)
		packedFileBase=$(basename $packedFile)

		# get the base name of the folder containing the resource folder
		containingFolderBase=$(basename $(dirname $resFolder))

		# display the resource
		printf '%-25s --> %-25s\n' \
				$rootResBase/$containingFolderBase/$resFolderBase \
				$rootResBase/$rootPackedBase/$packedFileBase
	done
}

# rebuild the resources that need to be rebuilt
#
# no arguments
rebuildResources() {
	# determine the base name of the root resource folder(should be "res") and
	# the root packed folder(should be "packed")
	local rootResBase
	local rootPackedBase
	rootResBase=$(basename $RES_BASE_DIR)
	rootPackedBase=$(basename $PACKED_DIR)

	for rebuildIndex in ${!REBUILD_LIST_RES_FOLDER[@]}
	do
		local resFolder
		local resFolderBase
		local containingFolderBase
		local packedFile
		resFolder=${REBUILD_LIST_RES_FOLDER[$rebuildIndex]}
		resFolderBase=$(basename $resFolder)
		containingFolderBase=$(basename $(dirname $resFolder))
		packedFile=${REBUILD_LIST_PACKED_FILE[$rebuildIndex]}

		printf 'Building resource %s\n' \
				$rootResBase/$containingFolderBase/$resFolderBase

		# convert any scenes in this resource folder
		printf '%-25s' "    Converting scenes"
		printf ' ... '
		node $SCENECONVERTER_JS $resFolder
		printf 'Done\n'

		# pack up the resource folder into the packed file
		printf '%-25s' "    Packing up"
		printf ' ... '
        node $RESPACKER_JS $resFolder $PACKED_DIR
		printf 'Done\n'
		printf '\n'
	done
}

# generate and display the rebuild list
genRebuildList
printRebuildList
printf '%s\n' ""

# rebuild the resources in the rebuild list
rebuildResources

# if this prints, everything finished
printf '%s\n' "All done"
