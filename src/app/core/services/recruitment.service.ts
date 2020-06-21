import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  public data =  new BehaviorSubject([]);
  uiquestions: any[] = [{
    "questions": "How does Angular 4 improved error handling, when an error is caused by something in a template?",
    "code": null,
    "options": [ "By enabling TypeScripts StrictNullChecks", "By creating flattened versions of Angular modules", "By generating source maps in terms of original template", "None of the mentioned"],
    "answer": null
  }, 
  
  {
    "questions": "The . . . . . decorator allows us to define the pipe name that is globally available for use in any template in the across application.",
    "code": null,
    "options": [ "pipeName", "pipeDeco", "Pipe", "None"],
    "answer": null
  }, {
    "questions": "Predict the output of the following JavaScript code.",
    "code": "<script type= 'text/javascript'> var a ='GeeksforGeeks'; var x = a.lastIndexOf('G') document.write(x); </script> ",
    "options": [ "8", "0", "9", "Error"],
    "answer": null
  },
  {
    "questions": "How would you display a list of Employees on a webpage along with where they were in the list?",
    "code": null,
    "options": [ "Loop through and print the index", "Loop through and print the employees", "Loop through and print the index and the employee", "Pass both the index and the employee to a web service"],
    "answer": null
  },
  {
    "questions": "If you chain multiple pipes together, they are executed",
    "code": null,
    "options": [ "in parallel", "LIFO order", "in the order in which you specify them", "None of above"],
    "answer": null
  },
  {
    "questions": "Which of the following is not built-in pipe in Angular?",
    "code": null,
    "options": [ "DatePipe", "CurrencyPipe", "DataPipe", "PercentPipe"],
    "answer": null
  },
  {
    "questions": "How would you retrieve a list of items from a server's URL?",
    "code": null,
    "options": [ "Create a URL transaction", "Use the HTTP get method", "Create a get SQL statement", "Use an HTTP package"],
    "answer": null
  },
  {
    "questions": "The number pipe is location sensitive, which means that the same format argument will produce differently formatted results based on the ",
    "code": null,
    "options": [ "user's format setting", "user's currency setting", ". user's locale setting", "All of above"],
    "answer": null
  },
  {
    "questions": "We can subscribe to an observable using the . . . . . . . . The benefit of this is that Angular deals with your subscription during the lifecycle of a component. Angular will automatically subscribe and unsubscribe for you",
    "code": null,
    "options": [ "sync pipe", "async var", "async pipe", "syn var"],
    "answer": null
  },
  {
    "questions": "Which of the following is not a reserved word in JavaScript?",
    "code": null,
    "options": [ "interface", "throws", "program", "short"],
    "answer": null
  },
  {
    "questions": "Which was the first browser to support JavaScript?",
    "code": null,
    "options": [ "Mozilla Firefox", "Netscape", "Google Chrome", "IE"],
    "answer": null
  }];
  constructor() { }
  getUIData(): Observable<any> {
    return of(this.uiquestions);
  }
}
