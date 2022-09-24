// https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/solution/zi-fu-chuan-de-pai-lie-by-leetcode-solut-hhvs/
// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]

// 限制：
// 1 <= s 的长度 <= 8
/**
 * @param {string} s
 * @return {string[]}
 */
export const permutation = function (s: string): string[] {
  let ans = [];

  for (const ch of s) {
    const tmp = new Set();
    for (const cur of ans) {
      for (let j = cur.length; j >= 0; j--) {
        tmp.add(cur.slice(0, j) + ch + cur.slice(j));
      }
    }
    ans = Array.from(tmp);
  }

  return ans;
};

// console.log(permutation("abc"));

// chai
//   .expect(permutation("abc"))
//   .to.have.members(["abc", "acb", "bac", "bca", "cab", "cba"]);

// chai.expect(permutation("abc")).to.have.length(6);
