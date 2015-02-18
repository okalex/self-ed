class FileMatcher(dir: String) {
  private val filesHere = (new java.io.File(dir)).listFiles()

  private def filesMatching(matcher: (String) => Boolean) = {
    for (file <- filesHere; if matcher(file.getName))
      yield file
  }

  def filesEnding(query: String) = filesMatching(_.endsWith(query))
  def filesContaining(query: String) = filesMatching(_.contains(query))
  def filesRegex(query: String) = filesMatching(_.matches(query))
}

val fm = new FileMatcher(".")
println(".scala files:")
println(fm.filesEnding(".scala").mkString("\n"))

println("\nFiles containing \"mpty\":")
println(fm.filesContaining("mpty").mkString("\n"))

println("\nempty.* files:")
println(fm.filesRegex("empty\\..*").mkString("\n"))

println("\nAll files:")
println(fm.filesRegex(".*").mkString("\n"))

