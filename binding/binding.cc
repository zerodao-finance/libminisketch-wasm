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
  int GetFieldSize() { return field_size; }
  int GetImplementationNumber() { return implementation_number; }
  int GetCapacity() { return capacity; }
  void SetFieldSize(int field_size_) { field_size = field_size_; }
  void SetCapacity(int capacity_) { capacity = capacity_; }
  void SetImplementationNumber(int implementation_number_) { implementation_number = implementation_number_; }
  void Destroy() {
    minisketch_destroy(sketch);
  }
  val Serialize() {
    int len = minisketch_serialized_size(sketch);
    last_serialized = (unsigned char *) malloc(len);
    minisketch_serialize(sketch, last_serialized);
    return val(typed_memory_view(len, last_serialized));
  }
  void DestroySerialized() {
    if (last_serialized) free(last_serialized);
    last_serialized = (unsigned char *) 0;
  }
  void AddUint(unsigned long i) {
     minisketch_add_uint64(sketch, i);
  }
  void Deserialize(std::string serialized) {
    minisketch_deserialize(sketch, (unsigned char *) serialized.c_str());
  }
  void Merge(MinisketchWrapper *other_sketch) {
    minisketch_merge(sketch, other_sketch->sketch);
  }
  std::vector<unsigned long> decode(unsigned int max_elements) {
    unsigned long *buffer = new unsigned long[max_elements];
    std::vector<unsigned long> result_(buffer, buffer + max_elements);;
    minisketch_decode(sketch, max_elements, (uint64_t *) buffer);
    return result_;
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
    .function("addUint", &MinisketchWrapper::AddUint)
    .function("serialize", &MinisketchWrapper::Serialize)
    .function("destroySerialized", &MinisketchWrapper::DestroySerialized)
    .function("deserialize", &MinisketchWrapper::Deserialize)
    .function("merge", &Minisketch::Merge);
}
