const music =
document.getElementById("music");

const heartbeat =
document.getElementById("heartbeat");

const glitchSound =
document.getElementById("glitchSound");

const startButton =
document.getElementById("startButton");

function vibrate(ms){

    if(navigator.vibrate){

        navigator.vibrate(ms);

    }

}

startButton.addEventListener("click", () => {

    music.volume = 0.12;
    music.play().catch(() => {});

    heartbeat.volume = 0.08;
    heartbeat.play().catch(() => {});

    document.body.style.transition = "1s";
    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.innerHTML = `

        <div class="loading-screen">

            <h1>initializing GR.N.007...</h1>

            <div class="loading-bar">

                <div class="progress"></div>

            </div>

            <p id="percent">0%</p>

        </div>

        `;

        document.body.style.opacity = "1";

        startLoading();

    }, 1000);

});

function startLoading(){

    let progress = document.querySelector(".progress");
    let percent = document.getElementById("percent");

    let count = 0;

    let interval = setInterval(() => {

        count += Math.floor(Math.random() * 12);

        if(count >= 100){

            count = 100;

            clearInterval(interval);

            setTimeout(() => {

                music.volume = 0.02;

                heartbeat.volume = 0.15;

                glitchSound.volume = 0.45;
                glitchSound.play().catch(() => {});

                vibrate([200,100,200]);

                document.body.innerHTML = `

                <div class="fear-screen">

                    <div class="glitch super-glitch"
                    data-text="испугалась?..">

                        испугалась?..

                    </div>

                    <div class="buttons">

                        <button onclick="fearAnswer('yes')">
                            да...
                        </button>

                        <button onclick="fearAnswer('no')">
                            нет
                        </button>

                    </div>

                </div>

                `;

                setTimeout(() => {

                    const glitch =
                    document.querySelector(".glitch");

                    if(glitch){

                        glitch.classList.remove("super-glitch");

                    }

                }, 5000);

            }, 1000);

        }

        progress.style.width = count + "%";
        percent.innerText = count + "%";

    }, 300);

}

function fearAnswer(answer){

    if(answer === "yes"){

        document.body.innerHTML = `

        <div class="response-screen">

            <h1>
                прости 😅
            </h1>

            <p>
                просто хотелось твоего внимания
            </p>

            <button onclick="nextScene()">
                дальше
            </button>

        </div>

        `;

    }

    else{

        document.body.innerHTML = `

        <div class="response-screen">

            <h1>
                вот это уже опасно 😶
            </h1>

            <button onclick="nextScene()">
                дальше
            </button>

        </div>

        `;

    }

}

function nextScene(){

    glitchSound.pause();

    glitchSound.currentTime = 0;

    music.volume = 0.25;

    music.play().catch(() => {});

    heartbeat.volume = 0.01;

    document.body.innerHTML = `

    <div class="warm-screen">

        <div class="petals"></div>

        <div class="warm-content">

            <h1 id="warmTitle"></h1>

            <p id="warmText"></p>

            <p id="warmText2"></p>

        </div>

    </div>

    `;

    createPetals();

    typeText(
        "warmTitle",
        "тогда я рад 🌸",
        80
    );

    setTimeout(() => {

        typeText(
            "warmText",
            "день без твоего сообщения какой-то не такой",
            40
        );

    }, 2000);

    setTimeout(() => {

        typeText(
            "warmText2",
            "пиши мне чаще... а то я замерзаю 😶",
            40
        );

    }, 6000);

    setTimeout(() => {

        const content =
        document.querySelector(".warm-content");

        content.innerHTML += `

        <div class="final-message">

            <p id="voiceText"></p>

            <div class="final-buttons">

                <button onclick="finalChoice('call')">
                    позвони мне
                </button>

                <button onclick="finalChoice('later')">
                    давай позже
                </button>

                <button onclick="finalChoice('shy')">
                    засмущал 😶
                </button>

            </div>

        </div>

        `;

        typeText(
            "voiceText",
            "и теперь я хочу услышать твой голос...",
            40
        );

    }, 11000);

}

function typeText(id, text, speed){

    let element = document.getElementById(id);

    let i = 0;

    let interval = setInterval(() => {

        if(i < text.length){

            element.innerHTML += text[i];

            i++;

        } else {

            clearInterval(interval);

        }

    }, speed);

}

function createPetals(){

    const petals =
    document.querySelector(".petals");

    for(let i = 0; i < 25; i++){

        let petal =
        document.createElement("div");

        petal.classList.add("petal");

        petal.style.left =
        Math.random() * 100 + "vw";

        petal.style.animationDuration =
        5 + Math.random() * 5 + "s";

        petal.style.animationDelay =
        Math.random() * 5 + "s";

        petals.appendChild(petal);

    }

}

function finalChoice(choice){

    if(choice === "call"){

        heartbeat.volume = 0.25;

        heartbeat.play().catch(() => {});

        vibrate([100,50,100,50,200]);

        document.body.innerHTML = `

        <div class="response-screen">

            <h1>
                я буду ждать 🌸
            </h1>

            <p>
                правда хочу встретиться
            </p>

            <a href="tel:+380508692550">

                <button class="call-button">
                    позвонить мне 📞
                </button>

            </a>

            <br><br>

            <button onclick="endScene()">
                завершить соединение
            </button>

        </div>

        `;

    }

    if(choice === "later"){

        heartbeat.volume = 0.03;

        document.body.innerHTML = `

        <div class="response-screen">

            <h1>
                хорошо 🌸
            </h1>

            <p>
                тогда до скорого
            </p>

            <button onclick="endScene()">
                выйти
            </button>

        </div>

        `;

    }

    if(choice === "shy"){

        heartbeat.volume = 0.05;

        document.body.innerHTML = `

        <div class="response-screen">

            <h1>
                mission complete 😎
            </h1>

            <p>
                ты была слишком милой
            </p>

            <button onclick="endScene()">
                срочно сбежать
            </button>

        </div>

        `;

    }

}

function endScene(){

    heartbeat.volume = 0;

    music.pause();

music.currentTime = 0;

    document.body.style.transition =
    "1.5s";

    document.body.style.opacity =
    "0";

    setTimeout(() => {

        document.body.innerHTML = `

        <div style="
            width:100vw;
            height:100vh;
            background:black;
            display:flex;
            justify-content:center;
            align-items:center;
            color:#444;
            font-size:14px;
            letter-spacing:3px;
            font-family:monospace;
        ">

            CONNECTION LOST

        </div>

        `;

        document.body.style.opacity =
        "1";

        setTimeout(() => {

            document.body.style.transition =
            "0.2s";

            document.body.style.opacity =
            "0";

        }, 1500);

    }, 1500);

}