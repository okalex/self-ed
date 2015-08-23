class Rational(n: Int, d: Int) extends Ordered[Rational] {
  // Validations
  require(d != 0)

  // Fields
  private val g = gcd(n.abs, d.abs)
  val numer: Int = n / g
  val denom: Int = d / g

  // Auxiliary constructors
  def this(n: Int) = {
    this(n, 1)
  }

  // Public methods
  def +(that: Rational): Rational = {
    new Rational(
      this.numer * that.denom + that.numer * this.denom,
      this.denom * that.denom
    )
  }
  def +(i: Int): Rational = {
    this + new Rational(i)
  }

  def -(that: Rational): Rational = {
    new Rational(
      this.numer * that.denom - that.numer * this.denom,
      this.denom * that.denom
    )
  }
  def -(i: Int): Rational = {
    this - new Rational(i)
  }

  def *(that: Rational): Rational = {
    new Rational(
      this.numer * that.numer,
      this.denom * that.denom
    )
  }
  def *(i: Int): Rational = {
    this * new Rational(i)
  }

  def /(that: Rational): Rational = {
    new Rational(
      this.numer * that.denom,
      this.denom * that.numer
    )
  }
  def /(i: Int): Rational = {
    this / new Rational(i)
  }

  def compare(that: Rational) = {
    (this.numer * that.denom) - (that.numer * this.denom)
  }

  def max(that: Rational): Rational = {
    if (this < that) that else this
  }

  // Overrides
  override def toString() = {
    this.numer +"/"+ this.denom
  }

  // Private methods
  private def gcd(a: Int, b: Int): Int = {
    if (b == 0) a else gcd(b, a % b)
  }
}
