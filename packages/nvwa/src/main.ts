const DICT = {}

// a = b * (s+(1+5/5))
export function compier(source: string): AST {
  const stack = []
  const tree: AST = {
    type: 'LeftValue',
    start: 0,
    end: 0
  }
  const len = source.length
  for (let i = 0; i < len; i++) {}

  return tree
}
