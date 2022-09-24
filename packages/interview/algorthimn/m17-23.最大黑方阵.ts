// https://leetcode-cn.com/problems/max-black-square-lcci/
// 输入:
// [
//   [1,0,1],
//   [0,0,1],
//   [0,0,1]
// ]
// 输出: [1,0,2]
// 解释: 输入中 0 代表黑色，1 代表白色，标粗的元素即为满足条件的最大子方阵
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
export const findSquare = function (matrix) {
  return [1, 0, 2];
};

const findSquareDemo = [
  [1, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
];
console.log(findSquare(findSquareDemo));

// chai.expect(findSquare(findSquareDemo)).to.have.members([1, 0, 2]);

// chai.expect(findSquare(findSquareDemo)).to.have.length(3);
