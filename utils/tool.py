#Tool goals: converts csv to a json file with only the desired information for minimal data transfer.
#Sources of current CSVs https://data.worldbank.org/indicator/sp.pop.totl

import csv, json

#prints a csv
def print_csv(file_name):
    with open(file_name, 'rb') as f:
        reader = csv.reader(f)
        for row in reader:
            print row

def get_year(source, year):
    clean_csv = "Country Name,Population\n"
    with open(source, 'rb') as f:
        reader = csv.DictReader(f)
        for row in reader:
            clean_csv += row['\xef\xbb\xbf"Country Name"']+","+row[str(year)]+"\n"
    return clean_csv

def str_to_file(file_name, data):
    with open(file_name, 'w') as f:
        f.write(data)
            
def csv_to_json(source, output):
    with open(source, 'rb') as f:
        reader = csv.DictReader(f)
        out = json.dumps([ row for row in reader ])
    with open(output, 'w') as f:
        f.write(out)

def sort_json(file_name):
    sorted = ""
    with open(file_name) as f:
        json_obj = json.load(f)
        for x in sorted(json_obj, key=lambda k: k["Population"], reverse=True):
            sorted += x
    return sorted


if __name__ == "__main__":
    

    
    