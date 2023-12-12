# Trinary
This is an in-development simulator for the arithmetic logic unit of a CPU operating in ternary (base 3). The ALU consists of logic circuits combined with input and output busses enabling the CPU to execute the logical and arithmetic operations of an assembly instruction set. In this case the ALU executes a ternary based instruction set which has different logical instructions than a binary assembly would.

Balanced ternary offers syntactic advantages over binary based systems which operate based on 2's-complement, giving equal storage capacity for negative and positive integers within a word as well as removing the need to specify signed vs. unsigned treatment of data.

Future plans for this simulator beyond the plain ALU and tests demonstrating its operation include:
 - A web app of some kind to showcase its capabilities (once I have time after the school term!)

|||
|---------------------:|:----------------------------------------------|
| **Documentation**    | [![dev][docs-dev-img]][docs-dev-url]          |
| **Tests**            | [![gha ci][gha-ci-img]][gha-ci-url]           |
| **Code Coverage**    | [![codecov][codecov-img]][codecov-url]        |
| **MIT License**      | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) |

[docs-dev-img]: https://img.shields.io/badge/docs-dev-blue.svg
[docs-dev-url]: https://espeer5.github.io/Trinary/

[gha-ci-img]: https://github.com/espeer5/Trinary/actions/workflows/test.yml/badge.svg
[gha-ci-url]: https://github.com/espeer5/Trinary/actions/workflows/test.yml

[codecov-img]: https://codecov.io/gh/espeer5/Trinary/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/espeer5/Trinary

Contributions are welcome! I recommend choosing an issue to work on if you're interested.
