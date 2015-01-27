class Array
  def quick_sort!(start = 0, len = self.size)
    return if len <= 1

    left_idx  = start
    right_idx = start + len - 1
    pivot_idx = start + rand(len)
    pivot = self[pivot_idx]

    until left_idx >= right_idx
      if self[left_idx] >= pivot
        until self[right_idx] <= pivot or left_idx == right_idx + 1
          right_idx -= 1
        end
        self[left_idx], self[right_idx] = self[right_idx], self[left_idx]
        if self[left_idx] == pivot
          pivot_idx = left_idx
        else
          left_idx += 1
        end
        if self[right_idx] == pivot
          pivot_idx = right_idx
        else
          right_idx -= 1
        end
      else
        left_idx += 1
      end
    end

    self.quick_sort!(start, pivot_idx - start) unless start == pivot_idx
    self.quick_sort!(pivot_idx + 1, start + len - pivot_idx - 1) unless start + len + 1 == pivot_idx
    self
  end
end

require 'minitest/autorun'
class TestQuickSort < Minitest::Test
  def test_correctness
    arr = (1..1000).to_a.shuffle
    arr.quick_sort!
    prev = 0
    arr.each do |cur|
      assert prev < cur, "Not sorted! #{prev} !< #{cur}"
      prev = cur
    end
  end
end

require 'benchmark'
Benchmark.bm do |bm|
  arr = (1..100000).to_a.shuffle
  arr1 = arr.clone
  arr2 = arr.clone

  bm.report("Ruby sort:") { arr1.sort! }
  bm.report("Quicksort:") { arr2.quick_sort! }
end

Benchmark.bm do |bm|
  (20..24).each do |exp|
    arr = (1..2**exp).to_a.shuffle
    bm.report("2^#{exp}:") { arr.sort! }
  end
end
