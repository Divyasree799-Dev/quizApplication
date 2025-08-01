# 🧠 Quiz Application (Java + SQL + Postman)

A simple yet powerful quiz management application built with Java and SQL. This backend system allows:

- Adding quiz questions by category
- Creating quizzes based on category and number of questions and quiz title
- Fetching quiz questions by quiz ID
- Submitting answers and evaluating score

> This project is tested using Postman and supports RESTful APIs.

---

## 🛠 Tech Stack

- **Backend:** Java (Spring Boot or Java Servlets)
- **Database:** MySQL / PostgreSQL
- **API Testing:** Postman
- **Build Tool:** Maven / Gradle

---

## 🚀 Setup Instructions

1. **Clone the Repository**


## Features

- Adding quiz questions by category
- Creating quizzes based on category and number of questions and quiz title
- Fetching quiz questions by quiz ID
- Submitting answers and evaluating score

## API Endpoints

| HTTP Method | Endpoint                                 | Description                           |
|-------------|------------------------------------------|---------------------------------------|
| POST        | `question/add`                           |Adding questions
| POST        | `create?category=Java&numQ=5&title=JQuiz`| Creating Quiz                         |
| GET         | `quiz/get/{id}`                          | Get quiz baesd on id                  |
| POST        | `quiz/submit/{id}`                       | submit the quiz to calculate the score|


---

## Setup Instructions

1. **Clone the repository**  

2.Configure database
Update your application.properties (or application.yml) file with your database credentials.

3.Build and run the application   
4.Test API using Postman
Use Postman to send requests to your endpoints (default URL: (http://localhost:8082/user)).You can change server port

Example API Request (Using Postman)
Create User (POST)
URL: http://localhost:8082/question/add
Body (JSON):

{
    "questionTitle": "Maximum value of short in java",
    "option1": "1",
    "option2": "2",
    "option3": "3",
    "option4": "4",
    "rightAnswer": "3",
    "difficultyLevel": "Easy",
    "category": "java"
  }
Getting quiz based on the id
URL: http:///localhost:8082/quiz/get/6

for submitting the answers we can use http://localhost:8082/quiz/submit/4 this post api with the body.
Body:
[
    {
        "id":5,
        "response":"A special method"
    },
    {
        "id":10,
        "response":"Ability to take multiple forms"
    },
    {
        "id":19,
        "response":"A linear data structure"
    },
    {
        "id":23,
        "response":"To execute code regardless of exceptions"
    },
	{
        "id":21,
        "response":"Java Virtual Machine"
    }
]
after submitting this we will get the quiz score.

Author
Divyasree Boli

bolidivyasree8522@gmail.com

https://github.com/Divyasree799-Dev



