def merge_sort(arr)
  # Base case
  return arr if arr.size <= 1

  halfway = (arr.size / 2.0).ceil
  left = merge_sort(arr[0, halfway])
  right = merge_sort(arr[halfway, arr.size / 2])

  # Merge results
  left_idx = 0
  right_idx = 0
  out = []
  l = left.first
  r = right.first
  while l || r
    if !r.nil? && (l.nil? || r < l)
      out << r
      right_idx += 1
      r = right[right_idx]
    else
      out << l
      left_idx += 1
      l = left[left_idx]
    end
  end
  out
end

require 'minitest/autorun'
class TestMergeSort < Minitest::Test
  def test_sorted
    unsorted = (0..1000).to_a.shuffle
    sorted = merge_sort(unsorted)
    assert(unsorted.size == sorted.size, "Sizes dont match (#{unsorted.size} != #{sorted.size})")

    prev = -1
    sorted.each do |cur|
      assert(cur >= prev, "#{cur} !<= #{prev}")
    end
  end
end

require 'benchmark'
Benchmark.bm do |bm|
  [14, 16, 18, 20].each do |exp|
    unsorted = (1..2**exp).to_a.shuffle
    bm.report("Ruby  sort 2^#{exp}") { unsorted.sort }
    bm.report("Merge sort 2^#{exp}") { merge_sort(unsorted) }
    puts ""
  end
end
