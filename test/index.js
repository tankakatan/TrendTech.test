import { expect } from 'chai'
import intArrayToCompactString from '../index.js'

describe ('Int Array to Compact String', () => {

    it ('creates a compact string from an array of integer numbers', async () => {

        const tests = [
            [[], ''],
            [[1,1,1,1,1,1,1], '1-1'], // the task does not specify such cases
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
        ]

        await Promise.all (tests.map (([test, expected]) => intArrayToCompactString (test).then (actual =>
            expect (actual).to.equal (expected)
        )))

        return
    })
})
