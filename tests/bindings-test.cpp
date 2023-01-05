#include "../binding/minisketchwrapper.cc"
#include "../minisketch/include/minisketch.h"
#include "gtest/gtest.h"
#include <string>


namespace {
  TEST(minisketchWrapper, pointer) {
    MinisketchWrapper sketch_a(64, 0, 5);
    MinisketchWrapper sketch_b(64, 0, 5);
    std::string s = "3635997626484733025";

    sketch_a.AddUint(s);
    s = "7971146234939396866";
    sketch_a.AddUint(s);
    s = "12458989319354851725";
    sketch_a.AddUint(s);

    size_t len = minisketch_serialized_size(sketch_a.sketch);

    unsigned char* buf = (unsigned char*) malloc(len);

    minisketch_serialize(sketch_a.sketch, buf);
    printf("\n");
    for(int i=0; i<len; i++){
      printf("%d %llu\n", i+1, (uint64_t) buf[i]);
    }

    sketch_a.Merge(sketch_b.This());
  }
}

int main(int argc, char**argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
