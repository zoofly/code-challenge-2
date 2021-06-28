console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJokes);
    showJokes();

}




function addJokes(){
    console.log('Joke added');
    let whoseJoke =$('#whoseJokeIn').val();
    let jokeQuestion= $('#questionIn').val();
    let punchLine = $('#punchlineIn').val();
    if(punchLine=== ""){
        alert('Where is the punchline?');
    } else if(whoseJoke=== ""){
        alert ('Whose joke is this?');
    } else if( jokeQuestion=== ""){
        alert('What?')
     } else {
        //sending objects to server 
        $.ajax({
            type:"POST",
            url: "/jokeCache",
            data:{
                
                whoseJoke,
                jokeQuestion,
                punchLine

            } 
        }) .then( function ( res ){
            clearInputs();
            newJoke();
        }).catch ( function (err){
            console.log ('Error in sending equation', err);
        })
    }
   // create string and send it to server
    
    console.log('in addJokes... to be sent to server', whoseJoke, jokeQuestion, punchLine);
}


function clearInputs(){
    console.log('inputs have been cleared');
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}



function showJokes(){
    $.ajax({
        type: 'GET',
        url: "/jokes"
    }).then (function(res){
        for( let joke of res){
            $('#outputDiv').append(`
            <p> ${joke.whoseJoke} ${joke.jokeQuestion} ${joke.punchLine} </p>
            `);
        }
        console.log('Jokes are', res)
    }).catch ( function (err){
        console.log ('Error in sending jokes', err);
    })
}

function newJoke(){
    $.ajax({
        type: 'GET',
        url: "/jokeCache"
    }).then (function(res){
        // $('#solution').empty();
        $('#outputDiv').append(`<p> ${joke.whoseJoke} ${joke.jokeQuestion} ${joke.punchLine} </p>`);
        console.log('Response is', res)
    }).catch ( function (err){
        console.log ('Error in sending answer', err);
    })
}