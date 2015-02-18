var assertionsEnabled = true

def myAssert(predicate: () => Boolean) = {
  if (assertionsEnabled && !predicate()) {
    throw new AssertionError
  }
}

def byNameAssert(predicate: => Boolean) = {
  if (assertionsEnabled && !predicate) {
    throw new AssertionError
  }
}

def booleanAssert(predicate: Boolean) = {
  if (assertionsEnabled && !predicate) {
    throw new AssertionError
  }
}

val message = "This should not print"
assertionsEnabled = false

try {
  myAssert(() => { println("myAssert: "+ message); false })
} catch {
  case e: AssertionError => println("AssertionError")
}

try {
  byNameAssert({ println("byNameAssert: "+ message); false})
} catch {
  case e: AssertionError => println("AssertionError")
}

try {
  booleanAssert({ println("booleanAssert: "+ message); false })
} catch {
  case e: AssertionError => println("AssertionError")
}
