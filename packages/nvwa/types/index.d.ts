
type ASTNode = 'PrioritySymbol' | 'RelationalSymbol' | 'LeftValue' | 'RightValue'

interface AST {
  type: ASTNode
  start: number
  end: number
  children?: AST[]
}