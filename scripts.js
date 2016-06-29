$('body').css('background-color',"#2c3e50");


// Find Mid Night's time

var midnight = new Date();
midnight.setHours( 24 );
midnight.setMinutes( 0 );
midnight.setSeconds( 0 );
midnight.setMilliseconds( 0 );

var tonight = midnight.getTime();



// Load content from Any Do

var tasks;

$.ajax({
  url: 'https://sm-prod2.any.do/me/tasks?responseType=flat&includeDeleted=false&includeDone=false'
}).done(function(data){

  console.log(data);

    // Generate Tasks List
    tasks = "<ul class='taskList'>";
    for (var i = 0; i < data.length; i++) {
      if(data[i].parentGlobalTaskId == null){ // If it is not sub task
        if(data[i].dueDate < tonight){ // If it is Today's task
          if(data[i].status == "UNCHECKED"){ // If it is UNCHECKED Task
            tasks += "<li>"+data[i].title+"</li>";
          }
        }
      }
    }
    tasks += "</ul>";
    $('h1').html("Today's tasks");
    $('#tasks').html(tasks);


}).error(function(err){
  if(err.status == 401){
    var tasks = "<a href='http://web.any.do' class='loginWithAnyDo'> Login with Any.Do </a>";
    $('h1').html("");
    $('#tasks').addClass('unauthorized');
    $('#tasks').html(tasks);
  }
});
