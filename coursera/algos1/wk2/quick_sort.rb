class Array

  def swap!(idx1, idx2)
    self[idx1], self[idx2] = self[idx2], self[idx1]
  end

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
        self.swap!(left_idx, right_idx)
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

    pivot_idx = start + rand(len)
    pivot = self[pivot_idx]
    #puts "(#{start}, #{len}) -> #{self.inspect}, [#{pivot_idx}] = #{pivot}"
    self.swap!(start, pivot_idx) unless pivot_idx == start

    left_idx  = start + 1
    right_idx = start + len - 1
    while left_idx < right_idx
      if self[left_idx] > pivot
        right_idx -= 1 until self[right_idx] < pivot or left_idx >= right_idx
        unless left_idx == right_idx
          self.swap!(left_idx, right_idx)
          left_idx += 1
          right_idx -= 1
        end
      else
        left_idx += 1
      end
    end

    left_idx -= 1 if self[left_idx] > pivot
    self.swap!(start, left_idx)
    pivot_idx = left_idx
    #puts "          #{self.inspect}"

    self.quick_sort2!(start, pivot_idx - start) unless start == pivot_idx
    self.quick_sort2!(pivot_idx + 1, start + len - pivot_idx - 1) unless start + len + 1 == pivot_idx
    self
  end

  def quick_sort3!(start = 0, len = self.size)
    return if len <= 1

    pivot_idx = start + rand(len)
    pivot = self[pivot_idx]
    #puts "(#{start}, #{len}) -> #{self.inspect}, [#{pivot_idx}] = #{pivot}"
    self.swap!(start, pivot_idx) unless pivot_idx == start

    i = start + 1
    j = start + 1
    while j < start + len
      if i != j and self[j] < pivot
        self.swap!(i, j)
        i += 1
      elsif self[j] < pivot
        i += 1
      end
      j += 1
    end

    pivot_idx = i - 1
    self.swap!(start, pivot_idx)
    #puts "          #{self.inspect}"

    self.quick_sort3!(start, pivot_idx - start) unless start == pivot_idx
    self.quick_sort3!(pivot_idx + 1, start + len - pivot_idx - 1) unless start + len + 1 == pivot_idx
    self
  end

end

require 'minitest/autorun'
class TestQuickSort < Minitest::Test
  def test_correctness
    arr = (1..100000).to_a.shuffle
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
  arr = (1..100000).to_a.shuffle
  arr1 = arr.clone
  arr2 = arr.clone
  arr3 = arr.clone

  bm.report("Ruby sort: ") { arr.sort! }
  bm.report("Quicksort1:") { arr1.quick_sort! }
  bm.report("Quicksort2:") { arr2.quick_sort2! }
  bm.report("Quicksort3:") { arr3.quick_sort3! }
end
