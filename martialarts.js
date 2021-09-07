let c = document.getElementById("MartialArts") //ID inserted in html
let ctx = c.getContext("2d");

let loadImage = (src,callback)=>{
let img = document.createElement("img");
img.onload = () => callback(img);
img.src = src;
};

let imagePath = (frameNumber,animation) => {
    return"./images/" + animation +"/" + frameNumber + ".png";
    //return'images/backward/1.png';
};

let frames = {
    idle:[1,2,3,4,5,6,7,8],
    kick: [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7],
    forward: [1,2,3,4,5,6],
    block: [1,2,3,4,5,6,7,8,9],
    backward:[1,2,3,4,5,6],
};

let loadImages = (callback) => {
let images = {idle:[], kick:[], punch:[], forward:[], block:[], backward:[]};
let imagesToLoad = 0;

["idle", "kick", "punch", "forward", "block", "backward"].forEach((animation)=>{
    let animationFrames = frames[animation];
    imagesToLoad = imagesToLoad + animationFrames.length;

    animationFrames.forEach((frameNumber)=>{
        let path = imagePath(frameNumber,animation);

        loadImage(path, (image) => {
            images[animation][frameNumber-1] = image;
            imagesToLoad = imagesToLoad-1;
            
            if (imagesToLoad===0){
                callback(images);
            }
        });
    });
});
};

let animate = (ctx,images,animation,callback) => {
    images[animation].forEach((image,index) => {
        setTimeout(() => {
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        }, index*100);
        });
        setTimeout(callback,images[animation].length * 100);
    };
    loadImages((images)=> {
        //let selectedAnimation = "idle";
        let queuedAnimations = [];
        let aux = () =>{
            //animate(ctx,images,selectedAnimation,aux)
            let selectedAnimation;
            if (queuedAnimations.length===0){
                selectedAnimation = "idle";
            }
            else {
                selectedAnimation = queuedAnimations.shift();
            }
            animate(ctx,images,selectedAnimation,aux);
        };
        
        aux();
        document.getElementById("kick").onclick = () =>{
            //selectedAnimation = "kick";
            queuedAnimations.push("kick");
        };
        document.getElementById("punch").onclick = () =>{
            //selectedAnimation = "punch";
            queuedAnimations.push("punch");
        };
        document.getElementById("block").onclick = () =>{
            //selectedAnimation = "block";
            queuedAnimations.push("block");
        };
        document.getElementById("forward").onclick = () =>{
            //selectedAnimation = "forward";
            queuedAnimations.push("forward");
        };
        document.getElementById("backward").onclick = () =>{
            //selectedAnimation = "backward";
            queuedAnimations.push("backward");
        };
  });
