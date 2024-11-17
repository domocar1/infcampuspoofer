// ==UserScript==
// @name        New script infinitecampus.org
// @namespace   Violentmonkey Scripts
// @match       *://edenprairiemn.infinitecampus.org/*
// @grant       none
// @version     1.2
// @author      -
// @description 11/17/2024, Prevents redundant executions and runs efficiently
// @run-at      document-idle
// ==/UserScript==
(function () {
    'use strict';

    let elementUpdated = false; // Flag to track if the element was already updated

    // Function to update the element
    function updateElement() {
        const targetElement = document.querySelector("#grades-11307378 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div:nth-child(1) > b");
        if (targetElement && !elementUpdated) {
            console.log("Target element found. Updating content...");
            targetElement.innerHTML = "A"; // Set the desired value
            document.querySelector("#grades-11307378 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div.grading-score__row-spacing.ng-star-inserted > b").innerHTML = "(98.03%)"
            elementUpdated = true; // Mark as updated to avoid redundant executions
            observer.disconnect(); // Stop the observer once the task is completed
            console.log("Content updated. MutationObserver disconnected.");
        }
    }

    // Set up a MutationObserver to detect changes in the DOM
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                updateElement();
                if (elementUpdated) break; // Exit loop if element is updated
            }
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("MutationObserver initialized. Waiting for DOM changes...");

    // Initial attempt to update the element
    updateElement();
})();
