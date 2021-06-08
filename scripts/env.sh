#!/bin/bash

IFS=$'\n'

if [[ -z "${DRONE}" ]]; then
    for TO_EXPORT in $(sed -e '/^#/d' .env)
    do
        export "$TO_EXPORT";
    done
else
    echo "### INFO: Running in Drone CI";
    echo ${DRONE_STAGE_MACHINE};
    echo ${INIT_CWD};
fi
