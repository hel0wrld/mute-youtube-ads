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
        let skipButton = document.querySelector("button.ytp-ad-skip-button.ytp-button");
        if (skipButton == null) return;
        skipButton.click();
    }

    const container = document.querySelector('#container.style-scope.ytd-player');
    const div = container.querySelector('div[class*="html5-video-player"]');

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const className = div.getAttribute('class');

                // Check if the class name contains the string "ad-showing".
                if (className.includes('ad-showing')) {
                    // console.log('Yes');

                    let muteButton = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > span > button");
                    muteButton.click();

                    let tryToSkipInterval = setInterval(() => {
                        tryToSkip();

                        if (document.querySelector("div.ad-showing") == null) {
                            // console.log('ad skipped :)');
                            clearInterval(tryToSkipInterval);
                        }
                    }, 1000);

                    muteButton.click()

                } else {
                    // console.log('No');
                }
            }
        }
    });

    observer.observe(div, { attributes: true });

})();
