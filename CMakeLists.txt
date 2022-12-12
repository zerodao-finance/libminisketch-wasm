cmake_minimum_required(VERSION 2.8 FATAL_ERROR)

project(libminisketch-wasm)

set(CMAKE_CXX_STANDARD 14)
enable_language(C)
enable_language(CXX)

if(CMAKE_CXX_COMPILER_ID MATCHES GNU)
    set(CMAKE_CXX_FLAGS         "-Wall -Wno-unknown-pragmas -Wno-sign-compare -Woverloaded-virtual -Wwrite-strings -Wno-unused")
    set(CMAKE_CXX_FLAGS_DEBUG   "-O0 -g3")
    set(CMAKE_CXX_FLAGS_RELEASE "-O3")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fprofile-arcs -ftest-coverage")
endif()

include_directories(
    ${PROJECT_SOURCE_DIR}/binding
    )

add_library(
    libminisketch-wasm
    binding/binding.cc
    )

set(GOOGLETEST_ROOT tests/googletest/googletest CACHE STRING "Google Test source root")
set(GOOGLEMOCK_ROOT tests/googletest/googlemock CACHE STRING "Google Mock source root")

include_directories(
    ${PROJECT_SOURCE_DIR}/${GOOGLETEST_ROOT}
    ${PROJECT_SOURCE_DIR}/${GOOGLETEST_ROOT}/include
    ${PROJECT_SOURCE_DIR}/${GOOGLEMOCK_ROOT}
    ${PROJECT_SOURCE_DIR}/${GOOGLEMOCK_ROOT}/include
    )

set(GOOGLETEST_SOURCES
    ${PROJECT_SOURCE_DIR}/${GOOGLETEST_ROOT}/src/gtest-all.cc
    ${PROJECT_SOURCE_DIR}/${GOOGLETEST_ROOT}/src/gtest_main.cc
    ${PROJECT_SOURCE_DIR}/${GOOGLEMOCK_ROOT}/src/gmock-all.cc
    ${PROJECT_SOURCE_DIR}/${GOOGLEMOCK_ROOT}/src/gmock_main.cc
    )

foreach(_source ${GOOGLETEST_SOURCES})
    set_source_files_properties(${_source} PROPERTIES GENERATED 1)
endforeach()

add_library(googletest ${GOOGLETEST_SOURCES})

add_executable(
    bindings-test
    tests/bindings-test.cpp
    )

add_dependencies(bindings-test googletest)

target_link_libraries(
    bindings-test
    emscripten
    googletest
    libminisketch-wasm
    libminisketch
    pthread
    )

include(CTest)
enable_testing()

add_test(unit ${PROJECT_BINARY_DIR}/bindings-test)
