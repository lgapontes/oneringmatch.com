import React from "react";

export const clone = (obj) => {
  let clone = Object.assign({},obj);
  return clone;
};

export const cloneArray = (array) => {
  let clone = Object.assign([], array);
  return clone;
};

export const cloneString = (str) => {
  return (' ' + str).slice(1);
};

export const mergeDictionaries = (obj1,obj2) => {
  return Object.assign({},obj1,obj2);
};

export const randomArray = (array,callback) => {
  let index = Math.floor(Math.random() * array.length);
  callback(array[index]);
};

export const isValid = (el) => {
  if (el === undefined) {
    return false;
  } else if (el === null) {
    return false;
  } else {
    return true;
  }
};

export const isNumeric = (str) => {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
};

export const isValidIndex = (value) => {
  if (value === undefined) {
    return false;
  } else if (value === null) {
    return false;
  } else {
    if (!isNaN(value) && !isNaN(parseInt(value))) {
      if (typeof value === "number") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

function rollSuccessDie(callback) {
  let rolledNumber = Math.floor(Math.random() * 6) + 1;
  let resultWas1or2or3 = false;
  if ( (rolledNumber === 1) || (rolledNumber === 2) || (rolledNumber === 3) ) {
    resultWas1or2or3 = true;
  }
  let elvenRune = false;
  if (rolledNumber === 6) {
    elvenRune = true;
  }

  callback({
    rolledNumber: rolledNumber,
    resultWas1or2or3: resultWas1or2or3,
    elvenRune: elvenRune,
  });
}

function rollFeatDie(callback) {
  let rolledNumber = Math.floor(Math.random() * 12) + 1;
  let runeOfGandalf = false;
  if (rolledNumber === 12) {
    runeOfGandalf = true;
  }

  let eyeOfSauron = false;
  if (rolledNumber === 11) {
    eyeOfSauron = true;
  }

  callback({
    rolledNumber: rolledNumber,
    runeOfGandalf: runeOfGandalf,
    eyeOfSauron: eyeOfSauron,
  });
}

export const getCurrentStats = (character,callback) => {
  let miserable = false;
  if (isValid(character.current_stats.miserable)) {
    if (character.current_stats.miserable) {
      miserable = true;
    }
  }

  let weary = false;
  if (isValid(character.current_stats.weary)) {
    if (character.current_stats.weary) {
      weary = true;
    }
  }

  let shadowEqualsMaxHope = false;
  if (
    isValid(character.current_stats.shadow) &&
    isValid(character.current_stats.shadow_scars) &&
    isValid(character.attributes.hope) &&
    isNumeric(character.current_stats.shadow) &&
    isNumeric(character.current_stats.shadow_scars) &&
    isNumeric(character.attributes.hope)
  ) {
    if ( (character.current_stats.shadow + character.current_stats.shadow_scars) >= character.attributes.hope ) {
      shadowEqualsMaxHope = true;
    }
  }

  callback(
    miserable,
    weary,
    shadowEqualsMaxHope
  );
};

export const innerRollDice = (weary,numberOfSuccessDice,callback) => {
  if (numberOfSuccessDice === 0) {
    callback([]);
  } else {
    let successDicesRolled = [];

    let numberOfSuccessDiceArray = [...Array(numberOfSuccessDice).keys()];
    numberOfSuccessDiceArray.map((entry, index) => {
      rollSuccessDie(successDie=>{
        if (weary && successDie.resultWas1or2or3) {
          successDie.successDie = 0;
        }
        successDicesRolled.push(successDie);

        if (index == (numberOfSuccessDiceArray.length - 1)) {
          callback(successDicesRolled);
        }
      });
    });
  }
};

export const rollDice = (adversary,miserable,weary,piercingBlowLimit,shadowEqualsMaxHope,favoured,illFavored,numberOfSuccessDice,target,callback) => {
  let totalRolled = 0;
  let success = false;
  let piercingBlow = false;
  let featDicesRolled = [];

  /* Number of feat dice rolled */
  let featDice = 1;

  if (shadowEqualsMaxHope) {
    illFavored = true;
    featDice = 2;

    if (favoured) {
      favoured = false;
      illFavored = false;
      featDice = 1;
    }
  }

  /* Roll feat dices */
  let featDiceArray = [...Array(featDice).keys()];
  featDiceArray.map((featDiceEntry, featDiceindex) => {
    rollFeatDie((featDie)=>{
      featDicesRolled.push(featDie);

      if (featDiceindex == (featDiceArray.length - 1)) {
        /* Feat dices rolled */
        let selectedFeatDie = {
          rolledNumber: 0,
          runeOfGandalf: false,
          eyeOfSauron: false,
        };

        if (favoured) {
          let greaterValue = Math.max(...featDicesRolled.map(entry=>entry.rolledNumber));
          let indexGreaterValue = featDicesRolled.findIndex(entry=>entry.rolledNumber === greaterValue);
          indexGreaterValue = (indexGreaterValue < 0) ? 0 : indexGreaterValue;
          selectedFeatDie = featDicesRolled[indexGreaterValue];
        } else if (illFavored) {
          let lowerValue = Math.min(...featDicesRolled.map(entry=>entry.rolledNumber));
          let indexLowerValue = featDicesRolled.findIndex(entry=>entry.rolledNumber === lowerValue);
          indexLowerValue = (indexLowerValue < 0) ? 0 : indexLowerValue;
          selectedFeatDie = featDiceArray[indexLowerValue];
        } else if (featDicesRolled.length > 0) {
          selectedFeatDie = featDicesRolled[0];
        }

        if (!adversary && selectedFeatDie.runeOfGandalf) {
          success = true;
        }
        if (adversary && selectedFeatDie.eyeOfSauron) {
          success = true;
        }

        if (selectedFeatDie.rolledNumber >= piercingBlowLimit) {
          if (!adversary && !selectedFeatDie.eyeOfSauron) {
            piercingBlow = true;
          }
          if (adversary && !selectedFeatDie.runeOfGandalf) {
            piercingBlow = true;
          }
        }

        if (adversary && selectedFeatDie.runeOfGandalf) {
          selectedFeatDie.rolledNumber = 0;
        }
        if (!adversary && selectedFeatDie.eyeOfSauron) {
          selectedFeatDie.rolledNumber = 0;
        }

        totalRolled = totalRolled + selectedFeatDie.rolledNumber;

        innerRollDice(weary,numberOfSuccessDice,(successDicesRolled)=>{
          /* Roll success dice */
          let sumSuccessRolled = successDicesRolled.reduce((accumulator, entry) => accumulator + entry.rolledNumber, 0);
          totalRolled = totalRolled + sumSuccessRolled;

          if (totalRolled >= target) {
            success = true;
          }

          callback({
            totalRolled: totalRolled,
            success: success,
            piercingBlow: piercingBlow,
            featDicesRolled: featDicesRolled,
            successDicesRolled: successDicesRolled
          });
          /* Roll success dice */
        });

        /* Feat dices rolled */
      }
    });
  });
  /* Roll feat dices */
};

export const RULES = {
  'valour-rolls': (character,favoured,illFavored,callback) => {

  },
};
