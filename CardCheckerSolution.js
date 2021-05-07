// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:



const validateCred = (arr) => {
    const reversedArr = arr.reverse();
    //forming a new array where every other digit is doubled
    const doubledArr = reversedArr.map((item, index) => {
        if(index % 2 !== 0) {
            let double = item * 2;
            if(double > 9) {
                double = double -=9;
            }
            return double;
        } else {
            return item;
        }
    })
    //summing up everything
    const sum = doubledArr.reduce((item1, item2) => {
        return item1 + item2;
    });
    //reversing back the passed array in order not to cause bugs in later functions.
    arr.reverse();
    //checking whether a card is valid or not
    return sum % 10 === 0;
}

//console.log(validateCred(valid3));

const findInvalidCards = (arr) => {
    const invalidArr = arr.filter(item => {
      if(validateCred(item) === false) {
        return item.reverse();
      }
    })
    return invalidArr;
  }
  
  


const idInvalidCardCompanies = (arr) => {
    const companyArr = [];
  for (let i = 0; i < arr.length; i++) {
    switch (invalidBatch[i][0]) {
      case 3:
        if (companyArr.indexOf('Amex') === -1) {
            companyArr.push('Amex');
        }
        break
      case 4:
        if (companyArr.indexOf('Visa') === -1) {
            companyArr.push('Visa');
        }
        break
      case 5:
        if (companyArr.indexOf('Mastercard') === -1) {
            companyArr.push('Mastercard');
        }
        break
      case 6:
        if (companyArr.indexOf('Discover') === -1) {
          companies.push('Discover');
        }
        break
      default:
        console.log('Company is unknown');
    }
  }
  return companyArr; 
}

//console.log(idInvalidCardCompanies(findInvalidCards(batch)));

/* 
============================================================================================================================================================================
Here I made function that will convert invalid numbers into valid numbers. 
However, in reality it creates a new set of digits (thus a new card) and holds the first digit from the original array, hence the bank that issued the card remains the same.
I made 2 versions. One is for a simple array, another is for a nested array. 
============================================================================================================================================================================
*/

const fixACard = (array) => {
    //Checking if a card is invalid
    if (validateCred(array)) return arr;
    //Making a new array where our newly generated digits will be stored
    const newArr = [];
    //Replacing the first digit in the new array from the original one.
    newArr[0] = array[0];
    //I made do...while loop since I want to generate digits again and again untill our card validates to a true one
    do {
    for(i=1; i < array.length; i++) {
        let random = Math.floor(Math.random() * 10);
        newArr[i] = random;
        
    }
   } 
   // You could implement this logic by writing (!validateCred(newArr)) I guess. This means once validateCred returns true it is no longer equals to false which means It is false for a while loop and loop stops executing.
   while (validateCred(newArr) === false)
   return newArr;
}



//const fixed = fixACard(invalid3); //returns fixed card

//console.log(validateCred(fixed)); //returns true

// This one is pretty much the same, except I used Map iterator to go through all the nested arrays.
const fixACardNested = (nestedArray) => {
    const newArr = nestedArray.map(item => {
    const fixedArr = item;
    const firstDigit = item[0];
    fixedArr[0] = firstDigit;
    do {
    for(i=1; i < fixedArr.length; i++) {
        let random = Math.floor(Math.random() * 10);
        fixedArr[i] = random;
    }
   } while (validateCred(fixedArr) === false)
   
   
    return fixedArr;  
    });
    
    return newArr;
}


//const fixedArr = fixACardNested([invalid1, invalid2]); //returns nested array of fixed cards
//console.log(findInvalidCards(fixedArr)); // returns an empty array since there is no invalid cards
