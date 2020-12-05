class animations {
    loading() {
        const canvas = document.createElement("canvas");
        const loadDom = document.getElementById("message");
        canvas.width = 200;
        canvas.height = 200;
        loadDom.appendChild(canvas);

        const ctx = canvas.getContext("2d");

        const bigCircle = {
            center: {
                x: 100,
                y: 100
            },
            radius: 50,
            speed: 4
        };

        const smallCircle = {
            center: {
                x: 100,
                y: 100
            },
            radius: 30,
            speed: 2
        };

        let progress = 0;

        function loading() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            progress += 0.01;
            if (progress > 1) {
                progress = 0;
            }

            drawCircle(bigCircle, progress);
            drawCircle(smallCircle, progress);

            requestAnimationFrame(loading);
        }
        loading();

        function drawCircle(circle, progress) {
            ctx.beginPath();
            const start = accelerateInterpolator(progress) * circle.speed;
            const end = decelerateInterpolator(progress) * circle.speed;
            ctx.arc(circle.center.x, circle.center.y, circle.radius, (start - 0.5) * Math.PI, (end - 0.5) * Math.PI);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#2e3440";
            ctx.stroke();
        }

        function accelerateInterpolator(x) {
            return x * x;
        }

        function decelerateInterpolator(x) {
            return 1 - ((1 - x) * (1 - x));
        }

        this.open("message");
    }

    close(element) {
        let domElement = document.getElementById(element);
        let op = 1;  // initial opacity
        const timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                domElement.style.display = 'none';
            }
            domElement.style.opacity = op;
            domElement.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.5;
        }, 50);
        clearTimeout();
    }

    forceClose(element) {
        let domElement = document.getElementById(element);
        domElement.style.display = 'none';
        clearTimeout();
    }

    open(element) {
        let domElement = document.getElementById(element);
        domElement.style.display = 'block';
        let op = 0.1;  // initial opacity
        domElement.classList.replace("close", "open");
        const timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            domElement.style.opacity = op;
            domElement.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }
}