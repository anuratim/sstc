import csv
import json

csvfile = open('surescripts.csv', 'r')
jsonfile = open('surescripts.json', 'w')

fieldnames = ("uid", "mpr")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')