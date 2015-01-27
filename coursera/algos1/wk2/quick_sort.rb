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

  def quick_sort2!(start = 0, len = self.size)
    return if len <= 1

    if len == 2
      self[start], self[start + 1] = self[start + 1], self[start] if self[start] > self[start + 1]
      return
    end

    pivot_idx = start + rand(len)
    pivot = self[pivot_idx]
    #puts "(#{start}, #{len}) -> #{self.inspect}, [#{pivot_idx}] = #{pivot}"
    unless pivot_idx == start
      self[pivot_idx], self[start] = self[start], self[pivot_idx]
    end

    left_idx  = start + 1
    right_idx = start + len - 1
    while left_idx < right_idx
      if self[left_idx] > pivot
        right_idx -= 1 until self[right_idx] < pivot or left_idx >= right_idx
        unless left_idx == right_idx
          self[left_idx], self[right_idx] = self[right_idx], self[left_idx]
          left_idx += 1
          right_idx -= 1
        end
      else
        left_idx += 1
      end
    end

    # Hackey sack
    if self[left_idx] > pivot
      left_idx -= 1
    end

    self[start], self[left_idx] = self[left_idx], self[start]
    pivot_idx = left_idx
    #puts "          #{self.inspect}"

    self.quick_sort2!(start, pivot_idx - start) unless start == pivot_idx
    self.quick_sort2!(pivot_idx + 1, start + len - pivot_idx - 1) unless start + len + 1 == pivot_idx
    self
  end
end

require 'minitest/autorun'
class TestQuickSort < Minitest::Test
  def test_correctness
    arr = (1..1000).to_a.shuffle
    arr.quick_sort2!
    prev = 0
    arr.each do |cur|
      assert prev < cur, "Not sorted! #{prev} !< #{cur}"
      prev = cur
    end
  end
end

require 'benchmark'
Benchmark.bm do |bm|
  arr = (1..1000000).to_a.shuffle
  arr1 = arr.clone
  arr2 = arr.clone
  arr3 = arr.clone

  bm.report("Ruby sort: ") { arr1.sort! }
  bm.report("Quicksort1:") { arr2.quick_sort! }
  bm.report("Quicksort2:") { arr3.quick_sort2! }
end
