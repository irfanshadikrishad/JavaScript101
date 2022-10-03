function count(){
    var options = {
        useEasing: true,
        useGrouping: true,
        duration:2,
    }
    const c = new countUp.CountUp("counter", 100000, options);
    c.start();
}