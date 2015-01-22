require 'byebug'

class SquareMatrix
  attr_accessor :n, :arr

  @@mult = :brute
  def self.mult=(value)
    @@mult = value
  end

  def initialize(n, init = nil)
    @n = n
    @arr = Array.new(n**2, init)
  end

  def self.from_array(n, arr)
    raise "SizeError (#{arr.size} != #{n}^2)" if arr.size != n**2

    matrix = self.new(n)
    matrix.arr = arr
    matrix
  end

  def self.from_quadrants(quadrants)
    raise "SizeError" if quadrants[0][0].n != quadrants[0][1].n
    raise "SizeError" if quadrants[0][0].n != quadrants[1][0].n
    raise "SizeError" if quadrants[0][0].n != quadrants[1][1].n

    half = quadrants[0][0].n
    n = half * 2
    matrix = self.new(n)

    quadrants.each_with_index do |quad_row, quad_row_idx|
      quad_row.each_with_index do |quad, quad_col_idx|
        row_idx = 0
        while row_idx < half
          matrix.arr[(quad_row_idx * half + row_idx) * n + quad_col_idx * half, half] = quad.arr[row_idx * half, half]
          row_idx += 1
        end
      end
    end

    matrix
  end

  def +(m)
    out = SquareMatrix.new(@n)
    out.arr = [self.arr, m.arr].transpose.map { |x| x.reduce(:+) }
    out
  end

  def -(m)
    out = SquareMatrix.new(@n)
    out.arr = [self.arr, m.arr].transpose.map { |x| x.reduce(:-) }
    out
  end

  def *(m)
    case @@mult
    when :brute
      result = SquareMatrix.new(@n)
      self.traverse do |el, row_idx, col_idx|
        sum = 0
        (0..(@n-1)).each do |idx|
          sum += self[row_idx, idx] * m[idx, col_idx]
        end
        result[row_idx, col_idx] = sum
      end
    when :dc
      # Base case
      if @n == 1
        return SquareMatrix.new(1, self[0, 0] * m[0, 0])
      end

      quads = self.quadrants
      m_quads = m.quadrants

      result_quads = [
        [ SquareMatrix.new(@n / 2, 0), SquareMatrix.new(@n / 2, 0) ],
        [ SquareMatrix.new(@n / 2, 0), SquareMatrix.new(@n / 2, 0) ]
      ]
      quads.each_with_index do |quad_row, quad_row_idx|
        quad_row.each_with_index do |quad, quad_col_idx|
          [0, 1].each do |idx|
            result_quads[quad_row_idx][quad_col_idx] += quads[quad_row_idx][idx] * m_quads[idx][quad_col_idx]
          end
        end
      end

      result = SquareMatrix.from_quadrants(result_quads)
    else # :strassen
      # Base case
      if @n == 1
        return SquareMatrix.new(1, self[0, 0] * m[0, 0])
      end

      quads = self.quadrants
      a = quads[0][0]
      b = quads[0][1]
      c = quads[1][0]
      d = quads[1][1]

      quads = m.quadrants
      e = quads[0][0]
      f = quads[0][1]
      g = quads[1][0]
      h = quads[1][1]

      p1 = a * (f - h)
      p2 = (a + b) * h
      p3 = (c + d) * e
      p4 = d * (g - e)
      p5 = (a + d) * (e + h)
      p6 = (b - d) * (g + h)
      p7 = (a - c) * (e + f)

      result_quads = [
        [ p5 + p4 - p2 + p6,  p1 + p2           ],
        [ p3 + p4,            p1 + p5 - p3 - p7 ]
      ]

      result = SquareMatrix.from_quadrants(result_quads)
    end
    result
  end

  def ==(m)
    self.traverse do |el, row, col|
      return false if el != m[row, col]
    end
    true
  end

  def [](row, col)
    @arr[row * @n + col]
  end

  def []=(row, col, val)
    @arr[row * @n + col] = val
  end

  def traverse(&block)
    @arr.each_with_index do |el, idx|
      row_idx = idx / @n
      col_idx = idx % @n
      block.call(el, row_idx, col_idx)
    end
  end

  def quadrants
    half = @n / 2
    out = [
      [ SquareMatrix.new(half), SquareMatrix.new(half) ],
      [ SquareMatrix.new(half), SquareMatrix.new(half) ]
    ]
    out.each_with_index do |quad_row, quad_row_idx|
      quad_row.each_with_index do |quad, quad_col_idx|
        half.times do |idx|
          quad.arr[idx * half, half] = self.arr[(quad_row_idx * half + idx) * @n + quad_col_idx * half, half]
        end
      end
    end

    out
  end

end

require 'minitest/autorun'
class TestMatrixMultiply < Minitest::Test
  def setup
    @a = SquareMatrix.from_array 2, [1, 2, 3, 4]
    @b = SquareMatrix.from_array 2, [5, 6, 7, 8]
  end

  def test_add
    sum = SquareMatrix.from_array 2, [6, 8, 10, 12]
    res = @a + @b
    assert(res == sum, "Incorrect result #{res}")
  end

  def test_multiply
    prod = SquareMatrix.from_array 2, [19, 22, 43, 50]

    SquareMatrix.mult = :brute
    res = @a * @b
    assert(res == prod, "Incorrect result #{res}")

    SquareMatrix.mult = :dc
    res = @a * @b
    assert(res == prod, "Incorrect result #{res}")

    SquareMatrix.mult = :strassen
    res = @a * @b
    assert(res == prod, "Incorrect result #{res}")
  end

  def test_quadrants
    a = SquareMatrix.from_array 4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    quads = [
      [ SquareMatrix.from_array(2, [1, 2, 5, 6]),
        SquareMatrix.from_array(2, [3, 4, 7, 8]) ],
      [ SquareMatrix.from_array(2, [9, 10, 13, 14]),
        SquareMatrix.from_array(2, [11, 12, 15, 16]) ]
    ]

    res = a.quadrants
    assert(quads.size == res.size)
    res.each_with_index do |quad_row, quad_row_idx|
      quad_row.each_with_index do |quad, quad_col_idx|
        assert(quad == quads[quad_row_idx][quad_col_idx])
      end
    end
  end
end

require 'benchmark'
Benchmark.bm do |bm|
  (5..7).each do |exp|
    arr = (1..2**exp*2**exp).to_a
    m = SquareMatrix.from_array(2**exp, arr)

    SquareMatrix.mult = :dc
    bm.report("D&C      #{2**exp}x#{2**exp}:") { m * m }
    SquareMatrix.mult = :brute
    bm.report("Brute    #{2**exp}x#{2**exp}:") { m * m }
    SquareMatrix.mult = :strassen
    bm.report("Strassen #{2**exp}x#{2**exp}:") { m * m }
  end
end
puts ""

require 'ruby-prof'
m = SquareMatrix.new(64, 10)
SquareMatrix.mult = :strassen
RubyProf.start
m * m
result = RubyProf.stop
printer = RubyProf::FlatPrinter.new(result)
printer.print(STDOUT)
puts ""

SquareMatrix.mult = :brute
RubyProf.start
m * m
result = RubyProf.stop
printer = RubyProf::FlatPrinter.new(result)
printer.print(STDOUT)
