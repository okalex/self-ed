def multiTable(): String = {
  val rows = for (i <- 1 to 10) yield {
    val els = for (j <- 1 to 10) yield {
      val prod = (i * j).toString
      val padding = " " * (6 - prod.length)
      padding + prod
    }
    els.mkString
  }
  rows.mkString("\n")
}

println(multiTable)
