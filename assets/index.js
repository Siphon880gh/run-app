// Todo: Create a store to track state of checkboxes so you don't repeatedly query for checkboxes
// Todo: Call updateLinethroughs whenever state changes instead of manually at different points of the app

const utils = {
    doesIndexExist: (index, arr) => typeof arr[index] !== "undefined"
}

function saveCheckmarks() {
    // console.log("Called saveCheckmarks");
    // function test() {
    //     console.assert(
    //         $(".programs input[type='checkbox']:checked").length==1, 
    //         "FAILED: One checkmark is checked. RESULT: " + $(".programs input[type='checkbox']").length + " UNLESS you checked more than one."
    //     )
    //     console.info("Please verify: " + $(".programs input[type='checkbox']:checked").eq())

    // }
    // test();

    let checkState = $(".programs input[type='checkbox']").map((i, el)=> $(el).prop("checked") ? 1 : 0 ).toArray();
    checkState = JSON.stringify(checkState)
    localStorage.setItem("RunApp__checks", checkState);
}

function updateLinethroughs() {
    // console.log("Called updateLinethroughs");
    // function test() {
    //     console.assert()
    // }

   $(".programs .text-decoration-line-through").removeClass("text-decoration-line-through");

    $(".programs input[type='checkbox']").each((i, el)=> { 
        const isChecked = el.checked;
        if(isChecked) {
            el.nextElementSibling.classList.add("text-decoration-line-through")
        }
    });
} // updateLinethroughs

$(()=>{
    // function testSetup(functionName) {
    //     if(functionName==="saveCheckmarks" || functionName==="updateLinethroughs") {
    //         $(".programs input[type='checkbox']").attr("checked", false);
    //     }
    // }
    // testSetup("saveCheckmarks");

    // UIUX: Clicking the week number also checks it off
    $(".programs li > span").on("click", (event) => {
        const cb = event.target.previousElementSibling;
        cb.checked = !cb.checked; // Insufficient to trigger input change event
        $(cb).trigger("change");
        updateLinethroughs();
    })

    // Previously checked weeks from localStorage
    let checkState = localStorage.getItem("RunApp__checks");
    checkState = JSON.parse(checkState);
    if(checkState) {
        // Previous checked weeks may save more or less than there are weeks on the page if your adjusted your programs, so fail gracefully
        $(".programs input[type='checkbox']").each((i, el)=> { 
            // console.log({i, checkState, el, eval: utils.doesIndexExist(i, checkState) })
            if(utils.doesIndexExist(i, checkState)) {
                if(checkState[i]===1)
                    el.checked = true;
            }
        });
        updateLinethroughs();
    }

    // When checks a week...
    $(".programs input[type='checkbox']").on("change", (event)=> { 
        event.preventDefault();
        event.stopPropagation();

        saveCheckmarks();
        updateLinethroughs();
      });

});