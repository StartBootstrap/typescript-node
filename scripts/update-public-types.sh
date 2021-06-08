#!/bin/bash

export FRONT_END_BE_TYPES_PATH=../sb-frontend/src/app/sb-backend-types
export FRONT_END_NODE_MODULES_PATH=../sb-frontend/node_modules

# rm -rf $FRONT_END_BE_TYPES_PATH
mkdir -p $FRONT_END_BE_TYPES_PATH
cp -r src/public-types/* $FRONT_END_BE_TYPES_PATH

rm -rf $FRONT_END_NODE_MODULES_PATH/.prisma
cp -r node_modules/.prisma $FRONT_END_NODE_MODULES_PATH/.prisma
