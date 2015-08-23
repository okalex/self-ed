trait Rectangular {
  // Abstract methods
  def topLeft: Point
  def bottomRight: Point

  // Concrete methods
  def left    = topLeft.x
  def right   = bottomRight.x
  def top     = topLeft.y
  def bottom  = bottomRight.y
  def width   = right - left
  def height  = top - bottom
}
