## CSV Regexp searcher

A simple JS script that parses a CSV file and returns all the elements containing the expressions passed as arguments.

Start by installing the dependencies using `npm i`. If that does not work, install [node & NPM](https://nodejs.org/en/download/) and try again.

Use as follows:
`node convert.js INPUT_FILE.csv EXPRESSION`

You can look for more one expression. The basic operator is OR. If an element contains more than one expression, it will be added again to the output file. 

Output files are placed in the same folder. The script outputs both JSON and TXT files for ease of use.

The script names each files using the arguments passed. 