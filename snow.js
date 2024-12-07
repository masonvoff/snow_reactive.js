/*!
// Snow.js - v0.0.3
// kurisubrooks.com
*/

// Amount of Snowflakes
var snowMax = 50;

// Snowflake Colours
var snowColor = ["#DDD", "#EEE"];

// Snow Entity
var snowEntity = "&#x2022;";

// Falling Velocity
var snowSpeed = 0.55;

// Minimum Flake Size
var snowMinSize = 8;

// Maximum Flake Size
var snowMaxSize = 24;

// Refresh Rate (in milliseconds)
var snowRefresh = 25;

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

// Initialize mouse position and radius of repulsion
var mouseX = -1;
var mouseY = -1;
var mouseRepulseRadius = 250;

// Snowflakes array
var snow = [],
    pos = [],
    coords = [],
    lefr = [],
    marginBottom,
    marginRight;

// Randomize function
function randomise(range) {
    return Math.floor(range * Math.random());
}

// Initialize snowflakes
function initSnow() {
    var snowSize = snowMaxSize - snowMinSize;
    marginBottom = document.body.scrollHeight - 5;
    marginRight = document.body.clientWidth - 15;

    for (let i = 0; i <= snowMax; i++) {
        coords[i] = 0;
        lefr[i] = Math.random() * 15;
        pos[i] = 0.03 + Math.random() / 10;
        snow[i] = document.getElementById("flake" + i);
        snow[i].style.fontFamily = "inherit";
        snow[i].size = randomise(snowSize) + snowMinSize;
        snow[i].style.fontSize = snow[i].size + "px";
        snow[i].style.color = snowColor[randomise(snowColor.length)];
        snow[i].style.zIndex = -1;
        snow[i].sink = snowSpeed * snow[i].size / 5;
        snow[i].posX = randomise(marginRight - snow[i].size);
        snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
        snow[i].style.left = snow[i].posX + "px";
        snow[i].style.top = snow[i].posY + "px";
    }

    moveSnow();
}

// Resize handler
function resize() {
    marginBottom = document.body.scrollHeight - 5;
    marginRight = document.body.clientWidth - 15;
}

// Mousemove event to track cursor position
document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// Snowflake movement function
function moveSnow() {
    for (let i = 0; i <= snowMax; i++) {
        coords[i] += pos[i];
        snow[i].posY += snow[i].sink;


        var distanceX = snow[i].posX - mouseX;
        var distanceY = snow[i].posY - mouseY;
        var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Repel the snowflake when close to the mouse
        if (distance < mouseRepulseRadius) {
            var repelForce = (mouseRepulseRadius - distance) / mouseRepulseRadius;
            snow[i].posX += (distanceX / distance) * repelForce * 10;
            snow[i].posY += (distanceY / distance) * repelForce * 10;
        }

        // Apply normal motion and wrapping behavior
        snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
        snow[i].style.top = snow[i].posY + "px";

        // Reset snowflake position when it falls off screen
        if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
            snow[i].posX = randomise(marginRight - snow[i].size);
            snow[i].posY = 0;
        }
    }

    setTimeout(moveSnow, snowRefresh);
}

// Generate snowflakes
for (let i = 0; i <= snowMax; i++) {
    document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
}

// Event listeners
window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);
