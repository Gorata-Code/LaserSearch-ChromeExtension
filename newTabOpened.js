import * as constants from "/constants.js"
import * as altEngines from "/alternative_search_engines.js"

constants.FLEXSWITCHDEFAULT.addEventListener('click', modeSwitch);

window.addEventListener("DOMContentLoaded", function () {
    checkModeSwitch()
    showAllEngines(altEngines.KARATA)
});

function showAllEngines(searchEnginesListing) {
    let searchEngineProfiles = (searchEnginesListing.map(function (engine) {
        return `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 py-2">
            <div class="card cardBody mt-2 py-2" style="width: 16rem;">
              <img src=${engine.source} class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-text">${engine.card_text}</p>
                <a href=${engine.button_link} class="btn btn-primary">${engine.button_text}</a>
                </div>
            </div>
            </div>`
    }))
    searchEngineProfiles = searchEngineProfiles.join("");
    constants.PAGEVIEW.innerHTML = searchEngineProfiles;
}

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
        const NOMATCHES = `<button class="btn btn-primary py-4 mt-4">There are no matches for your search word.</button>`
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
        CARDBODIES[i].classList.add("card-background-darkmode")
    }
}

function darkModeOff() {
    localStorage.setItem('flexSwitch', 'off')
    localStorage.setItem('mode', 'light');
    document.body.classList.remove("dark-mode");
    const CARDBODIES = document.querySelectorAll(".card");
    for (let i = 0; i < CARDBODIES.length; i++) {
        CARDBODIES[i].classList.remove("card-background-darkmode")
    }
}