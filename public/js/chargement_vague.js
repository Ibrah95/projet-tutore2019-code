
var BG = {}; // BAR GRAPH window object

// RESPONSIVE
BG.responsive = function (percentage, duration) {
    // Animate bar graph
    var count1 = 0
        , bar = document.querySelector('#progress-responsive-bar')
        , interval1 = (Math.floor(duration / percentage) / 2)
        , incrementer1 = setInterval(function () {
            (count1 <= percentage) ? (bar.style.width = count1 + "%", count1 += 0.5) : clearInterval(incrementer1);
        }, interval1);
    // Animate percent number
    var count2 = 0
        , percent = document.querySelector('#progress-responsive-percent')
        , interval2 = Math.floor(duration / percentage)
        , incrementer2 = setInterval(function () {
            (count2 <= percentage) ? (percent.textContent = count2 + "%", count2++) : clearInterval(incrementer2);
            if (count2 === 100) window.location.replace(`/ecran`);
        }, interval2);
};

BG.init = function () {
    BG.responsive(100, 5000); // Percentage, duration
};

BG.init();
