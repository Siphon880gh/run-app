
// window.isPlaying = true;
// window.isFinished = false;
// window.elapsed = 0;
// window.elapsedLocally = 0; // at the phase
// window.poller = null;
// window.matrixR = []; // matrix Reduced
// window.matrixP = []; // matrix Phase
// window.atPhase = 0;
// window.wantToRestart = false;

window.elapsed = 0;
window.poller = null;
window.timeRanges = [];

/**
 * 
 * @var heading
 * Is from the week1.html
 * {"programName":"Run Continuously for 20 Minutes","slot":"Week 3"}
 * 
 * @var intervals
 * is from the week1.html
 * [{"type":"Run","time":"2s"},{"type":"Walk","time":"3s"},{"type":"Run","time":"2s"}]
 * 
 */


// heading, intervals

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
        let interpolableTemplate = Handlebars.compile($("#template-week").html())
        let handlebarsFill = {...heading, intervals};
        let html = interpolableTemplate(handlebarsFill);
        
        $(".container").prepend(html);
    })();


    /**
     * @algorithm
     * From [2s,5s,7s] of html, create [2,5,7] for global tick to check which interval to highlight
     * 
     */
    let reducer = 0;
    window.timeRanges = $(".phase-timemark .planned").map((i, el)=> {  
        let currentVal = parseFloat(el.innerText); 
        let multiplier = el.innerText.includes("m")?60: (el.innerText.includes("h")?360:1)
        currentVal *= multiplier;
        reducer += currentVal;
        return reducer; 
    }).toArray();
    console.log(window.matrixR);

    // Start global tick
    window.poller = setInterval(()=>{
        // if(!window.isPlaying || window.isFinished) return;


        // Global
        const elapsedHHMMSS = utils.toHHMMSS(window.elapsed);
        $(".global-timer").text(elapsedHHMMSS);
        window.elapsed++;

    }, 1000); // window.poller
    



}); 

    // UIUX Toggleable corner play/pause
    // $(".position-corner .fa").on("click", (event)=>{
    //     const $fa = $(event.target);
    //     if($fa.hasClass("fa-pause")) {
    //         $fa.removeClass("fa-pause").addClass("fa-play");
    //         window.isPlaying = false;
    //         const totalTime = window.matrixR[window.matrixR.length-1];
    //         $(".global-timer").addClass("text-muted").text(utils.toHHMMSS( totalTime ))
    //     } else {
    //         $fa.removeClass("fa-play").addClass("fa-pause");
    //         window.isPlaying = true;
    //         $(".global-timer").removeClass("text-muted")
    //     }
    // })

//     // UIUX Numbered phases
//     let countNumeral = 1;
//     $(".phase-numeral").each((i,el)=>{
//         el.innerText = countNumeral;
//         countNumeral++;
//     });

//     // Prepare matrix that keeps track which phase should play next from the global timer
//     let reducer = 0;
//     window.matrixR = $(".phase-timemark .planned").map((i, el)=> {  
//         let currentVal = parseFloat(el.innerText); 
//         let multiplier = el.innerText.includes("m")?60: (el.innerText.includes("h")?360:1)
//         currentVal *= multiplier;
//         reducer += currentVal;
//         return reducer; 
//     }).toArray();
    
//     window.matrixP = $(".phase-timemark .planned").map((i, el)=> 0).toArray();
//     if(typeof window.matrixP[0] !== "undefined") window.matrixP = [1];

//     // Dynamic colors
//     setInterval(()=>{
//         let currentType = $(".phase-type").eq(window.atPhase).text().toLowerCase();
//         let failedMatch = true;
//         if(colorOnTypeWildcard) {
//             for(key in colorOnTypeWildcard) {
//                 let matchedRule = key.toLowerCase().includes(currentType)
//                 if(matchedRule) {
//                     const bgColor = colorOnTypeWildcard[key];
//                     $("style#dynamic-colors").html(`.phase.active { background-color: ${bgColor}; } `);
//                     failedMatch = false;
//                     break;
//                 } // if
//             } // for
//         } // if
//         if(failedMatch) {
//             let bgColor = "#4ebc09"
//             $("style#dynamic-colors").html(`.phase.active { background-color: ${bgColor}; } `);
//         }
//     }, 100);

//     // Countup
//     $(".phase").eq(0).addClass("active")
//     window.poller = setInterval(()=>{
//         if(!window.isPlaying || window.isFinished) return;

//         // Global
//         const newHHMMSS= utils.toHHMMSS(window.elapsed);
//         $(".global-timer").text(newHHMMSS);


//         if(window.wantToRestart) {
//             if(window.elapsedLocally>0) {
//                 window.elapsed-=window.elapsedLocally;
//                 window.elapsedLocally = 0;
//             }
//             window.wantToRestart = false;
//             $(".restarting").removeClass("restarting");
//             $(".restarting").removeClass("font-weight-bold");
//         }

//         var localTime = window.elapsed;
//         if(window.atPhase>=1) localTime -= window.matrixR[atPhase-1]; 
//         window.elapsedLocally++;

//         $(".phase-timemark .local-timer").eq(window.atPhase).text( utils.toHHMMSS(localTime) );
//         // console.log({elapsed,localTime,matrixP:window.matrixP[0]})
//         // console.log(wantToRestart)
        
//         if(window.elapsed < window.matrixR[window.atPhase]) { 
//         // eg. 1 < 30 when 1 second elapsed at first row accuulated 30 seconds planned

//             if(window.elapsed > (window.matrixR[window.atPhase])-3) {
//                 $(".phase").eq(window.atPhase).addClass("font-weight-bold");

//                 if(!window.audioMuted) {
//                     beep();
//                 } // beeping
//             }
        
//         } else {
//             if(!window.audioMuted) {
//                 beep();
//             } // beeping
//             // Move to next phase
//             if(typeof window.matrixR[window.atPhase+1] !== "undefined") {
//                 // Test this
//                 window.atPhase++;
//                 // setTimeout(()=> { $(".phase").removeClass("active") }, 500);
//                 setTimeout(()=> { $(".phase").eq(window.atPhase-1).removeClass("active").removeClass("font-weight-bold") }, 100);
//                 $(".phase").eq(window.atPhase).addClass("active")
//                 window.elapsedLocally = 0;
                
//             } else {
//                 $(".phase.active").removeClass("active").removeClass("font-weight-bold");
//                 window.isFinished = true;
//                 $(".phases").append(`<footer class="conclusion text-center text-white p-5 mb-4 rounded-3">
//                     Congratulations! You finished today's training! Go back to <a href='../../'>weeks<a>.               
//                 </footer>`);
//                 // window.navigation.back();
//             }
//         }

        

//         window.elapsed++;
//     }, 1000)
// })

// function clickToReset(event) {
//     if(!event.target.matches(".phase")) {
//         event.target = event.target.closest(".phase")
//     }
//     // console.log(event.target)
//     if($(event.target).hasClass("active")) {
//         window.wantToRestart = true; // defer to setInterval more executions
//         $(event.target).addClass("restarting");
//         $(event.target).find(".local-timer").text("")
//     }

//     // Throttle clicking multiple times in a row that would've caused timer to go negative
//     $(".phase").off("click");
//     setTimeout(()=>{
//         $(".phase").on("click", clickToReset);
//     }, 1500); 
// }
// $(()=>{
//     $(".phase").on("click", clickToReset);
// })