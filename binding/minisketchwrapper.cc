#include <emscripten/val.h>
#include <string>
#include <vector>
#include "../minisketch/include/minisketch.h"

using namespace emscripten;

class MinisketchWrapper {
public:
  MinisketchWrapper(int field_size_, int implementation_number_, int capacity_) : field_size(field_size_), implementation_number(implementation_number_), capacity(capacity_) {
    sketch = minisketch_create(field_size_, implementation_number_, capacity_);
  }
  void Destroy() {
    minisketch_destroy(sketch);
  }
  val Serialize() {
    size_t len = minisketch_serialized_size(sketch);
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
    //minisketch_merge(sketch, other_sketch->sketch);
  }
  val Decode() {
    uint64_t *buffer = new uint64_t[capacity + 1];
    ssize_t num_differences = minisketch_decode(sketch, capacity, buffer);
    buffer[capacity] = uint64_t(num_differences);
    return val(typed_memory_view((capacity+1) * 8, (unsigned char *) buffer));
  }
  MinisketchWrapper *This() {
    return this;
  }
private:
  int field_size;
  int implementation_number;
  int capacity;
  minisketch *sketch;
  unsigned char *last_serialized;
};
