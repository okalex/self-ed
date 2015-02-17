object ChecksumAccumulator {
  def calculate(s: String) = {
    val acc = new ChecksumAccumulator
    for (c <- s) {
      acc.add(c.toByte)
    }
    acc.checksum()
  }
}

class ChecksumAccumulator {
   private var sum = 0

   def add(b: Byte) = {
     sum += b
   }

   def checksum() = {
     ~(sum & 0xFF) + 1
   }
}
