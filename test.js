function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000);
    return sleep(randomTime);
}

