import sys
from pdfminer.high_level import extract_text
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Example Job Description (customize as needed)
JD = """
Required: Python, Node.js, MongoDB, Express.js, Machine Learning, Data Structures
"""

def score_resume(resume_text):
    documents = [resume_text, JD]
    cv = CountVectorizer().fit_transform(documents)
    sim = cosine_similarity(cv[0:1], cv[1:2])
    return sim[0][0] * 100  # percentage match

def main():
    resume_path = sys.argv[1]
    text = extract_text(resume_path)
    score = score_resume(text)
    print(f"Resume Match Score: {score:.2f}%")

if __name__ == "__main__":
    main()

