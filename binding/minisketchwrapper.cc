#include <emscripten/val.h>
#include <emscripten/trace.h>
#include <string>
#include <vector>
#include "../minisketch/include/minisketch.h"

using namespace emscripten;
using namespace std;

class MinisketchWrapper {
public:
  minisketch *sketch;
  MinisketchWrapper(int field_size_, int implementation_number_, int capacity_) : field_size(field_size_), implementation_number(implementation_number_), capacity(capacity_) {
    sketch = minisketch_create(field_size_, implementation_number_, capacity_);
  }
  void Destroy() {
    minisketch_destroy(sketch);
  }
  void Create() {
    sketch = minisketch_create(field_size, implementation_number, capacity);
  }
  val Serialize() {
    size_t len = minisketch_serialized_size(sketch);
    if(last_serialized) free(last_serialized);
    last_serialized = (unsigned char*) 0;
    last_serialized = (unsigned char*) malloc(len);
    memset(last_serialized, 0, len);
    minisketch_serialize(sketch, last_serialized);
    return val(typed_memory_view(len, last_serialized));
  }

  int len() {
    return int(minisketch_serialized_size(sketch));
  }
  void Deserialize_Sketch(MinisketchWrapper *other) {
    size_t len = minisketch_serialized_size(other->sketch);
    unsigned char* buffer_a = (unsigned char*) malloc(len);
    minisketch_serialize(other->sketch, buffer_a);
    string s = string(reinterpret_cast<char*>(buffer_a), len);
    minisketch_deserialize(sketch, (unsigned char*) s.c_str());
    free(buffer_a);
  }
  void DestroySerialized() {
    if (last_serialized) free(last_serialized);
    last_serialized = (unsigned char *) 0;
  }
  void AddUint(string s) {
     unsigned long long i = stoull(s);
     minisketch_add_uint64(sketch, i);
  }
  void Deserialize(val serialized) {
    vector<unsigned char> v = vecFromJSArray<unsigned char>(serialized);
    unsigned char *a = &v[0];
    minisketch_deserialize(sketch, a);
  }
  void Merge(MinisketchWrapper *other_sketch) {
    minisketch_merge(sketch, other_sketch->sketch);
  }
  val Decode() {
    uint64_t *buffer = new uint64_t[capacity + 1];
    ssize_t num_differences = minisketch_decode(sketch, capacity, buffer);
    if(num_differences < 0) buffer[capacity] = uint64_t(capacity+1);
    else buffer[capacity] = uint64_t(num_differences);
    return val(typed_memory_view((capacity+1) * 8, (unsigned char *) buffer));
  }
  MinisketchWrapper *This() {
    return this;
  }
private:
  int field_size;
  int implementation_number;
  int capacity;
  unsigned char *last_serialized;
};
