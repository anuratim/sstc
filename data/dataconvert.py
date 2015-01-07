import csv
import json

csvfile = open('surescripts_fv.csv', 'r')
jsonfile = open('surescripts.json', 'w')

fieldnames = ("uid", "mpr", "mpr_percentile", "missed_refills", "refill_percentile", "missed_doses")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')