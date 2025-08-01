package com.project.quizapp.Service;

import com.project.quizapp.Model.Question;
import com.project.quizapp.Model.QuestionWrapper;
import com.project.quizapp.Model.Quiz;
import com.project.quizapp.Model.Response;
import com.project.quizapp.Repository.QuestionRepo;
import com.project.quizapp.Repository.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    @Autowired
    QuizRepo quizRepo;
    @Autowired
    QuestionRepo questionRepo;

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {
        List<Question> questions=questionRepo.findRandomQuesionsByCategory(category,numQ);
            Quiz quiz = new Quiz();
            quiz.setTitle(title);
            quiz.setQuestions(questions);
            quizRepo.save(quiz);
            return new ResponseEntity<>("success", HttpStatus.CREATED);
    }


    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Optional<Quiz> quiz =quizRepo.findById(id);
        List<Question>questionsFromDb = quiz.get().getQuestions();
        List<QuestionWrapper> questinsForUsers = new ArrayList<>();
        for(Question q:questionsFromDb){
            QuestionWrapper qw = new QuestionWrapper(q.getId(),q.getQuestionTitle(),
                    q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
            questinsForUsers.add(qw);
        }

        return new ResponseEntity<>(questinsForUsers,HttpStatus.OK);
    }

    public ResponseEntity<Integer> calculateScore(Integer id, List<Response> response) {
        Quiz quiz = quizRepo.findById(id).get();
        List<Question> questions = quiz.getQuestions();
        int count=0;
        int q=0;
        for(Response r:response){
            if(r.getResponse().equals(questions.get(q).getRightAnswer()))
                count++;

            q++;
        }
        return new ResponseEntity<>(count,HttpStatus.OK);
    }
}
