import sys
import json
import ast

input_data = ast.literal_eval(sys.argv[1])

input_data['numers_send'] = [num + 1 for num in input_data['numers_send']]

output_data = input_data
output_data['text_returned'] = 'send to node'

print(json.dumps(output_data))

sys.stdout.flush()
