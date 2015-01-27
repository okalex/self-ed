require 'byebug'
require 'matrix'

def hyp(inputs, theta)
  theta.transpose * inputs
end

def cost(inputs, theta, outputs)
  (hyp(inputs, theta) - outputs).map{ |e| e**2 }.reduce(&:+)
end

input_arr = []
output_arr = []
input_scalars = [1.0, 100.0, 25.0, 1.0, 1.0, 7.0, 100.0, 10.0, 24.0, 700.0, 20.0, 400.0, 35.0]
File.open('housing.data').each do |record|
  row = record.gsub(/\s+/m, ' ').strip.split(" ").map(&:to_f)
  input_scalars.each_with_index do |scalar, idx|
    row[idx]= row[idx] / scalar
  end
  input_arr << [1] + row[0..-2]
  output_arr << row[-1]
end

inputs = Matrix.columns(input_arr)
outputs = Matrix.row_vector(output_arr)

learning_rate = 0.25
min_learning_rate = 0.000005
num_features = inputs.row_count
num_samples = inputs.column_count

theta = Matrix.build(num_features, 1) { rand }
last_cost = cost(inputs, theta, outputs)
puts last_cost

loop do
  diff = hyp(inputs, theta) - outputs
  new_theta_arr = []
  row_idx = 0
  theta.row_vectors.each do |row|
    cost = (diff * inputs.row(row_idx)).reduce(:+)
    new_theta_arr << theta[row_idx, 0] - (learning_rate / num_samples) * cost
    row_idx += 1
  end
  new_theta = Matrix.column_vector(new_theta_arr)
  new_cost = cost(inputs, new_theta, outputs)
  puts "rate: #{learning_rate},\tcost: #{new_cost}"

  if last_cost <= new_cost
    if learning_rate > min_learning_rate
      learning_rate /= 2
      next
    else
      break
    end
  end
  theta = new_theta
  break if (last_cost - new_cost) <= 0.1
  last_cost = new_cost
end

puts cost(inputs, theta, outputs)
puts theta.inspect
