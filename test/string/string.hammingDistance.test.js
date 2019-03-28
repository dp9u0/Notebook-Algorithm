const expect = require('chai').expect;
const hammingDistance = require('../../src/string/hammingDistance');

describe('Hamming Distance', () => {
  it('should have hamming distance', () => {
    expect(hammingDistance('', '')).to.equal(0);
    expect(hammingDistance('', null)).to.equal(0);
    expect(hammingDistance(null, '')).to.equal(0);
  })

  it('should have hamming distance #2', () => {
    expect(hammingDistance('abc', 'bcde')).to.equal(4);
  })

  it('should have hamming distance #3', () => {
    expect(hammingDistance('abce', 'bcde')).to.equal(3);
  })

})