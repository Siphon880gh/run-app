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
    $(".checkboxes").each((i,cbg)=>{
        var $cbg = $(cbg);
        if($cbg.find("input").length === $cbg.find("input").filter((i,cb)=>$(cb).prop("checked")).length) {
            $cbg.closest("li").find(".week-num, .fa-external-link-square-alt").addClass("text-decoration-line-through")
        } else {
            $cbg.closest("li").find(".week-num, .fa-external-link-square-alt").removeClass("text-decoration-line-through")
        }
        
    });
} // updateLinethroughs

function checkNext(event) {
    $(event.target).next().prop('checked', !$(event.target).next().prop('checked'))
}

$(()=>{
    // Some rapid TDD
    // function testSetup(functionName) {
    //     if(functionName==="saveCheckmarks" || functionName==="updateLinethroughs") {
    //         $(".programs input[type='checkbox']").attr("checked", false);
    //     }
    // }
    // testSetup("saveCheckmarks");

    // UIUX: Clicking the week number also checks it off
    // Deciding Split A/B Design
    // Should clicking week cross it all our, or should it open the link?
    // $(".week-num").on("click", (event) => {
    //     var wasPreviouslyCrossed = $(event.target).hasClass("text-decoration-line-through");
    //     if(!wasPreviouslyCrossed)
    //         $(event.target).closest("li").find("input").each((i,cb)=> $(cb).prop("checked", true));
    //     else
    //         $(event.target).closest("li").find("input").each((i,cb)=> $(cb).prop("checked", false));
    //     updateLinethroughs();
    // })
    $(".week-num").on("click", (event) => {
        const link = $(event.target).next().attr("href");
        // Testing different UX
        // window.open(link);
        if(link)
            window.location.href = link;
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


function saveSetBeeps() {
    let beeps = $('input[name="beep"]:checked').val();
    if(beeps) {
        localStorage.setItem("RunApp__lastSecondsBeeping", beeps);
    }
}

$(()=>{
    // Setup modal
    $("body").append(`
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header" style="border:0">
                <h5 class="modal-title text-center display-5" id="exampleModalLabel" style="width:100%; padding-left:10px">Settings</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="width:33px"></button>
            </div>
            <div class="modal-body text-center">
                <b>Beep for how many seconds?</b>
                <br><br/>
                <div style="display:flex; flex-flow: row nowrap; justify-content: center; gap: 10px;">
                    <section>
                        <input type="radio" name="beep" value="1">
                        <br/>
                        <span>
                        1
                        </span>
                    </section>
                    <section>
                        <input type="radio" name="beep" value="2">
                        <br/>
                        <span>
                        2
                        </span>
                    </section>
                    <section>
                        <input type="radio" name="beep" value="3">
                        <br/>
                        <span>
                        3
                        </span>
                    </section>
                    <section>
                        <input type="radio" name="beep" value="4">
                        <br/>
                        <span>
                        4
                        </span>
                    </section>
                    <section>
                        <input type="radio" name="beep" value="5">
                        <br/>
                        <span>
                        5
                        </span>
                    </section>
                    <section>
                        <input type="radio" name="beep" value="6">
                        <br/>
                        <span>
                        6
                        </span>
                    </section>
                    <section>
                        <input type="radio" name="beep" value="7">
                        <br/>
                        <span>
                        7
                        </span>
                    </section>
                </div>
            </div>
            <div class="modal-footer" style="border:0; flex-direction: column; margin-bottom: 20px; gap: 20px;">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="opacity:0.6">Cancel</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick='saveSetBeeps();'>OK</button>
            </div>
            </div>
        </div>
        </div>
`);

    // Pre select the number of seconds that get beeped
    if(localStorage.getItem("RunApp__lastSecondsBeeping")) {

        const numBeeps = parseInt(localStorage.getItem("RunApp__lastSecondsBeeping"));
        const radioOption = document.querySelector(`input[name="beep"][value="${numBeeps}"]`)
        //console.log(radioOption);
        radioOption.checked = true;
    } else {
        const radioOption = document.querySelector(`input[name="beep"][value="4"]`)
        //console.log(radioOption);
        radioOption.checked = true;
    }
        

}); // $(()=>{