const expect = require('chai').expect;

const levenshteinDistance = require('../../src/string/levenshteinDistance');

describe('levenshtein distance', () => {
  it('should get levenshtein distance', () => {
    expect(levenshteinDistance('kitten', 'sitting')).to.equal(3);
  })

  it('should get levenshtein distance #2', () => {
    expect(levenshteinDistance('horse', 'ros')).to.equal(3);
  })

  it('should get levenshtein distance #3', () => {
    expect(levenshteinDistance('intention', 'execution')).to.equal(5);
  })
})