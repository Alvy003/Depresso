from flask import Flask, request, render_template, jsonify
import xgboost as xgb
import numpy as np

app = Flask(__name__)

#= Load the XGBoost model from the JSON file
model = xgb.XGBClassifier()
model.load_model('best_xgb_model.json')  # Adjust to your model filename if needed


# Route to render the Home page
@app.route('/')
def login():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

# Route to render the About page
@app.route('/about')
def about():
    return render_template('about.html')

# Route to render the ABC page
@app.route('/abc')
def abc():
    return render_template('abc.html')

# Route to render the Depresso form page
@app.route('/depresso')
def depresso():
    return render_template('depresso.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/gameinterface')
def gameinterface():
    return render_template('game interface.html')

@app.route('/colourburst')
def colourburst():
    return render_template('colourburst.html')

@app.route('/memorypair')
def memorypair():
    return render_template('memorypair.html')

@app.route('/egghen')
def egghen():
    return render_template('egghen.html')

# Route to handle the form submission (using form data directly)
@app.route('/predict', methods=['POST'])
def predict():
    # Get the form data
    age = int(request.form.get('Age')) if request.form.get('Age') else None
    marital_status = int(request.form.get('Marital Status')) if request.form.get('Marital Status') else None
    education_level = int(request.form.get('Education Level')) if request.form.get('Education Level') else None
    children = int(request.form.get('Number of Children')) if request.form.get('Number of Children') else None
    smoking_status = int(request.form.get('Smoking Status')) if request.form.get('Smoking Status') else None
    physical_activity = int(request.form.get('Physical Activity Level')) if request.form.get('Physical Activity Level') else None
    employment_status = int(request.form.get('Employment Status')) if request.form.get('Employment Status') else None
    income = float(request.form.get('Income')) if request.form.get('Income') else None
    alcohol_consumption = int(request.form.get('Alcohol Consumption')) if request.form.get('Alcohol Consumption') else None
    dietary_habits = int(request.form.get('Dietary Habits')) if request.form.get('Dietary Habits') else None
    sleep_patterns = int(request.form.get('Sleep Patterns')) if request.form.get('Sleep Patterns') else None
    mental_illness_history = int(request.form.get('History of Mental Illness')) if request.form.get('History of Mental Illness') else None
    substance_abuse_history = int(request.form.get('History of Substance Abuse')) if request.form.get('History of Substance Abuse') else None
    family_depression_history = int(request.form.get('Family History of Depression')) if request.form.get('Family History of Depression') else None
    
    # Prepare the features for model prediction
    features = np.array([[age, marital_status, education_level, children, smoking_status, physical_activity,
                          employment_status, income, alcohol_consumption, dietary_habits, sleep_patterns,
                          mental_illness_history, substance_abuse_history, family_depression_history]])

    # Model prediction
    prediction = model.predict(features)
    
    # Determine depression risk category based on age and depression risk
    if age is not None:
        if 0 <= age <= 12:
            age_group = "Childhood Depression Symptoms Detected"
        elif 13 <= age <= 19:
            age_group = "Teenage Depression Symptoms Detected"
        elif 20 <= age <= 30:
            age_group = "Adult Depression Symptoms Detected"
        elif 31 <= age <= 50:
            age_group = "Middle-Aged Depression Symptoms Detected"
        elif age >= 51:
            age_group = "Senior-Citizen Depression Symptoms Detected"
        else:
            age_group = "Age not categorized"
    
    # Check if the depression risk is high or low
    if prediction[0] == 1:  # High risk of depression
        result = f"Depression Risk: High"
        age_group=age_group
        depression_tips = "pay attention to your mental health and seek professional help if needed."
        
    else:  # Low risk of depression
        result = "Depression Risk: Low"
        depression_tips = ""
        age_group=""

    return render_template('result.html', result=result, depression_tips=depression_tips, age_group=age_group)


@app.route('/exp')
def exp():
    return render_template('exp.html')  # Make sure you create this exp.html page



