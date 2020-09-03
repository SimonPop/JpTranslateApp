from typing import Optional
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd 
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tokenizer = AutoTokenizer.from_pretrained("bert-base-cased-finetuned-mrpc")
model = AutoModelForSequenceClassification.from_pretrained("bert-base-cased-finetuned-mrpc")

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.get("/random/")
def get_random_line():
    df = pd.read_csv('sentences.csv')
    random_line_dict = dict(zip(['ID', 'japanese1', 'japanese2', 'english'], df.sample(1).values.reshape(-1)))
    return jsonable_encoder(random_line_dict)

@app.get("/note/{user_sentence}/{target_sentence}/")
def note_synonymity(user_sentence, target_sentence):

    paraphrase = tokenizer(user_sentence, target_sentence, return_tensors="pt")
    paraphrase_classification_logits = model(**paraphrase)[0]
    paraphrase_results = torch.softmax(paraphrase_classification_logits, dim=1).tolist()[0]

    return jsonable_encoder({"note": paraphrase_results[1]})

if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')