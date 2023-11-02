// ==UserScript==
// @name         Skip and Mute Annoying YouTube Ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       hel0wrld
// @match        *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {


    // detects the video element
    // var player = document.querySelector('video[class="video-stream html5-main-video"]')

    // mutes the player
    // player.muted = true

    // detects if an ad is being played

    function tryToSkip() {
        var skipButton = document.querySelector("button.ytp-ad-skip-button.ytp-button")
        if(skipButton == null) return
        skipButton.click()
    }

    var videoElement = document.querySelector('.video-stream.html5-main-video');
    function videoLoadedHandler() {
        // console.log('Video element has loaded.');

        if (document.querySelector("div.ad-showing")) {

            console.log("ad detected!!")

            var mute_button = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > span > button")
            mute_button.click()

            var playButton = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button")
            playButton.click()

            var tryToSkipInterval = setInterval(() => {
                tryToSkip();

                if(document.querySelector("div.ad-showing") == null) {
                    clearInterval(tryToSkipInterval)
                    console.log('ad skipped :)')
                    mute_button.click()
                    return
                }
            }, 1000);
        }
        else {
            console.log("no ads :)")
        }
    }

    if (videoElement) {
        
        if (videoElement.readyState >= 2) { 
            videoLoadedHandler();
        } else {       
            videoElement.addEventListener('loadedmetadata', videoLoadedHandler);
        }
    } else {
        console.log('Video element does not exist.');
    }
})();
