song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score="";

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('poseNet is intialized')
}

function gotPoses(results){
    if(results.length > 0){
        score = results[0].pose.keypoints[9].score;
        scoreRight = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist"+ score);
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY);
    }
}


function draw(){
    image(video,0,0,600,500);
    if(score > 0.2){
        circle(leftWristX,leftWristY,20);
        numberLeftWristY=Number(leftWristY)
        remove_decimal=floor(numberLeftWristY)
        volume= remove_decimal/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML=volume;
    }
    if(scoreRight > 0.2){

    
    if(rightWristY >0 && rightWristY==100){
        document.getElementById("speed").innerHTML="Speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="Speed=1x";
        song.rate(1);
    }
    else if(rightWristY >200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="Speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY<400){
        document.getElementById("speed").innerHTML="Speed=2x";
        song.rate(2);
    }
    else if(rightWristY >400 && rightWristY <500){
        document.getElementById("speed").innerHTML="Speed=2.5x";
        song.rate(2.5);
    }
    else if(rightWristY >500 && rightWristY <600){
        document.getElementById("speed").innerHTML="Speed=3x";
        song.rate(3);
    }
}
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}