const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  // Test if the verification works well for a number
  it('should reject non-string values', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
  });

  // Test if the verification works well for spaces-only string
  it('should reject string with only spaces', () => {
    var res = isRealString('    ');
    expect(res).toBe(false);
  });

  // Test if the verification works well for correct string
  it('should allow string with non-space characters', () => {
    var res = isRealString('D');
    expect(res).toBe(true);
  });
});
