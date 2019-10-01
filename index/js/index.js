// brick animation
var time = 0;
console.log(time);
for (let index = 0; index < 1000; index++) {
    for (i = 0; i <= 14; i++) {
        var brick = '.brick' + i;
        time += 0.25;
        TweenMax.to(brick, 0.5, {
            y: 0,
            delay: time,
            ease: Linear.easeNone,
            opacity: 1,
        });
    }
    time += 0.5;
    console.log(time);
    for (i = 14; i >= 0; i--) {
        var brick = '.brick' + i;
        time += 0.25;
        TweenMax.to(brick, 0.5, {
            y: -40,
            delay: time,
            ease: Linear.easeNone,
            opacity: 0,
        });
    }
    time += 0.5;
    console.log(time);
}

// Gear animation
TweenMax.to(".gear", 3, {
    rotation: -360,
    transformOrigin: "50%, 50%",
    repeat: -1,
    ease: Linear.easeNone
});
TweenMax.to(".gear1", 5, {
    rotation: 360,
    transformOrigin: "50%, 50%",
    repeat: -1,
    ease: Linear.easeNone
});

// hammer animation
TweenMax.to(".hammer", 2, {
    rotation: 50,
    transformOrigin: "50%, 50%",
    repeat: -1,
    yoyo: true,
    ease: Power3.easeIn
});

// color animation 
TweenMax.to(".color", 1, {
    x: -30,
    y: -30,
    repeat: -1,
    yoyo: true,
    ease: Linear.easeNone
});

// lifter animation
TweenMax.to(".lifter", 4.25, {
    y: 30,
    repeat: -1,
    yoyo: true,
    ease: Linear.easeNone
});
TweenMax.from(".tyre", 3, {
    rotation: 360,
    transformOrigin: "50%, 50%",
    repeat: -1,
    ease: Linear.easeNone
});