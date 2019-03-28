const expect = require('chai').expect;
const rabinKarp = require('../../src/string/rabinKarp');

describe('rabinKarp', () => {
  it('should find substring in a string', () => {
    expect(rabinKarp('', '')).to.equal(0);
    expect(rabinKarp('a', '')).to.equal(0);
    expect(rabinKarp('a', 'a')).to.equal(0);
    expect(rabinKarp('ab', 'b')).to.equal(1);
    expect(rabinKarp('abcbcglx', 'abca')).to.equal(-1);
    expect(rabinKarp('abcbcglx', 'bcgl')).to.equal(3);
    expect(rabinKarp('abcxabcdabxabcdabcdabcy', 'abcdabcy')).to.equal(15);
    expect(rabinKarp('abcxabcdabxabcdabcdabcy', 'abcdabca')).to.equal(-1);
    expect(rabinKarp('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).to.equal(12);
    expect(rabinKarp('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).to.equal(11);
    expect(rabinKarp('^ !/\'#\'pp', ' !/\'#\'pp')).to.equal(1);
  });

  it('should work with bigger texts', () => {
    const text = 'Lorem Ipsum is simply dummy text of the printing and '
    + 'typesetting industry. Lorem Ipsum has been the industry\'s standard '
    + 'dummy text ever since the 1500s, when an unknown printer took a '
    + 'galley of type and scrambled it to make a type specimen book. It '
    + 'has survived not only five centuries, but also the leap into '
    + 'electronic typesetting, remaining essentially unchanged. It was '
    + 'popularised in the 1960s with the release of Letraset sheets '
    + 'containing Lorem Ipsum passages, and more recently with desktop'
    + 'publishing software like Aldus PageMaker including versions of Lorem '
    + 'Ipsum.';

    expect(rabinKarp(text, 'Lorem')).to.equal(0);
    expect(rabinKarp(text, 'versions')).to.equal(549);
    expect(rabinKarp(text, 'versions of Lorem Ipsum.')).to.equal(549);
    expect(rabinKarp(text, 'versions of Lorem Ipsum:')).to.equal(-1);
    expect(rabinKarp(text, 'Lorem Ipsum passages, and more recently with')).to.equal(446);
  });

  it('should work with UTF symbols', () => {
    expect(rabinKarp('a\u{ffff}', '\u{ffff}')).to.equal(1);
    expect(rabinKarp('\u0000耀\u0000', '耀\u0000')).to.equal(1);
  });
});