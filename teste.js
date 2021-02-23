var txt = "avião balão pé lâmpada criança";

regexTxt = new RegExp("[aãàáäâèeéëêiìíïîoõòóöôuùúüûnñcç]",'gi');
console.log('Final Str: ', txt.replace(regexTxt, '.'));

console.log('Original Str: ', txt);