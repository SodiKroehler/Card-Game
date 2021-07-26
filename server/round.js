

class Round {
    constructor(gameId) {
        console.log('Initializing round of gameId', gameId);
        //this.timeLeft = 60;
        this.gameId = gameId;
        this.chooser=
        this.timestamp = Date.now();

        // Start countdown when class is instantiated
        //this.startCountdown();
    }

    /*startCountdown() {
        const countdown = setInterval(() => {
            // broadcast to every client
            io.sockets.in(this.gameId).emit(actions.ROUND_TIMER, { gameId: this.gameId, timeLeft: this.timeLeft });
            if (this.timeLeft === 0) {
                // when no time left, stop counting down
                clearInterval(countdown);
                this.onRoundEnd();
            } else {
                // Countdown
                this.timeLeft -= 1;
                console.log('Countdown', this.timeLeft);
            }
        }, 1000);
    }*/
}

module.exports = Round;
