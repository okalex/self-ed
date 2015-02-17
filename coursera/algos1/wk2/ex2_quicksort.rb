require 'byebug'
class Array

  def swap!(idx1, idx2)
    self[idx1], self[idx2] = self[idx2], self[idx1]
  end

  def quicksort!(pivot_strategy = :first, start = 0, len = self.size)
    comparisons = 0
    return comparisons if len <= 1

    case pivot_strategy
    when :first
      pivot_idx = start
    when :last
      pivot_idx = start + len - 1
    when :median
      if len == 2
        pivot_idx = start
      else
        first_idx   = start
        middle_idx  = start + (len / 2)
        last_idx    = start + len - 1
        hash = {
          self[first_idx] => first_idx,
          self[middle_idx] => middle_idx,
          self[last_idx] => last_idx
        }
        pivot_idx = hash.sort[1][1]
      end
    when :random
      pivot_idx = start + rand(len)
    end
    pivot = self[pivot_idx]
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

    comparisons += len - 1
    comparisons += self.quicksort!(pivot_strategy, start, pivot_idx - start) unless start == pivot_idx
    comparisons += self.quicksort!(pivot_strategy, pivot_idx + 1, start + len - pivot_idx - 1) unless start + len + 1 == pivot_idx
    comparisons
  end

end

require 'minitest/autorun'
class TestQuickSort < Minitest::Test
  def test_correctness
    %i(first last median random).each do |pivot_strategy|
      arr = (1..100000).to_a.shuffle
      arr.quicksort!(pivot_strategy)
      prev = 0
      arr.each do |cur|
        assert prev < cur, "Not sorted! #{prev} !< #{cur}"
        prev = cur
      end
    end
  end
end

orig = []
File.open('QuickSort.txt').each_line do |line|
  orig << line.to_i
end
%i(first last median random).each do |ps|
  arr = orig.clone
  puts "#{ps}: #{arr.quicksort!(ps)}"
end
