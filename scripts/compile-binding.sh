#!/bin/bash
emcc -lembind -o build/libminisketch.js -Wl,--whole-archive  ./minisketch/.libs/libminisketch.a -Wl,--no-whole-archive ./binding/binding.cc
