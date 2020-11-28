export const getCurrentWord = (text) => {
  const textArray = text.trim().split(' ');
  return textArray[textArray.length - 1];
}

export const isValidMention = (text) => {
  const mentionRegexPattern = /@[A-z0-9]{2,}/g;
  return text == text.match(mentionRegexPattern);
}