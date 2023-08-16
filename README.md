# Trinary
This is an in-development simulator for a computing system based on a balanced
ternary system, running on CNTFET based hardware. The simulator currently consists of an in-development CPU design with unit tests ensuring the correctness of the CPU operations, with a hardware layer being developed to run underneath.

Balanced ternary offers syntactic advantages over binary based systems which operate based on 2's-complement, giving equal storage capacity for negative and positive integers within a word as well as removing the need to specify signed vs. unsigned treatment of data.

Future plans for this simulator beyond the CPU include:
- Simple memory system interfacing with the DAU and PAU within the CPU
- An assembler for a ternary-specific assembly
- Benchmarking of the simulated system for comparison to binary-based systems
- A web app showing off the simulator and its capabilities

|||
|---------------------:|:----------------------------------------------|
| **Documentation**    | [![dev][docs-dev-img]][docs-dev-url]          |
| **Tests**            | [![gha ci][gha-ci-img]][gha-ci-url]           |
| **Code Coverage**    | [![codecov][codecov-img]][codecov-url]        |

[docs-dev-img]: https://img.shields.io/badge/docs-dev-blue.svg
[docs-dev-url]: https://espeer5.github.io/Trinary/

[gha-ci-img]: https://github.com/espeer5/Trinary/actions/workflows/test.yml/badge.svg
[gha-ci-url]: https://github.com/espeer5/Trinary/actions/workflows/test.yml

[codecov-img]: https://codecov.io/gh/espeer5/Trinary/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/espeer5/Trinary

Contributions are welcome! I recommend choosing an issue to work on if you're interested.