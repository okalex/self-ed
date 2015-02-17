import scala.io.Source

object LongLines {

  def processFile(filename: String, width: Int) {
    val source = Source.fromFile(filename)
    for (line <- source.getLines()) {
      processLine(filename, width, line)
    }
  }

  private def processLine(filename: String, width: Int, line: String) {
    if (line.length > width) {
      println(filename +": "+ line.trim)
    }
  }

}

println("\nLongLines:")
LongLines.processFile("LongLines.scala", 20)

object LongLines2 {

  def processFile(filename: String, width: Int) {
    def processLine(line: String) {
      if (line.length > width) {
        println(filename +": "+ line.trim)
      }
    }

    val source = Source.fromFile(filename)
    for (line <- source.getLines()) {
      processLine(line)
    }
  }

}

println("\nLongLines2:")
LongLines2.processFile("LongLines.scala", 20)
