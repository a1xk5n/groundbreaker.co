export default class Waiter {
    constructor(func) {
        this.innerFunc = func;
        this.timer = null;
    }

    start = (...args) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.innerFunc(...args);
        }, 500);
    };

    stop = () => {
        clearTimeout(this.timer);
    };
}
