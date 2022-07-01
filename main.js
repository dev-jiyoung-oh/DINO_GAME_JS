var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

/*
var dinoImg = new Image();
dinoImg.src = 'dino.png';
*/
// 공룡
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(dinoImg, this.x, this.y);
    }
};


// 장애물
class Cactus {
    constructor(){
        this.x = 400;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


var timer = 0;
var cactuss = [];
var animation;

function play(){
    animation = requestAnimationFrame(play);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (timer % 120 === 0) {
        var cactus = new Cactus();
        cactuss.push(cactus);
    }
    
    cactuss.forEach((a, i, o)=>{
        // 장애물의 x좌표가 0 미만이면 제거
        if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x--;

        collisionCheck(dino, a);

        a.draw();
    })
    
    if (isJumping == true) {
        dino.y -= 2;
        jumpTimer++;
    }
    if (isJumping == false) {
        if (dino.y < 200) {
            dino.y += 2;
        }
    }
    if (jumpTimer > 100) {
        isJumping = false;
        jumpTimer = 0;
    }

    dino.draw();
}

play();


// 충동확인
function collisionCheck(dino, cactus) {
    var xD = cactus.x - (dino.x + dino.width);
    var yD = cactus.y - (dino.y + dino.height);
    if (xD < 0 && yD < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}


// 점프
var isJumping = false;
var jumpTimer = 0;
document.addEventListener('keydown', function(e){
    if (e.code === 'Space' && !isJumping) {
        isJumping = true;
    }
});