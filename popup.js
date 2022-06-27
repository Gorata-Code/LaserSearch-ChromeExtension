import * as constants from "/constants.js"
import * as altEngines from "/alternative_search_engines.js"

constants.NEWTAB.addEventListener('click', openNewTab);
constants.FLEXSWITCHDEFAULT.addEventListener('click', modeSwitch);

window.addEventListener("DOMContentLoaded", function () {

    checkModeSwitch()
    showAllEngines(altEngines.KARATA)

    const BUTTON = document.querySelectorAll('.barton')
    BUTTON.forEach(element => {
        element.addEventListener('click', function () {
            chrome.tabs.create({ url: `${element.href}` })
        })
    });
});

function showAllEngines(searchEnginesListing) {
    let searchEngineProfiles = (searchEnginesListing.map(function (engine) {

        return `

        <a href="${engine.button_link}" class="btn barton mb-2">
        <li class="list-group-item display-2 bg-gradient">${engine.button_text}</li>
        </a>
        
        `

    }))
    searchEngineProfiles = searchEngineProfiles.join("");
    constants.PAGEVIEW.innerHTML = searchEngineProfiles;
};

function openNewTab() {
    chrome.tabs.create({ url: 'newTabOpened.html' })
};

constants.SEARCHFORM.addEventListener('keyup', function (e) {
    const TERM = e.target.value.toLowerCase();
    const MATCHINGTERMS = altEngines.KARATA.filter(function (searchTerm) {
        if (searchTerm.button_text.toLowerCase().includes(TERM)) {
            return searchTerm
        }
    })
    if (MATCHINGTERMS.length > 0) {
        showAllEngines(MATCHINGTERMS)
    }
    else if (MATCHINGTERMS.length <= 0) {
        const NOMATCHES = `<button class="btn btn-primary">There are no matches for your search word.</button>`
        return constants.PAGEVIEW.innerHTML = NOMATCHES
    }

});

function checkModeSwitch() {
    const SWITCH = localStorage.getItem('flexSwitch')
    if (SWITCH === 'on') {
        darkModeOn();
        constants.FLEXSWITCHDEFAULT.click()
    }
}

function modeSwitch() {
    if (constants.FLEXSWITCHDEFAULT.checked) {
        darkModeOn();
    } else {
        darkModeOff();
    }
}

function darkModeOn() {
    localStorage.setItem('flexSwitch', 'on')
    localStorage.setItem('mode', 'dark');
    document.body.classList.add("dark-mode");
    const CARDBODIES = document.querySelectorAll(".card");
    for (let i = 0; i < CARDBODIES.length; i++) {
        CARDBODIES[i].classList.add("cardBackground")
    }
}

function darkModeOff() {
    localStorage.setItem('flexSwitch', 'off')
    localStorage.setItem('mode', 'light');
    document.body.classList.remove("dark-mode");
    const CARDBODIES = document.querySelectorAll(".card");
    for (let i = 0; i < CARDBODIES.length; i++) {
        CARDBODIES[i].classList.remove("cardBackground")
    }
}