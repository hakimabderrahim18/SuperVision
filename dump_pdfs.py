import os
from pypdf import PdfReader

pdf_files = [
    "GUIDE KPIs SILWANE - Mai 2026.pdf",
    "Rapport_Comparatif_Prevendeurs.pdf",
    "Rapport_Comparatif_Regions_Prevendeurs.pdf",
    "Rapport_Performance_SILWANE_Mai_2026_Consolide.pdf",
    "Rapport_Ventes_Par_Zone.pdf"
]

output_text_file = "extracted_pdf_data.txt"

with open(output_text_file, "w", encoding="utf-8") as out:
    for filename in pdf_files:
        path = filename
        if not os.path.exists(path):
            out.write(f"=== File not found: {filename} ===\n\n")
            continue
            
        out.write(f"=========================================\n")
        out.write(f"FILE: {filename}\n")
        out.write(f"=========================================\n\n")
        
        try:
            reader = PdfReader(path)
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                out.write(f"--- PAGE {i+1} ---\n")
                out.write(text)
                out.write("\n\n")
        except Exception as e:
            out.write(f"Error reading file {filename}: {str(e)}\n\n")
            
print("PDF data successfully extracted to extracted_pdf_data.txt")
