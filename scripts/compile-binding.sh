#!/bin/bash
source ./emsdk/emsdk_env.sh
emcc -lembind -o build/libminisketch.js -Wl,--whole-archive  ./minisketch/.libs/libminisketch.a -Wl,--no-whole-archive ./binding/binding.cc
