/**
 * 树遍历：
 * 1、深度遍历
 *    1.1、普通树
 *    1.2、二叉树
 *      1.2.1、中序遍历
 *      1.2.2、先序遍历
 *      1.2.3、后序遍历
 * 2、广度遍历
 */

type Key = string | number;
interface Tree {
  key: Key;
  children?: Tree[];
}

/**
 * 深度优先遍历树 depthFirstSearch
 * @param tree 树
 * @param keys 树keys
 * @returns
 */
export const dfsWithRecursion = (tree?: Tree, keys: Key[] = []): Key[] => {
  if (tree) keys.push(tree.key);
  if (tree.children) {
    tree.children.forEach((child: Tree) => dfsWithRecursion(child, keys));
  }
  return keys;
};

/**
 * 深度优先遍历树-循环 depthFirstSearch
 * @param tree 树
 * @returns
 */
export const dfsWithWhile = (tree: Tree): Key[] => {
  const keys: Key[] = [];

  if (tree) keys.push(tree.key);

  if (tree.children) {
    while (tree.children.length) {
      const item = tree.children.shift();
      keys.push(item.key);
      if (Array.isArray(item.children)) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          tree.children.unshift(item.children[i]);
        }
      }
    }
  }
  return keys;
};

/**
 * 广度优先遍历树 breadthFirstSearch
 * @param tree 树
 * @returns
 */
export const bfsWithWhile = (tree?: Tree): Key[] => {
  const keys: Key[] = [];

  if (tree) keys.push(tree.key);

  if (tree.children) {
    while (tree.children.length) {
      const item = tree.children.shift();
      keys.push(item.key);
      if (Array.isArray(item.children)) {
        for (let i = 0; i < item.children.length; i++) {
          tree.children.push(item.children[i]);
        }
      }
    }
  }
  return keys;
};
