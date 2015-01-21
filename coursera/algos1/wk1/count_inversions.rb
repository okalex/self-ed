def count_inversions(arr)
  sorted, count = sort_and_count(arr)
  count
end

def sort_and_count(arr)
  return arr, 0 if arr.size <= 1

  a, left_inversions  = sort_and_count(arr[0, (arr.size / 2.0).ceil])
  b, right_inversions = sort_and_count(arr[(arr.size / 2.0).ceil, arr.size / 2])
  c, split_inversions = merge_and_count_split(a, b)
  return c, left_inversions + right_inversions + split_inversions
end

def merge_and_count_split(left, right)
  split_inversions = 0
  left_idx = 0
  right_idx = 0
  out = []
  l = left.first
  r = right.first
  while l || r
    if !r.nil? && (l.nil? || r < l)
      if !l.nil? && right_idx <= left_idx
        split_inversions += left.length - left_idx
      end
      out << r

      right_idx += 1
      r = right[right_idx]
    else
      out << l

      left_idx += 1
      l = left[left_idx]
    end
  end
  return out, split_inversions
end

require 'minitest/autorun'
class TestCountInversions < Minitest::Test
  def test_count
    arr = [1, 4, 3, 7, 5, 6, 8, 2]
    count = count_inversions(arr)
    assert(count == 8, "Incorrect count (#{count})")
  end
end
