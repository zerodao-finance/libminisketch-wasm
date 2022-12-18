#include "../binding/minisketchwrapper.cc"
#include "gtest/gtest.h"


namespace {
  TEST(minisketchWrapper, pointer) {
    MinisketchWrapper sketch_a(64, 0, 5);
    MinisketchWrapper sketch_b(64, 0, 5);
    sketch_a.AddUint("78150502233724948716633184648902415126");
    sketch_a.Merge(sketch_b.This());
  }
}

int main(int argc, char**argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
