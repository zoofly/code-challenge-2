console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('addJokeButton').on('click', addJokes);

}




function addJokes(){
    console.log('Joke added');
    let whoseJoke =$('#whoseJokeIn').val();
    let jokeQuestion= $('#questionIn').val();
    let punchline = $('#punchlineIn').val();
    if(punchline=== ""){
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
                punchline

            } 
        }) .then( function ( res ){
            clearInputs();
            showHistory();
        }).catch ( function (err){
            console.log ('Error in sending equation', err);
        })
    }
    //create string and send it to server
    
    console.log('in addJokes... to be sent to server', whoseJoke, jokeQuestion, punchline);
}


function clearInputs(){
    console.log('inputs have been cleared');
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}




function showSolution(){
    $.ajax({
        type: 'GET',
        url: "/history"
    }).then (function(res){
        $('#solution').empty();
        $('#solution').append(res.answer);
        console.log('Response is', res)
    }).catch ( function (err){
        console.log ('Error in sending answer', err);
    })
}


function showHistory(){
    $.ajax({
        type: 'GET',
        url: "/calculation"
    }).then (function(res){
        for( let item of res){
            $('#calcHistory').append(`
            <li> ${item.numberOne} ${item.operator} ${item.numberTwo} = ${item.answer}</li>
            `);
        }
        console.log('History response is', res)
    }).catch ( function (err){
        console.log ('Error in sending answer', err);
    })
}