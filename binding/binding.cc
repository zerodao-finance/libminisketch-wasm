#include <emscripten/val.h>
#include <emscripten/bind.h>
#include <string>
#include <vector>
#include "minisketchwrapper.cc"

using namespace emscripten;


EMSCRIPTEN_BINDINGS(MinisketchWrapper) {
  class_<MinisketchWrapper>("MinisketchWrapper")
    .constructor<int, int, int>()
    .function("addUint", &MinisketchWrapper::AddUint)
    .function("serialize", &MinisketchWrapper::Serialize)
    .function("destroySerialized", &MinisketchWrapper::DestroySerialized)
    .function("deserialize", &MinisketchWrapper::Deserialize)
    .function("merge", &MinisketchWrapper::Merge, allow_raw_pointers())
    .function("getPointer", &MinisketchWrapper::This, allow_raw_pointers())
    .function("decode", &MinisketchWrapper::Decode)
    .function("destroy", &MinisketchWrapper::Destroy);
}
