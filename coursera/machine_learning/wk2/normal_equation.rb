require 'matrix'

input_arr = []
output_arr = []
File.open('housing.data').each do |record|
  row = record.gsub(/\s+/m, ' ').strip.split(" ").map(&:to_f)
  input_arr << [1] + row[0..-2]
  output_arr << row[-1]
end

ins   = Matrix.rows(input_arr)
outs  = Matrix.column_vector(output_arr)

theta = (ins.transpose * ins).inverse * ins.transpose * outs
puts theta.inspect
