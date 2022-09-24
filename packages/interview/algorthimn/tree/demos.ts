import { dfsWithRecursion, dfsWithWhile, bfsWithWhile } from "./index";

const tree = {
  key: 100,
  children: [
    {
      key: 200,
      children: [
        {
          key: 300,
          children: [
            {
              key: 400,
            },
            {
              key: 401,
            },
            {
              key: 402,
            },
          ],
        },
        {
          key: 301,
          children: [
            {
              key: 403,
            },
            {
              key: 404,
            },
          ],
        },
      ],
    },
    {
      key: 201,
      children: [
        {
          key: 302,
          children: [
            {
              key: 405,
            },
          ],
        },
      ],
    },
  ],
};
const clone = (json) => JSON.parse(JSON.stringify(json));

// [100, 200, 300, 400, 401, 402, 301, 403, 404, 201, 302, 405];
console.log("深度遍历--递归：");
console.log(dfsWithRecursion(clone(tree)));

console.log("深度遍历--while循环：");
console.log(dfsWithWhile(clone(tree)));

// [100, 200, 201, 300, 301, 302, 400, 401, 402, 403, 404, 405];
console.log("广度遍历--while循环：");
console.log(bfsWithWhile(clone(tree)));
