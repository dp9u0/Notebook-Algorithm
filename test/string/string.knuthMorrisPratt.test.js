const expect = require('chai').expect;
const {
  knuthMorrisPratt,
  buildPattern
} = require('../../src/string/knuthMorrisPratt');

describe('knuthMorrisPratt', () => {

  it('should build pattern', () => {
    expect(buildPattern('')).to.deep.equal([]);
    expect(buildPattern('abcdabcy'), 'buildPattern(abcdabcy)').to.deep.equal([0, 0, 0, 0, 1, 2, 3, 0]);
    expect(buildPattern('AABAAA'), 'buildPattern(AABAAA)').to.deep.equal([0, 1, 0, 1, 2, 2]);
    expect(buildPattern('EXAMPLE'), 'buildPattern(EXAMPLE)').to.deep.equal([0, 0, 0, 0, 0, 0, 1]);
  });

  it('should find substring in a string', () => {
    expect(knuthMorrisPratt('', '')).to.equal(0);
    expect(knuthMorrisPratt('a', '')).to.equal(0);
    expect(knuthMorrisPratt('a', 'a')).to.equal(0);
    expect(knuthMorrisPratt('ab', 'b')).to.equal(1);
    expect(knuthMorrisPratt('abcbcglx', 'abca')).to.equal(-1);
    expect(knuthMorrisPratt('abcbcglx', 'bcgl')).to.equal(3);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy')).to.equal(15);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca')).to.equal(-1);
    expect(knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).to.equal(12);
    expect(knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).to.equal(11);
    expect(knuthMorrisPratt('^ !/\'#\'pp', ' !/\'#\'pp')).to.equal(1);
  });

  it('should work with bigger texts', () => {
    const text = 'Lorem Ipsum is simply dummy text of the printing and ' +
      'typesetting industry. Lorem Ipsum has been the industry\'s standard ' +
      'dummy text ever since the 1500s, when an unknown printer took a ' +
      'galley of type and scrambled it to make a type specimen book. It ' +
      'has survived not only five centuries, but also the leap into ' +
      'electronic typesetting, remaining essentially unchanged. It was ' +
      'popularised in the 1960s with the release of Letraset sheets ' +
      'containing Lorem Ipsum passages, and more recently with desktop' +
      'publishing software like Aldus PageMaker including versions of Lorem ' +
      'Ipsum.';

    expect(knuthMorrisPratt(text, 'Lorem')).to.equal(0);
    expect(knuthMorrisPratt(text, 'versions')).to.equal(549);
    expect(knuthMorrisPratt(text, 'versions of Lorem Ipsum.')).to.equal(549);
    expect(knuthMorrisPratt(text, 'versions of Lorem Ipsum:')).to.equal(-1);
    expect(knuthMorrisPratt(text, 'Lorem Ipsum passages, and more recently with')).to.equal(446);
  });
});