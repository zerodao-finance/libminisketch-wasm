#include <emscripten/val.h>
#include <emscripten/bind.h>
#include <string>
#include <vector>
#include "../minisketch/include/minisketch.h"

using namespace emscripten;

class MinisketchWrapper {
public:
  MinisketchWrapper(int field_size_, int implementation_number_, int capacity_) : field_size(field_size_), implementation_number(implementation_number_), capacity(capacity_) {
    sketch = minisketch_create(field_size_, implementation_number_, capacity_);
  }
  int getFieldSize() { return field_size; }
  int getImplementationNumber() { return implementation_number; }
  int getCapacity() { return capacity; }
  void setFieldSize(int field_size_) { field_size = field_size_; }
  void setCapacity(int capacity_) { capacity = capacity_; }
  void setImplementationNumber(int implementation_number_) { implementation_number = implementation_number_; }
  void destroy() {
    minisketch_destroy(sketch);
  }
  val serialize() {
    int len = minisketch_serialized_size(sketch);
    last_serialized = (unsigned char *) malloc(len);
    minisketch_serialize(sketch, last_serialized);
    return val(typed_memory_view(len, last_serialized));
  }
  void destroySerialized() {
    if (last_serialized) free(last_serialized);
    last_serialized = (unsigned char *) 0;
  }
  void addUint(unsigned long i) {
     minisketch_add_uint64(sketch, i);
  }
  void deserialize(unsigned char *serialized) {
    minisketch_deserialize(sketch, serialized);
  }
private:
  int field_size;
  int implementation_number;
  int capacity;
  minisketch *sketch;
  unsigned char *last_serialized;
};

EMSCRIPTEN_BINDINGS(MinisketchWrapper) {
  class_<MinisketchWrapper>("MinisketchWrapper")
    .constructor<int, int, int>()
    .function("addUint", &MinisketchWrapper::addUint)
    .function("serialize", &MinisketchWrapper::serialize)
    .function("destroySerialized", &MinisketchWrapper::destroySerialized);
}

//  .function("deserialize", &MinisketchWrapper::deserialize)
// .property("implementation_number", &MinisketchWrapper::getImplementationNumber, &MinisketchWrapper::setImplementationNumber)
//  .property("capacity", &MinisketchWrapper::getCapacity, &MinisketchWrapper::setCapacity)
