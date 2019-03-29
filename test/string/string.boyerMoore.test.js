const expect = require('chai').expect;
const {
  boyerMoore,
  buildPattern
} = require('../../src/string/boyerMoore');

describe('boyerMoore', () => {

  it('should find substring in a string', () => {
    expect(boyerMoore('HERE IS A SIMPLE EXAMPLE', 'EXAMPLE')).to.equal(17);
  });

  it('should build pattern for good suffix #1', () => {
    let pattern = buildPattern('EXAMPLE');
    expect(pattern.L, 'pattern.L').to.deep.equal([-1, -1, -1, -1, -1, -1, 0]);
    expect(pattern.H, 'pattern.H').to.deep.equal([0, 0, 0, 0, 0, 0, -1]);
    expect(pattern.goodSuffixOffset, 'pattern.goodSuffixOffset').to.deep.equal([6, 6, 6, 6, 6, 6, 6]);
  });

  it('should build pattern for good suffix #2', () => {
    let pattern = buildPattern('ABAB');
    expect(pattern.L, 'pattern.L').to.deep.equal([-1, -1, 1, 1]);
    expect(pattern.H, 'pattern.H').to.deep.equal([1, 1, -1, -1]);
  });

  it('should build pattern for good suffix #3', () => {
    let pattern = buildPattern('AAAA');
    expect(pattern.L, 'pattern.L').to.deep.equal([-1, -1, 1, 2]);
    expect(pattern.H, 'pattern.H').to.deep.equal([2, 1, 0, -1]);
  });

  it('should build pattern for good suffix #4', () => {
    let pattern = buildPattern('ABCD');
    expect(pattern.L, 'pattern.L').to.deep.equal([-1, -1, -1, -1]);
    expect(pattern.H, 'pattern.H').to.deep.equal([-1, -1, -1, -1]);
  });

  it('should build pattern for good suffix #4', () => {
    let pattern = buildPattern('AAAAAA');
    expect(pattern.L, 'pattern.L').to.deep.equal([-1, -1, -1, 2, 3, 4]);
    expect(pattern.H, 'pattern.H').to.deep.equal([4, 3, 2, 1, 0, -1]);
  });

  it('should build pattern for bad character #1', () => {
    let badCharacter = [{}, {
      "E": 0
    }, {
      "E": 0,
      "X": 1
    }, {
      "E": 0,
      "X": 1,
      "A": 2
    }, {
      "E": 0,
      "X": 1,
      "A": 2,
      "M": 3
    }, {
      "E": 0,
      "X": 1,
      "A": 2,
      "M": 3,
      "P": 4
    }, {
      "E": 0,
      "X": 1,
      "A": 2,
      "M": 3,
      "P": 4,
      "L": 5
    }];
    let pattern = buildPattern('EXAMPLE');
    expect(pattern.badCharacter, 'pattern.badCharacter').to.deep.equal(badCharacter);
  });

  it('should find substring in a string', () => {
    expect(boyerMoore('', '')).to.equal(0);
    expect(boyerMoore('a', '')).to.equal(0);
    expect(boyerMoore('a', 'a')).to.equal(0);
    expect(boyerMoore('ab', 'b')).to.equal(1);
    expect(boyerMoore('abcbcglx', 'abca')).to.equal(-1);
    expect(boyerMoore('abcbcglx', 'bcgl')).to.equal(3);
    expect(boyerMoore('abcxabcdabxabcdabcdabcy', 'abcdabcy')).to.equal(15);
    expect(boyerMoore('abcxabcdabxabcdabcdabcy', 'abcdabca')).to.equal(-1);
    expect(boyerMoore('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).to.equal(12);
    expect(boyerMoore('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).to.equal(11);
    expect(boyerMoore('^ !/\'#\'pp', ' !/\'#\'pp')).to.equal(1);
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

    expect(boyerMoore(text, 'Lorem')).to.equal(0);
    expect(boyerMoore(text, 'versions')).to.equal(549);
    expect(boyerMoore(text, 'versions of Lorem Ipsum.')).to.equal(549);
    expect(boyerMoore(text, 'versions of Lorem Ipsum:')).to.equal(-1);
    expect(boyerMoore(text, 'Lorem Ipsum passages, and more recently with')).to.equal(446);
  });
});