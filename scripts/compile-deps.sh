#!/bin/bash
git submodule update --init --depth 1
./emsdk/emsdk install latest
./emsdk/emsdk activate latest
source ./emsdk/emsdk_env.sh
cd minisketch
autoconf
./autogen.sh
emconfigure ./configure
emmake make
