function hideElement(element) {
    element.style = "display : none";
}

function showElement(element) {
    element.style = "display : block";
}

function setInnerHTML(element, html) {
    element.innerHTML = html;
}

function appentElement(parentElement, childElement) {
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