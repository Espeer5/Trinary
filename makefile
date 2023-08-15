# Generates test data
gen_tests: test/add_sub_test.csv test/shift_rot_test.csv test/fblock_test.csv

# Generates the addition/subtraction test cases
test/add_sub_test.csv: test/gen_add_sub_test.py
	python3 test/gen_add_sub_test.py

# Generates the shift/rotate test cases
test/shift_rot_test.csv: test/gen_shift_rot_test.py
	python3 test/gen_shift_rot_test.py

# Generates the fblock test cases
test/fblock_test.csv: test/gen_fblock_test.py
	python3 test/gen_fblock_test.py

# Deletes all generated csv files of test data to regenerate
clean:
	rm -f test/add_sub_test.csv
	rm -f test/shift_rot_test.csv
	rm -f test/fblock_test.csv

#Formats all code in the source directory
pretty:
	npx prettier . --write