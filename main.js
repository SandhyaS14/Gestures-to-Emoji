Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
}); 
camera = document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src =" + data_uri + ">";
    });
}

console.log("ml5.version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HbpcveWJj/model.json", model_loaded);

function model_loaded() {
    console.log("model loaded.");
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, getResult);
}

prediction1 = "";
prediction2 = "";
function getResult(error, results){
    if(error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label; 
        if(results[0].label == "Peace"){
            document.getElementById("update_emoji").innerHTML = "&#9996";
        }
        else if(results[0].label == "Thumbs-up"){
            document.getElementById("update_emoji").innerHTML = "&#128077";
        }
        else if(results[0].label == "Awesome"){
            document.getElementById("update_emoji").innerHTML = "&#128076"
        }

        if(results[1].label == "Peace"){
            document.getElementById("update_emoji2").innerHTML = "&#9996";
        }
        else if(results[1].label == "Thumbs-up"){
            document.getElementById("update_emoji2").innerHTML = "&#128077";
        }
        else if(results[1].label == "Awesome"){
            document.getElementById("update_emoji2").innerHTML = "&#128076"
        }
        speak();
    }
}

function speak() {
    synth = window.speechSynthesis;
    speak1 = "The first prediction is " + prediction1;
    speak2 = " and the second prediction is  " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);
}