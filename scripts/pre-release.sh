#!/usr/bin/env bash
# Script that updates compodocs
# Run from the release branch root
set -e

function cleanup {
    echo '--> Cleaning up spartacus workspace'
    delete_file docs.tar.gz
    delete_file docs.zip
    delete_file spartacussampledataaddon.1905.zip
    delete_file spartacussampledataaddon.1905.tar.gz
    delete_file spartacussampledata.2005.zip
    delete_file spartacussampledata.2005.tar.gz

    delete_dir coverage
    delete_dir dist
    delete_dir documentation
    delete_dir node_modules
}

function delete_file {
  if [ -a "$1" ]; then
    rm "$1"
  fi
}

function delete_dir {
  if [ -d "$1" ]; then
    rm -rf "$1"
  fi
}

function build_libs {
    echo '--> Building Spartacus libraries'
    yarn build:core:lib
}

function generate_docs {
    echo "--> Generating compodocs"
    yarn generate:docs

    echo "--> Getting dependencies again"
    yarn
}

function zipSamplesAddOn {
    echo "--> Generating Spartacus samples addon archives"
    delete_dir spartacussampledata
    git clone https://github.tools.sap/cx-commerce/spartacussampledata.git
    cd spartacussampledata
    git co release/1905/next
    git archive -o spartacussampledataaddon.1905.tar.gz HEAD
    mv spartacussampledataaddon.1905.tar.gz ../
    git archive -o spartacussampledataaddon.1905.zip HEAD
    mv spartacussampledataaddon.1905.zip ../
    git co release/2005/next
    git archive -o spartacussampledata.2005.tar.gz HEAD
    mv spartacussampledata.2005.tar.gz ../
    git archive -o spartacussampledata.2005.zip HEAD
    mv spartacussampledata.2005.zip ../
    cd ..
    delete_dir spartacussampledata
}

cleanup
zipSamplesAddOn
generate_docs
build_libs

echo "--> Pre-release tasks DONE."
