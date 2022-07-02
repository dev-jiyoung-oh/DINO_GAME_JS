var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let SIZE = 50;
let BOTTOM = Math.ceil(canvas.height*(3/4));
/*
var dinoImg = new Image();
dinoImg.src = 'dino.png';
*/
// 공룡
var dino = {
    x : 10,
    y : BOTTOM,
    width : SIZE,
    height : SIZE,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(dinoImg, this.x, this.y);
    }
};

// 장애물
class Cactus {
    constructor(){
        this.x = canvas.width + SIZE;
        this.y = BOTTOM;
        this.width = SIZE;
        this.height = SIZE;
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
    
    if (timer % 150 === 0) {
        var cactus = new Cactus();
        cactuss.push(cactus);
    }
    
    cactuss.forEach((a, i, o)=>{
        // 장애물의 x좌표가 0 미만이면 제거
        if (a.x < -SIZE) {
            o.splice(i, 1);
        }
        a.x--;

        collisionCheck(dino, a);

        a.draw();
    });
    
    if (isJumping == true) {
        dino.y -= 2;
        jumpTimer++;
    }
    if (isJumping == false && dino.y < BOTTOM) {
        dino.y += 2;
    }
    if (jumpTimer > 80) {
        isJumping = false;
        jumpTimer = 0;
    }

    dino.draw();
}

play();


// 충돌 확인
function collisionCheck(dino, cactus) {
    var xD = cactus.x - (dino.x + dino.width) + (cactus.x < 0 ? cactus.width : 0);
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
    if (e.code === 'Space' && dino.y == BOTTOM) {
        isJumping = true;
    }
});

// 재시작 버튼 클릭 시
var restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", function() {
    this.blur();
    cancelAnimationFrame(animation);
    initData();
    play();
});

function initData() {
    isJumping = false;
    jumpTimer = 0;
    dino.y = BOTTOM;
    cactuss = [];
}