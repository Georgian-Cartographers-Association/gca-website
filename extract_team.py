import openpyxl
import json

try:
    wb = openpyxl.load_workbook('სკა-ის წევრები.xlsx')
    ws = wb.active
    
    data = []
    for i, row in enumerate(ws.iter_rows(values_only=True), 1):
        if i == 1:  # header row
            continue
        if row[0] and row[1]:  # if both name and status exist
            data.append({
                'name': str(row[0]).strip(),
                'role': str(row[1]).strip()
            })
    
    print(json.dumps(data, ensure_ascii=False, indent=2))
except Exception as e:
    print(f"Error: {e}")
