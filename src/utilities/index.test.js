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
      expect(isValidMention('@Aa')).toEqual(true);
    });
  
    it('should return true for string "@2pac"', () => {
      expect(isValidMention('@2pac')).toEqual(true);
    });
  
    it('should return true for string "@Twitter"', () => {
      expect(isValidMention('@Twitter')).toEqual(true);
    });

    it('should return true for string "@Sprout384729666', () => {
      expect(isValidMention('@Sprout384729666')).toEqual(true);
    });
  });

  describe('Invalid matches', () => {
    it('should return false for string "@A"', () => {
      expect(isValidMention('@A')).toEqual(false);
    });
  
    it('should return false for string "2pac"', () => {
      expect(isValidMention('2pac')).toEqual(false);
    });
  
    it('should return false for string "@@Twitter"', () => {
      expect(isValidMention('@@Twitter')).toEqual(false);
    });

    it('should return false for string "@Sp^&)#$(#"', () => {
      expect(isValidMention('@Sp^&)#$(#')).toEqual(false);
    });
  });

});