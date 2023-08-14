# Generates test data
gen_tests: test/add_sub_test.csv

# Generates the addition/subtraction test cases
test/add_sub_test.csv: test/gen_add_sub_test.py
	python3 test/gen_add_sub_test.py

# Deletes all generated csv files of test data to regenerate
clean:
	rm -f test/add_sub_test.csv

#Formats all code in the source directory
pretty:
	npx prettier . --write