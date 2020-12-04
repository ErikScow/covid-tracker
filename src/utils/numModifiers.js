export {
    abbreviateNum,
    commafyNum,
    removePlus
}

//takes a number and converts to abbreviated num string up to 10 billion (145.0B, 12.4M, 2.2K, etc.)
function abbreviateNum(t){
    const chars = t.toString()
        if (t>=1000){
            const firstChar = chars.slice(0,1)
            const secondChar = chars.slice(1,2)
            const thirdChar = chars.slice(2,3)
            const fourthChar = chars.slice(3,4)
            let numString = ''
            if (t < 10000){
                numString = firstChar + '.' + secondChar + 'K'
            } else if(t<100000){
                numString = firstChar + secondChar + '.' + thirdChar + 'K'
            } else if(t<1000000){
                numString = firstChar + secondChar + thirdChar + '.' + fourthChar + 'K'
            } else if(t<10000000){
                numString = firstChar + '.' + secondChar + 'M' 
            } else if(t<100000000){
                numString = firstChar + secondChar + '.' + thirdChar + 'M'
            } else if(t<1000000000){
                numString = firstChar + secondChar + thirdChar + '.' + fourthChar + 'M' 
            } else if(t<10000000000){
                numString = firstChar + '.' + secondChar + 'B'
            }
            return numString
        } else {
            return chars
        }
}

function commafyNum(num){
    if (num === null){
        return null
    } else {
        return num.toLocaleString()
    }
}


//takes a string in format "+{num}" and returns commafied num
function removePlus(str){
    if (str === null){
        return null
    } else {
        const trimmed = str.slice(1)
        const integer = parseInt(trimmed)
        return commafyNum(integer)
    }
}