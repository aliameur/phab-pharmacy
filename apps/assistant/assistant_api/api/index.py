from flask import Flask, jsonify, request
import pandas as pd 
import numpy as np 
from flask_cors import CORS
import requests
import os
import time
import json

app = Flask(__name__)
CORS(app)

dir_path = os.path.dirname(os.path.realpath(__file__))
file_path = os.path.join(dir_path, 'encodings.parquet')
encoded_data = pd.read_parquet(file_path).values

def getTopK(question):
    def query(payload):
        API_URL = "https://api-inference.huggingface.co/models/infgrad/stella-base-en-v2"
        headers = {"Authorization": "Bearer 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"}
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()
    output = query({
        "inputs": question,
    })
    try:
        top_5 = [("", 0)] * 5  
        for data in encoded_data:
            score = np.dot(output, data[2])
            if score > top_5[-1][1]:
                inList = False
                for scoreName in top_5:
                    if scoreName[0] == data[0]:
                        inList = True
                        break
                if not inList:
                    top_5.append((data[0], float(score), data[1], data[3]))  
                    top_5.sort(key=lambda x: x[1], reverse=True)  
                    top_5 = top_5[:5]  
            if top_5[0][1] < 1.5:
                message = ["Invalid Input", 'None']
            else:
                message = [f'{top_5[0][0]} (uses: {top_5[0][2]}) located at {top_5[0][3]}', top_5[0][3]]
    except Exception as e:
        print('Error: ', e)
        return None
    return message

url = 'https://iam.cloud.ibm.com/identity/token'

headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

data = {
    'grant_type': 'urn:ibm:params:oauth:grant-type:apikey',
    'apikey': '56DcmbTaZA2mcJ3hBHGjiNvHunI0tr4TKwOEUeIHGqS2'  
}

access_tokenJSON = (requests.post(url, headers=headers, data=data)).json()

access_token = access_tokenJSON.get('access_token')

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/sendText', methods=['POST'])
def send_text():
    question = request.json.get('text', '')
    history = request.json.get('history', '')
    print(history)
    medicine = getTopK(question)
    print(medicine)
    if medicine == None:
        return jsonify({"message": "Huggingface API failed, wait 20 seconds for boot up", "location": "None"}), 200

    url = "https://eu-de.ml.cloud.ibm.com/ml/v1-beta/generation/text?version=2023-05-29"

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {access_token}'  
    }

    prompt = f'''Task: You are a chat bot aimed at giving medical advice and helping to prescribe over the counter medicine. 
        Question: I have really bad stomach pain from my period cramps, what can I take to help this.
        Recommend Medicine: Nurofen Max strength (uses: severe pain, inflammation, migraines) located at C. 
        Chat History (Last to First): []
        Response: I'm sorry to hear that you aren't feeling very well. Stomach cramps can be really painful be sure to rest and take some Neurofen Max strength which can be located at C if you have a lot of pain. Using a hot water bottle or massaging your tummy can help relieve the pain. However, consider seeing a doctor if this is a regular occurrence, can I help with anything else? 
        ###
        Question: Should I disinfect it?
        Recommend Medicine: Dettol Antispetic (uses: disinfection, wound cleaning, skin infections) located at A.
        Chat History (Last to First): [[Question: Hi, I have a really bad open wound on my leg can you help?, Answer: Oh I'm so sorry to hear you hurt your leg, I think some Elastoplasters which can be found at A should be able to help, as it is great for covering open wounds. Make sure the wound is cleaned to prevent infection, if it does become infected be sure to consult a doctor.]]
        Response: Yes, you should also use some Dettol Antispetic located at A to clean and disinfect the wound. If it gets any worse you might need to see a doctor. 
        ###
        Question: Who was the first president of the United States?
        Recommend Medicine: Invalid Input
        Chat History (Last to First): [[Question: I have a headache, Answer: Sorry to hear about your headache. Try some solpadine which can be found at C. It will help with the symptoms and any tension headaches or migraines.]]
        Response: I'm sorry but I'm unable to answer this question (George Washington) as I'm a Medical chatbot aimed at giving over the counter medication advice. 
        ###
        Question: Recently I have bad really bad acid reflux is there anything I can take to help this pain?
        Recommend Medicine: Gaviscon Advance (uses: severe heartburn, acid reflux, indigestion) located at D.
        Chat History (Last to First): []
        Response:  
        Oh no, I hope you start feeling better soon. Acid reflux can be really painful, Gaviscon Advance located at D is usually really effective. Avoid fatty foods and citrus fruits as these can exacerbate the issue. If symptoms persist or worsen, consider seeing a doctor. Is there anything else I can help with? 
        ###
        Question: {question}
        Chat History (Last to First): {history}
        Recommend Medicine: {medicine[0]}
        Response:'''

    payload = {
        "model_id": "meta-llama/llama-2-13b-chat",
        "input": prompt,
        "parameters": {
            "decoding_method": "sample",
            "max_new_tokens": 200,
            "min_new_tokens": 0,
            "random_seed": None,
            "stop_sequences": ["###"],
            "temperature": 0.4,
            "top_k": 50,
            "top_p": 1,
            "repetition_penalty": 1.2
        },
        "project_id": "6f2597a9-c169-4310-8d5f-afee1b52f6c1"
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        message = response.json().get("results")[0]['generated_text']
    except Exception as e:
        print('Error: ', e)
        print(response.json())
        message = "Watsonxai failed to load, please contact Development Team"
        return jsonify({"message": f"{message}", "location": "None"}), 200

    return jsonify({"message": f"{message}", "location": f"{medicine[1]}"}), 200

if __name__ == '__main__':
    app.run(debug=True)