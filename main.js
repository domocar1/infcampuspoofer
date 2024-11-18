// ==UserScript==
// @name        Multi-Element Updater
// @namespace   Violentmonkey Scripts
// @match       *://edenprairiemn.infinitecampus.org/*
// @grant       none
// @version     1.3
// @author      -
// @description 11/17/2024, Supports multiple elements
// @run-at      document-idle
// ==/UserScript==
(function () {
    'use strict';

    // List of selectors and their corresponding updates
    const elementsToUpdate = [
        {
            selector: "#grades-11305885 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div:nth-child(1) > b",
            content: "A"
        },
        {
            selector: "#grades-11305885 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div.grading-score__row-spacing.ng-star-inserted > b",
            content: "(96.43%)"
        },
        {
            selector: "#grades-11293566 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div:nth-child(1) > b",
            content: "A"
        },
        {
            selector: "#grades-11293566 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div.grading-score__row-spacing.ng-star-inserted > b",
            content: "(95.67%)"
        },
        {
            selector: "#grades-11307378 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div:nth-child(1) > b",
            content: "A"
        },
        {
            selector: "#grades-11307378 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div.grading-score__row-spacing.ng-star-inserted > b",
            content: "(98.03%)"
        },
        {
            selector: "#grades-11299735 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div:nth-child(1) > b",
            content: "A"
        },
        {
            selector: "#grades-11299735 > div > div.grades__flex-row__item.grades__flex-row__item--right > tl-grading-score > div > div > div.grading-score__row-spacing.ng-star-inserted > b", 
            content: "(94.78%)"
        }
    ];

    // Track updated elements to avoid redundant updates
    const updatedElements = new Set();

    // Function to update elements
    function updateElements() {
        for (const item of elementsToUpdate) {
            const targetElement = document.querySelector(item.selector);
            if (targetElement && !updatedElements.has(item.selector)) {
                console.log(`Updating content for: ${item.selector}`);
                targetElement.innerHTML = item.content; // Set the desired value
                updatedElements.add(item.selector); // Mark as updated
            }
        }

        // Stop the observer if all elements have been updated
        if (updatedElements.size === elementsToUpdate.length) {
            console.log("All elements updated. Disconnecting observer.");
            observer.disconnect();
        }
    }

    // Set up a MutationObserver to detect changes in the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                updateElements();
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("MutationObserver initialized. Waiting for DOM changes...");

    // Initial attempt to update elements
    updateElements();
})();
