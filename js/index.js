/**
* Setup a variable for different purpose
* @captcha holds value of captcha class
* @checkbox holds value of checkbox
* That indicates robot or not
* @crossBtn is the identify of alert's dismiss button
* @btn indicates a button that work for forwarding
* @displayAlrt for holding alert class of HTML
* @displayScs for holding success class of HTML
* @container indicates total body where all things are written
* @warningMsg for handling warning massage
* @sockMsg for handling sock massage
* @progress is handling for progress bar container
* @progressBar is data of progress bar
* @vibrationIntvl for holding setInterval value
**/
let captcha = document.querySelector(".captcha");
let checkbox = document.getElementById("check");
let crossBtn = document.getElementById("crossBtn");
let btn = document.querySelector(".btn");
let displayAlrt = document.querySelector(".alert");
let displayScs = document.querySelector(".success");
let container = document.querySelector(".container");
let warningMsg = document.querySelector(".warning_msg");
let sockMsg = document.querySelector(".sock_msg");
let progress = document.querySelector(".progress");
let progressBar = document.querySelector(".progress_bar");
let vibrationIntvl;

/**
* We check the captcha that is checked
* Or not
* If captcha is checked then unchecked
* Or checked
**/
captcha.addEventListener('click', () => {
    if (checkbox.checked === false) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }
});

/**
* "Lets Go" button works under this rules
* If captcha is not checked then we show
* A big warning with vibration
* And backdrop of warning are going to bare
* If captcha is checked then original games are start now
* And If transfer are stopped showing a success massage
**/
btn.addEventListener("click", () => {
    displayAlrt.style.display = "block";
    container.style.filter = "blur(15px)";
    if (!checkbox.checked) {
        crossBtn.style.display = "block";
        warningMsg.style.display = "block";
        sockMsg.style.display = "none";

        /**
        * Vibrating phone on a pattern
        * By using setInterval
        * In every 1.5s
        * And store setInterval in a variable
        * So that we can clear the interval
        **/
        vibrationIntvl = setInterval(() => {
            navigator.vibrate(1000);
        }, 1500);
    } else {
        crossBtn.style.display = "none";
        warningMsg.style.display = "none";
        sockMsg.style.display = "flex";

        let progressCtnWidth = progress.offsetWidth;
        let progressBarWidth = progressBar.offsetWidth;
        /**
        * Start checking for progress bar values after 100mili second
        * If transfer are completed then show the success massage
        * And clear the interval
        **/
        let showSuccess = setInterval(() => {
            if (progressBarWidth >= progressCtnWidth) {
                displayAlrt.style.display = "none";
                container.style.filter = "blur(15px)";
                displayScs.style.display = "block";

                /**
                * After 5s success dialogue will remove
                * And look like original page
                **/
                setTimeout(() => {
                    displayAlrt.style.display = "none";
                    container.style.filter = "blur(0px)";
                    displayScs.style.display = "none";
                }, 5000);
                clearInterval(showSuccess);
            }
            progressBarWidth = progressBar.offsetWidth;
        },
            100);
    }
});

/**
* Alert dismiss button
* It will perform stopping vibration And
* To look back at orginal display
**/
crossBtn.addEventListener('click', () => {
    displayAlrt.style.display = "none";
    container.style.filter = "none";

    /**
    * If setInterval is stored in
    * A variable, we clear the interval
    * And generally stop vibration
    * Manually
    **/
    if (vibrationIntvl) {
        clearInterval(vibrationIntvl);
    }
    navigator.vibrate(0);
});