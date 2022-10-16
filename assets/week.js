window.isPlaying = true;
window.elapsed = 0;
window.poller = null;
window.matrix1 = [];
window.matrix2 = [];

var utils = {
    toHHMMSS: (secs) => {
        if(secs>=86400) return "00:00:00"; // User must have came back after 24 hours.

        var date = new Date(1970,0,1);
        date.setSeconds(secs);
        return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    } // toHHMMSS
}

$(()=>{

    // UIUX Toggleable corner play/pause
    $(".position-corner .fa").on("click", (event)=>{
        const $fa = $(event.target);
        if($fa.hasClass("fa-pause")) {
            $fa.removeClass("fa-pause").addClass("fa-play");
        } else {
            $fa.removeClass("fa-play").addClass("fa-pause");
        }
    })

    // UIUX Numbered phases
    let countNumeral = 1;
    $(".phase-numeral").each((i,el)=>{
        el.innerText = countNumeral;
        countNumeral++;
    });

    // Prepare matrix that keeps track which phase should play next from the global timer
    let reducer = 0;
    window.matrix1 = $(".phase-timemark .planned").map((i, el)=> {  
        let currentVal = parseFloat(el.innerText); 
        let multiplier = el.innerText.includes("m")?60: (el.innerText.includes("h")?360:1)
        currentVal *= multiplier;
        reducer += currentVal;
        return reducer; 
    }).toArray();
    
    window.matrix2 = $(".phase-timemark .planned").map((i, el)=> 0).toArray();
    if(typeof window.matrix2[0] !== "undefined") window.matrix2[0] = 1;

    // Countup
    window.poller = setInterval(()=>{
        // Global
        const newHHMMSS= utils.toHHMMSS(window.elapsed);
        $(".global-timer").text(newHHMMSS);

        window.elapsed++;
    }, 1000)
})