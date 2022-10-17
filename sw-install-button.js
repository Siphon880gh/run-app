let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  //showInstallPromotion();
   $(".btn-installer").removeClass("d-none");  
  //prompt();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});

window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion AND permanently remove Install button
    // hideInstallPromotion();
    $(".btn-installer").remove();
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
  });

$(()=>{
    $(".btn-installer").on("click", async()=>{
        // Hide the app provided install promotion
        // hideInstallPromotion();
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
    });

    // setTimeout(()=>{
    //     if($(".btn-installer").length) $(".btn-installer").removeClass("d-none");        
    // }, 200);
})