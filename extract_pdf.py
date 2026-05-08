import PyPDF2

pdf_path = r'c:\Users\Hazman\Documents\GitHub\hazman5540\public\Hazman_resume_OCT2025.pdf'
with open(pdf_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ''
    for page_num in range(len(reader.pages)):
        text += reader.pages[page_num].extract_text()
    
with open('pdf_output.txt', 'w', encoding='utf-8') as f:
    f.write(text)
