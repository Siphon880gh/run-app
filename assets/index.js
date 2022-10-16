$(()=>{
    // UI UI: Clicking the week number also checks it off
    $(".programs li > span").on("click", (event) => {
        const cb = event.target.previousSibling;
        cb.checked = !cb.checked;
    })
});