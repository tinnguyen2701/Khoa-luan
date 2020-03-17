/* eslint-disable */
const Student = require('../models/student');

async function commandExecute(strCommandParam) {
  var strCommand = strCommandParam;
  var isTrue = true;
  var resultCommand = [];

  function convertToCommandComplete(stringCommand) {
    var i = stringCommand.length;

    while (i > 0) {
      if (
        stringCommand[i] == '(' &&
        stringCommand[i - 1] == 'g' &&
        stringCommand[i - 2] == 'o' &&
        stringCommand[i - 3] == 'l' &&
        stringCommand[i - 4] == '.' &&
        stringCommand[i - 5] == 'e' &&
        stringCommand[i - 6] == 'l' &&
        stringCommand[i - 7] == 'o' &&
        stringCommand[i - 8] == 's' &&
        stringCommand[i - 9] == 'n' &&
        stringCommand[i - 10] == 'o' &&
        stringCommand[i - 11] == 'c'
      ) {
        var value = '';
        var j = i + 1;
        while (stringCommand[j] !== ')') {
          value += stringCommand[j];
          j++;
        }

        stringCommand =
          stringCommand.slice(0, i + value.length + 3) +
          ` resultCommand.push( ${value} ); ` +
          stringCommand.slice(i + value.length + 3);
      }
      i--;
    }
    return stringCommand;
  }

  strCommand = `
    try {
      ${convertToCommandComplete(strCommand)}
    } catch(err) {
      isTrue = false;
      resultCommand.push(err.message);
    }
  `;
  await eval('(async () => {' + strCommand + ' } )()');
  return { isTrue, resultCommand };
}
module.exports = commandExecute;
