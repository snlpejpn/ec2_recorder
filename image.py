import pandas as pd

image_df = pd.read_csv('static/images/image_list.csv')
image_df['key'] = [i+1 for i in range(len(image_df))]