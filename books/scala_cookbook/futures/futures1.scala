import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success}
import scala.util.Random

def sleep(time: Long) { Thread.sleep(time) }

println("Starting...")

val f = Future {
  println("Future go!")
  sleep(250)
  println("Future done :(")
  23
}

println("do some more work")
f.onComplete {
  case Success(result)  => println(s"Got $result")
  case Failure(e)       => e.printStackTrace
}

println("A..."); sleep(100)
println("B..."); sleep(100)
println("C..."); sleep(100)
println("D..."); sleep(100)
println("E..."); sleep(100)
