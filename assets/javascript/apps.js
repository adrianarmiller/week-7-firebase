$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyC0yq0eBA9ipbsMAZoVt8U9pRN1u4rpHZM",
        authDomain: "traintime-dbb35.firebaseapp.com",
        databaseURL: "https://traintime-dbb35.firebaseio.com",
        projectId: "traintime-dbb35",
        storageBucket: "traintime-dbb35.appspot.com",
        messagingSenderId: "384568990148"
      };

      firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit-info").on("click", function(){
        event.preventDefault();

        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-time").val().trim();
        frequency = $("#frequency").val().trim();

        console.log(name, destination, firstTrain, frequency);

        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            
        });
    });

    database.ref().on("child_added", function(snapshot) {

        console.log(snapshot.val());
      
        let trainName = snapshot.val().name;
        let trainDest = snapshot.val().destination;
        let trainTime = snapshot.val().firstTrain;
        let trainFreq = snapshot.val().frequency;
      
        console.log(trainName);
        console.log(trainDest);
        console.log(trainTime);
        console.log(trainFreq);


        //thanks for the help here!
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        arrival = moment(nextTrain).format("hh:mm");
      
 
        $("#show-here > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFreq+ "</td><td>" + arrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");
      });

      dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

        console.log(snapshot.val());
      
        let trainName = snapshot.val().name;
        let trainDest = snapshot.val().destination;
        let trainTime = snapshot.val().firstTrain;
        let trainFreq = snapshot.val().frequency;
      
        console.log(trainName);
        console.log(trainDest);
        console.log(trainTime);
        console.log(trainFreq);


        //thanks for the help here!
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        var arrival = moment(nextTrain).format("hh:mm");
      
 
        $("#show-here > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFreq+ "</td><td>" + arrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");
        
      });
  
      
      

})