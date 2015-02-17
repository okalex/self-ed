println("While loop:")
var i = 0
while (i < args.length) {
  println(args(i))
  i += 1
}
println("")

println("Foreach:")
args.foreach((arg: String) => println(arg))
println("")

println("For <-:")
for (arg <- args) {
  println(arg)
}

println("Have a scriptaculous day!")
