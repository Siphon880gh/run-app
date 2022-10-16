$(()=>{
    $(".position-corner .fa").on("click", (event)=>{
        const $fa = $(event.target);
        if($fa.hasClass("fa-pause")) {
            $fa.removeClass("fa-pause").addClass("fa-play");
        } else {
            $fa.removeClass("fa-play").addClass("fa-pause");
        }
    })
})