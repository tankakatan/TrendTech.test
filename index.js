export default function intArrayToCompactString (array) {

    return new Promise (resolve => {

        let prev, consecutive = 0, result = ''

        for (let int of array) {

            if (prev === undefined)
                result += int

            else if (int - prev <= 1)
                consecutive += 1

            else {
                result += (consecutive > 1 ? '-' : ',') + (consecutive > 0 ? prev + ',' : '') + int
                consecutive = 0
            }

            prev = int
        }

        if (consecutive > 0)
            result += (consecutive > 1 ? '-' : ',') + prev

        resolve (result)
    })
}
