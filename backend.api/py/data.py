import sys
import json
import ast
import pandas as pd

input_data = ast.literal_eval(sys.argv[1])

station_data = input_data.get('stationData', [])

df = pd.DataFrame(station_data)
df['created'] = pd.to_datetime(df['created'])
df_sorted = df.sort_values(by='created', ascending=False)

last_10_entries = df_sorted.head(10)

mean_value = round(last_10_entries['price'].mean(), 3)

output_data = {
    "name": input_data.get('name', ''),
    "stationData": station_data,
    "mean": mean_value
}

print(json.dumps(output_data))
sys.stdout.flush()
