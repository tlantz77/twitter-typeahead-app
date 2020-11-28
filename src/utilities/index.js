const MENTION_REGEX = /@[A-z0-9]{2,}/g;

export const getCurrentWord = (text) => {
  const textArray = text.trim().split(' ');
  return textArray[textArray.length - 1];
}

export const getMentionByCursorPosition = (text, cursorPosition) => {
  const mentions = text.match(MENTION_REGEX);
  if (mentions) {
    for (let i = 0; i < mentions.length; i++) {
      const mentionStartIndex = text.indexOf(mentions[i]);
      const mentionEndIndex = mentionStartIndex + mentions[i].length;
      if (cursorPosition > mentionStartIndex && cursorPosition <= mentionEndIndex) {
        return mentions[i];
      }
    }
  }
  return null;
}

export const isValidMention = (text) => {
  return text == text.match(MENTION_REGEX);
}