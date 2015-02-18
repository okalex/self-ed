object Test extends App {
  val ae = Element.create(Array("this", "is", "an", "array"))
  val le = Element.create("This is just one line")
  val ue = Element.create('*', 3, 5)

  println("ae = \n"+ ae)
  println("\nle = \n"+ le)
  println("\nue = \n"+ ue)

  var e = ae above le
  println("\nae above le = \n"+ e)

  e = ae beside ue
  println("\nae beside ue = \n"+ e)
}
