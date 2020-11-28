import { getCurrentWord, isValidMention } from './';

describe('getCurrentWord', () => { 
  it('should return the text after the last space in string', () => {
    const text = 'I will have the last word';
    expect(getCurrentWord(text)).toEqual('word');
  });

  it('should return empty string if no text', () => {
    const text = '';
    expect(getCurrentWord(text)).toEqual('');
  });

  it('should return last word if trailing space', () => {
    const text = 'Got some trailing space ';
    expect(getCurrentWord(text)).toEqual('space');
  });
});

describe('isValidMention', () => {
  describe('Valid matches', () => {
    it('should return true for string "@Aa"', () => {
      expect(isValidMention('@Aa')).toBeTruthy;
    });
  
    it('should return true for string "@2pac"', () => {
      expect(isValidMention('@2pac')).toBeTruthy;
    });
  
    it('should return true for string "@Twitter"', () => {
      expect(isValidMention('@Twitter')).toBeTruthy;
    });

    it('should return true for string "@Sprout384729666', () => {
      expect(isValidMention('@Sprout384729666')).toBeTruthy;
    });
  });

  describe('Invalid matches', () => {
    it('should return false for string "@A"', () => {
      expect(isValidMention('@A')).toBeFalsy;
    });
  
    it('should return false for string "2pac"', () => {
      expect(isValidMention('2pac')).toBeFalsy;
    });
  
    it('should return false for string "@@Twitter"', () => {
      expect(isValidMention('@@Twitter')).toBeFalsy;
    });

    it('should return false for string "@Sp^&)#$(#"', () => {
      expect(isValidMention('@Sp^&)#$(#')).toBeFalsy;
    });
  });

});