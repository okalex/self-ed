object TestRational extends App {
  val a = new Rational(3, 8)
  val b = new Rational(1, 8)
  val c = new Rational(3)
  val d = new Rational(6, 2)

  println("a = "+ a)
  println("b = "+ b)
  println("c = "+ c)
  println("d = "+ d)
  println("a + b = "+ (a + b))
  println("a - b = "+ (a - b))
  println("a * b = "+ (a * b))
  println("a / b = "+ (a / b))
  println("a < b = "+ (a < b))
  println("max = "+ a.max(b))
  println("")

  println("a + 2 = "+ (a + 2))
  println("a - 2 = "+ (a - 2))
  println("a * 2 = "+ (a * 2))
  println("a / 2 = "+ (a / 2))
}
