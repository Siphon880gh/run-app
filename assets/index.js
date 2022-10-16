// Todo: Create a store to track state of checkboxes so you don't repeatedly query for checkboxes

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

    const checkState = $(".programs input[type='checkbox']").map((i, el)=> $(el).prop("checked") ? 1 : 0 ).toArray();
    localStorage.setItem("RunApp__checks", checkState);
}

function updateLinethroughs() {
    // console.log("Called updateLinethroughs");
    // function test() {
    //     console.assert()
    // }
}

$(()=>{
    // function testSetup(functionName) {
    //     if(functionName==="saveCheckmarks" || functionName==="updateLinethroughs") {
    //         $(".programs input[type='checkbox']").attr("checked", false);
    //     }
    // }
    // testSetup("saveCheckmarks");

    // UI UI: Clicking the week number also checks it off
    $(".programs li > span").on("click", (event) => {
        const cb = event.target.previousElementSibling;
        cb.checked = !cb.checked;
        $(cb).trigger("change");
    })

    $(".programs input[type='checkbox']").on("change", (event)=> { 
        event.preventDefault();
        event.stopPropagation();

        saveCheckmarks();
        updateLinethroughs();
      });

});