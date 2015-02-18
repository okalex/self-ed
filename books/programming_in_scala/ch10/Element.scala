abstract class Element {

  def contents: Array[String]
  def height: Int = contents.length

  def width: Int = {
    if (contents.length == 0) {
      0
    } else {
      var max = 0
      for (line <- contents) {
        if (line.length > max) {
          max = line.length
        }
      }
      max
    }
  }

  def widen(w: Int): Element = {
    val lines = for (line <- contents)
      yield line + (" " * (w - line.length))
    Element.create(lines)
  }

  def heighten(h: Int): Element = {
    if (h <= height) this
    else {
      val bottom = Element.create(' ', width, h - height)
      this above bottom
    }
  }

  def above(that: Element): Element = {
    val top = this.widen(that.width)
    val bottom = that.widen(this.width)
    Element.create(top.contents ++ bottom.contents)
  }

  def beside(that: Element): Element = {
    val left = this.heighten(that.height)
    val right = that.heighten(this.height)
    val contents = for ((l, r) <- left.contents zip right.contents)
      yield l + " " + r
    Element.create(contents)
  }

  override def toString = {
    contents.mkString("\n")
  }

  def demo() {
    println("Element.demo()")
  }

}

object Element {

  def create(contents: Array[String]): Element = {
    new ArrayElement(contents)
  }

  def create(chr: Char, width: Int, height: Int): Element = {
    new UniformElement(chr, width, height)
  }

  def create(line: String): Element = {
    new LineElement(line)
  }

}
