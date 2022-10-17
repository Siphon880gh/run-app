window.isPlaying = true;
window.isFinished = false;
window.elapsed = 0;
window.poller = null;
window.matrixR = []; // matrix Reduced
window.matrixP = []; // matrix Phase
window.atPhase = 0;

var utils = {
    toHHMMSS: (secs) => {
        if(secs>=86400) return "00:00:00"; // User must have came back after 24 hours.

        var date = new Date(1970,0,1);
        date.setSeconds(secs);
        return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    } // toHHMMSS
}

$(()=>{

    // Render Handlebars
    (()=>{
        let parameterizedTemplate = Handlebars.compile($("#template-week").html())
        let templateParams = {...heading, intervals};
        let html = parameterizedTemplate(templateParams);
        
        $(".container").prepend(html);
    })();

    // UIUX Toggleable corner play/pause
    $(".position-corner .fa").on("click", (event)=>{
        const $fa = $(event.target);
        if($fa.hasClass("fa-pause")) {
            $fa.removeClass("fa-pause").addClass("fa-play");
            window.isPlaying = false;
        } else {
            $fa.removeClass("fa-play").addClass("fa-pause");
            window.isPlaying = true;
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
    window.matrixR = $(".phase-timemark .planned").map((i, el)=> {  
        let currentVal = parseFloat(el.innerText); 
        let multiplier = el.innerText.includes("m")?60: (el.innerText.includes("h")?360:1)
        currentVal *= multiplier;
        reducer += currentVal;
        return reducer; 
    }).toArray();
    
    window.matrixP = $(".phase-timemark .planned").map((i, el)=> 0).toArray();
    if(typeof window.matrixP[0] !== "undefined") window.matrixP = [1];

    // Countup
    $(".phase").eq(0).addClass("active")
    window.poller = setInterval(()=>{
        if(!window.isPlaying || window.isFinished) return;

        // Global
        const newHHMMSS= utils.toHHMMSS(window.elapsed);
        $(".global-timer").text(newHHMMSS);

        var localTime = window.elapsed;
        if(window.atPhase>=1) localTime -= window.matrixR[atPhase-1]; 
        $(".phase-timemark .local-timer").eq(window.atPhase).text( utils.toHHMMSS(localTime) );
        

        if(window.elapsed < window.matrixR[window.atPhase]) { 
        // eg. 1 < 30 when 1 second elapsed at first row accuulated 30 seconds planned

        } else {
            // Move to next phase
            if(typeof window.matrixR[window.atPhase+1] !== "undefined") {
                // Test this
                window.atPhase++;
                // setTimeout(()=> { $(".phase").removeClass("active") }, 500);
                setTimeout(()=> { $(".phase").eq(window.atPhase-1).removeClass("active") }, 100);
                $(".phase").eq(window.atPhase).addClass("active")
            } else {
                window.isFinished = true;
                $(".phases").append(`<footer class="conclusion text-center text-white p-5 mb-4 rounded-3">
                    Congratulations! You finished today's training! Go back to <a href='../../'>weeks<a>.               
                </footer>`);
                // window.navigation.back();
            }
        }

        

        window.elapsed++;
    }, 1000)
})