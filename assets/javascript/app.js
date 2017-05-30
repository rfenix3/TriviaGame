$(document).ready(function() {

  var questions = [{
    question: "Which city is the only city in the world situated on two continents?",
    choices: ["Mongolia", "Berlin", "Istanbul", "Moscow", "Jakarta"],
    correctAnswer: 2
  }, {
    question: "Which countries share the longest border in the world?",
    choices: ["India & Bangladesh", "China & Mongolia", "Russia & Kazakhstan", "Argentina & Chile", "USA & Canada"],
    correctAnswer: 4
  }, {
    question: "Which desert is the biggest desert in the world, outside the Polar region?",
    choices: ["Sahara Desert", "Gobi Desert", "Great Victoria Desert", "Kalahari Desert", "Patagonian Desert"],
    correctAnswer: 0
  }, {
    question: "Which is the longest continental mountain range in the world?",
    choices: ["Rocky Mountains, North America", "Himalayas, Asia", "Great Dividing Range, Australia", "The Andes, South America", "Great Escarpment, Africa"],
    correctAnswer: 3
  }, {
    question: "Which is the world's largest country in size (area)?",
    choices: ["USA", "India", "China", "Canada", "Russia"],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display timer

  var j;
  var c;
  var t;
  var timer_is_on = 0;

  function timedCount() {
    $("#timer").text(c + ' seconds');
    if (c === 0){
      // The following lines stops the counter and exits the countdown function when counter hits 0 seconds.
      clearTimeout(t);
      timer_is_on = 0;
      $("#timer").val("Time's up!");
      displayAnswer();
      return;
    };
    c = c - 1;
    t = setTimeout(function(){ timedCount() }, 1000);
  }

  function startCount() {
    c = 10;
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
  }

  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      $('#notice').text('Please make a selection!');
    } else {
      displayAnswer();
    }
  });
   
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    $('#timer').show();
    $('#notice').show();
    $('#notice').text('Message');
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();

        // The following 3 lines resets the timer
        clearTimeout(t);
        timer_is_on = 0;        
        startCount();

        $('#next').show();
        $('#notice').text('Message');        

        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#start').show();
        $('#timer').hide();
        $('#notice').hide()
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }

  // Displays the answer either after user clicks the next button or when time runs out
  function displayAnswer(){

      // Variable j will give us the index of correct answer in the questions.choices array.
      j = questions[questionCounter].correctAnswer;

      console.log('questionCounter: ' + questionCounter);
      console.log('selections data (selection index): ' + selections[questionCounter]);
      console.log('j value is: ' + j);

      // The following if-else statement will alert the user if anwer is correct or not.
      if (selections[questionCounter] === j) {
        alert('Congratulations! Your answer is correct!');
      } else {
        console.log('The correct answer is:' + questions[questionCounter].choices[j]);
        alert('The correct answer is:' + questions[questionCounter].choices[j]);
      }

      questionCounter++;
      displayNext();
  }



});