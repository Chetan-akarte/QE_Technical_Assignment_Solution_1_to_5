const assert = require('assert')

const { add } = require('./index.js')

console.log("First test --");
const actual = add(5, 6)

const expection = 11

assert.equal(actual, expection)
console.log("End of First test --");
//assert.equal(actual, expection, 'The add function did not return 11 when adding 5 and 6')

//if (actual != expection) {

//throw new Error('The add function did not return 11 when adding 5 and 6')
//}

console.log("Second test -- Test that add function throws an error if no arguments are not passed .");

	assert.throws(()=>{
		add()
	})
console.log("Successfully run all tests !");
console.log("End of Second test --");