object Simplifier extends App {
  def simplify(expr: Expr): Expr = expr match {
    case UnOp("-", UnOp("-", e))  => e
    case BinOp("+", e, Number(0)) => e
    case BinOp("*", e, Number(1)) => e
    case _ => expr
  }

  println simplify(UnOp("-", UnOp("-", BinOp("+", Var("x"), Number(0)))))
}

