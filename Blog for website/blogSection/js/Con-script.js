$(function() {
    $(".navbar-toggler").on("click", function(e) {
        $(".tm-header").toggleClass("show");
        e.stopPropagation();
      });
    
      $("html").click(function(e) {
        var header = document.getElementById("tm-header");
    
        if (!header.contains(e.target)) {
          $(".tm-header").removeClass("show");
        }
      });
    
      $("#tm-nav .nav-link").click(function(e) {
        $(".tm-header").removeClass("show");
      });
      
});



document.getElementById('commentForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission

  var name = document.getElementById('name').value;
  var message = document.getElementById('message').value;

  var comment = document.createElement('div');
  comment.classList.add('comment');
  
  comment.innerHTML = '<h3>' + name + '</h3><p>' + message + '</p>';
  
  document.getElementById('comments').appendChild(comment);
  
  document.getElementById('name').value = '';
  document.getElementById('message').value = '';
  
  
});

function search() {
	let input = document.getElementById('search-item').value
	input=input.toLowerCase();
	let x = document.getElementsByClassName('blog');
	
	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display="none";
		}
		else {
			x[i].style.display="list-item";				
		}
	}
}
