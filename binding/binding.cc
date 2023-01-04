#include <emscripten/val.h>
#include <emscripten/bind.h>
#include <string>
#include <vector>
#include "minisketchwrapper.cc"

using namespace emscripten;


EMSCRIPTEN_BINDINGS(MinisketchWrapper) {
  class_<MinisketchWrapper>("MinisketchWrapper")
    .constructor<int, int, int>()
    .function("create", &MinisketchWrapper::Create)
    .function("addUint", &MinisketchWrapper::AddUint, allow_raw_pointers())
    .function("serialize", &MinisketchWrapper::Serialize)
    .function("destroySerialized", &MinisketchWrapper::DestroySerialized)
    .function("deserialize", &MinisketchWrapper::Deserialize)
    .function("merge", &MinisketchWrapper::Merge, allow_raw_pointers())
    .function("getPointer", &MinisketchWrapper::This, allow_raw_pointers())
    .function("decode", &MinisketchWrapper::Decode)
    .function("len", &MinisketchWrapper::len)
    .function("destroy", &MinisketchWrapper::Destroy)
    .function("deserialize_pointer", &MinisketchWrapper::Deserialize_Sketch, allow_raw_pointers());
}
