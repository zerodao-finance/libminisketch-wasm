#include "../binding/minisketchwrapper.cc"
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
    printf("%lld", std::stoull(s));
    sketch_a.Merge(sketch_b.This());
  }
}

int main(int argc, char**argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
