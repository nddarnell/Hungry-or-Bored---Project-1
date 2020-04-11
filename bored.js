$(document).ready(function(){
    let allType = ["education", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
    
    var num = Math.floor(Math.random()*6)+1
    console.log(num);

    let boredType = allType[num];
    console.log(boredType);

function searchActivity(){

    let boredURL= "https://www.boredapi.com/api/activity?participants=1&type=" + boredType

    $.ajax({
        url:boredURL,
        method:"GET"
    }).then(function(activity){
        console.log(activity);

    })
    

};




})