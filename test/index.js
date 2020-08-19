import chai from 'chai'
import intArrayToCompactString from '../index.js'

describe ('Int Array to Compact String', () => {

    it ('creates a compact string from an array of integer numbers', async () => {

        const { MAX_SAFE_INTEGER } = Number
        const LARGE_ARRAY_SIZE = 1000000
        const largeJointArray = []
        const largeDisjointArray = []
        let largeDisjointArrayTestResult = ''

        for (let i = 0; i < LARGE_ARRAY_SIZE; i++) {
            largeJointArray.push (i)
            largeDisjointArray.push (i * 2)
            largeDisjointArrayTestResult += i && `,${ i * 2 }`
        }

        const tests = [
            [[], ''],
            [[0,1,2], '0-2'],
            [[1,1,1,1,1,1,1], '1-1'], // the task doesn't prohibit such cases, though the expected result is unspecified
            [[1,2,3,4,5,6,7,8], '1-8'],
            [[1,3,4,5,6,7,8], '1,3-8'],
            [[1,3,4,5,6,7,8,10,11,12], '1,3-8,10-12'],
            [[1,2,3], '1-3'],
            [[1,2], '1,2'],
            [[1,2,4], '1,2,4'],
            [[1,2,4,5,6], '1,2,4-6'],
            [[1,2,3,7,8,9,15,17,19,20,21], '1-3,7-9,15,17,19-21'],
            [[1,2,3,4,5,6,100,1091,1999,2000,2001,2002], '1-6,100,1091,1999-2002'],
            [[1], '1'],
            [[1,3,5,7,9,11], '1,3,5,7,9,11'],
            [[
                MAX_SAFE_INTEGER - 5,
                MAX_SAFE_INTEGER - 3,
                MAX_SAFE_INTEGER - 2,
                MAX_SAFE_INTEGER - 1,
                MAX_SAFE_INTEGER,
            ], `${ MAX_SAFE_INTEGER - 5 },${ MAX_SAFE_INTEGER - 3 }-${ MAX_SAFE_INTEGER }`],

            [largeJointArray, `0-${ LARGE_ARRAY_SIZE - 1 }`],
            [largeDisjointArray, largeDisjointArrayTestResult],
        ]

        await Promise.all (tests.map (([test, expected]) => intArrayToCompactString (test).then (actual =>
            chai.expect (actual).to.equal (expected)
        )))

    })
})
