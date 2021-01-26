type Sum = (x: number, y: number) => number;
const sum: Sum = (x, y) => x + y;

describe('blah', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
