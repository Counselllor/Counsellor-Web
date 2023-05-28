document.addEventListener('DOMContentLoaded', function() {
    // Get all question elements
    const questions = document.querySelectorAll('.question');
  
    // Add click event listener to each question
    questions.forEach(question => {
      question.addEventListener('click', () => {
        // Toggle active class on the clicked question
        question.classList.toggle('active');
  
        // Get the corresponding answer element
        const answer = question.nextElementSibling;
  
        // Toggle the visibility of the answer
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
        } else {
          // Calculate the height needed to display the answer content
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  });
  