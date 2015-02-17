import scala.io.Source

if (args.length != 1) {
  Console.err.println("Usage: scala read_lines.scala <filename>")
  System.exit(1)
}

// Round 1
println("Method 1:\n")
for (line <- Source.fromFile(args(0)).getLines()) {
  println(line.length +"\t"+ line)
}

// Round 2
println("\nMethod 2:\n")
def widthOfLength(s: String) = s.length.toString.length
val lines = Source.fromFile(args(0)).getLines().toList
val longestLine = lines.reduceLeft(
  (a, b) => if (a.length > b.length) a else b
)
val maxWidth = widthOfLength(longestLine)

for (line <- lines) {
  val paddingSize = maxWidth - widthOfLength(line)
  val padding = " " * paddingSize
  println(line.length.toString + padding +" | "+ line)
}
