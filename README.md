# libminisketch

WASM binaries, associated build scripts, and TypeScript bindings for libminisketch, for efficient set reconciliation within a JS runtime.

## Development

Clone repo along with submodules emsdk and libminisketch, ensure the presence of a build system, python, and autoconf on the system, then run `yarn build`

Build scripts are tested within a Linux bash runtime

```sh
git clone --recurse-submodules https://github.com/zerodao-finance/libminisketch
cd libminisketch
yarn build
```
