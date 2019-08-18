function hideElement(element) {
    if(!element) {
        return;
    }
    element.classList.add("hide");
}

function showElement(element) {
    if(!element) {
        return;
    }
    element.classList.remove("hide");
}

function setInnerHTML(element, html) {
    if(!element) {
        return;
    }
    element.innerHTML = html;
}

function appentElement(parentElement, childElement) {
    if(!parentElement) {
        return;
    }
    parentElement.appendChild(childElement);
}

function getWeightedRandomNumber(weightedProbability) {
    if(!Array.isArray(weightedProbability)) {
        return null
    }

    var random = Math.floor(Math.random() * 100);

    let sum = 0;
    for (i = 0, iLen = weightedProbability.length; i < iLen; i++) {
        let scoreProbability = weightedProbability[i];
        sum += scoreProbability.getProbability();
        if (random <= sum) {
            return scoreProbability.getScore();
        }
    }
    return null;
}