import java.io._

def withPrintWriter(file: File, op: (PrintWriter) => Unit) {
  val writer = new PrintWriter(file)
  try{
    op(writer)
  } finally {
    writer.close()
  }
}

withPrintWriter(
  new File("date.txt"),
  (writer) => writer.println(new java.util.Date)
)

// This one uses currying to appear more like a native control structure
def curriedPrintWriter(file: File)(op: (PrintWriter) => Unit) {
  val writer = new PrintWriter(file)
  try{
    op(writer)
  } finally {
    writer.close()
  }
}

// The resulting call can be made to look similar to a ruby block
val file = new File("curried.txt")
curriedPrintWriter(file) { (writer) =>
  writer.println(new java.util.Date)
}
