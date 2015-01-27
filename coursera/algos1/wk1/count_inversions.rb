require 'byebug'

# Divide and conquer algorithm
def dc_count_inversions(arr)
  sorted, count = sort_and_count(arr)
  count
end

def sort_and_count(arr)
  return arr, 0 if arr.size <= 1

  left, left_inversions  = sort_and_count(arr[0, (arr.size / 2.0).ceil])
  right, right_inversions = sort_and_count(arr[(arr.size / 2.0).ceil, arr.size / 2])
  sorted, split_inversions = merge_and_count_split(left, right)
  total = left_inversions + right_inversions + split_inversions
  return sorted, total
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
      split_inversions += left.length - left_idx
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

# Brute force algorith
def brute_count_inversions(arr)
  return 0 if arr.length <= 1

  inversions = 0
  cur_idx = 0
  while cur_idx < arr.length - 1
    cur = arr[cur_idx]
    runner_idx = cur_idx + 1
    while runner_idx < arr.length
      if arr[runner_idx] < arr[cur_idx]
        inversions += 1
      end
      runner_idx += 1
    end
    cur_idx += 1
  end
  inversions
end

#require 'minitest/autorun'
#require 'benchmark'
#class TestCountInversions < Minitest::Test
  #def test_count
    #arr = [1, 4, 3, 7, 5, 6, 2, 8]
    #count = dc_count_inversions(arr)
    #assert(count == 8, "Incorrect count (#{count})")
    #assert(count == brute_count_inversions(arr))
  #end

  #def test_performance
    #arr = (1..2**10).to_a.shuffle

    #brute_bm = Benchmark.measure do
      #brute_count_inversions(arr)
    #end

    #dc_bm = Benchmark.measure do
      #dc_count_inversions(arr)
    #end

    #assert(dc_bm.total < brute_bm.total, 'Divde-and-conquer is not faster')
  #end
#end

#Benchmark.bm do |bm|
  #arr = (1..2**13).to_a.shuffle
  #bm.report("D & C:") { dc_count_inversions(arr) }
  #bm.report("Brute:") { brute_count_inversions(arr) }
#end

#Benchmark.bm do |bm|
  #(10..20).each do |exp|
    #arr = (1..2**exp).to_a.shuffle
    #bm.report("2^#{exp}:") { dc_count_inversions(arr) }
  #end
#end

puts "Loading file"
strings = File.readlines("IntegerArray.txt")
integers = strings.map(&:to_i)
puts "Counting inversions"
puts "#{dc_count_inversions(integers)} inversions"
