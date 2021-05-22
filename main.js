song="";

function preload(){
    song=loadSound("music.mp3");

}

 scoreRightWrist=0;
 scoreLeftWrist=0;

RightWristx=0;
RightWristy=0;

LeftWristx=0;
LeftWristy=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('poseNet is initialized')
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist=" + scoreRightWrist + "scoreleftwrist=" + scoreLeftWrist );

        RightWristx=results[0].pose.rightWrist.x;
        RightWristy=results[0].pose.rightWrist.y;

console.log("rightwristx=" + RightWristx + "rightwristy=" + RightWristy)

       LeftWristx=results[0].pose.leftWrist.x;
        LeftWristy=results[0].pose.leftWrist.y;

console.log("leftwristx=" + LeftWristx + "Leftwristy=" + LeftWristy)
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2){
        circle(RightWristx,RightWristy,20);

        if(RightWristy>0 && RightWristy<=100){
            document.getElementById("speed").innerHTML="speed = 0.5x" ;
            song.rate(0.5);
        }
        else if(RightWristy>100 && RightWristy<=200){
            document.getElementById("speed").innerHTML="speed = 1x" ;
            song.rate(1);
        }
        else if(RightWristy>200 && RightWristy<=300){
            document.getElementById("speed").innerHTML="speed = 1.5x" ;
            song.rate(1.5);
        }
        else if(RightWristy>300 && RightWristy<=400){
            document.getElementById("speed").innerHTML="speed = 2x" ;
            song.rate(2);
        }
        else if(RightWristy>400 ){
            document.getElementById("speed").innerHTML="speed = 2.5x" ;
            song.rate(2.5);
        }

    }
    if(scoreLeftWrist>0.2){
        circle(LeftWristx,LeftWristy,20); 
        InNumberleftWristY = Number(LeftWristy);
         remove_decimals = floor(InNumberleftWristY);
          volume = remove_decimals/500;
      document.getElementById("volume").innerHTML = "Volume = " + volume; 
      song.setVolume(volume);

    }
}