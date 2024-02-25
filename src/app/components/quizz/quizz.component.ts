import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = 'Titulo';
  questions:any[] = [];
  questionSelected:any; 

  options:any[] = [];
  answers:string[] = [];
  answerSelected:string = '';
  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor() { }

  async playerChoose(value:string){
    this.answers.push(value);
    this.questionIndex += 1;
    console.log(this.answers);
    if(this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      const finalAnswer:string = await this.getResults();
      this.finished = true;
      this.answerSelected =  quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    
    }
  }
  async getResults(){
    const result = this.answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous;
      }else{
        return current;
      }
    });
    return result;
  }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
      this.questionSelected = this.questions[this.questionIndex];
     
    }

  }

}
