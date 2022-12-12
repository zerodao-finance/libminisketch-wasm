#include "../binding/binding.cc"
#include "gmock/gmock.h"
#include "gtest/gtest.h"

using ::testing::AtLeast;
using ::testing::WithArgs;
using ::testing::MockFunction;
using ::testing::Invoke;
using ::testing::InSequence;
using ::testing::Return;

namespace {
  TEST(MinisketchWrapper, pointer) {

  }
}

int main(int argc, char**argv) {
  ::testing::InitGoogleMock(&argc, argv);
  return RUN_ALL_TESTS();
}
