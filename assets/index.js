function saveCheckmarks() {
    console.log("Called saveCheckmarks");
    function test() {
        console.assert()
    }
}

function updateLinethroughs() {
    console.log("Called updateLinethroughs");
    function test() {
        console.assert()
    }
}

$(()=>{
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