function createElementFromJson(json) {
    var element = document.createElement(json.tag);
    if (json.attrs) {
        Object.keys(json.attrs).forEach(function (attr) {
            element.setAttribute(attr, json.attrs[attr]);
        });
    }
    if (json.children) {
        json.children.forEach(function (child) {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            }
            else {
                element.appendChild(createElementFromJson(child));
            }
        });
    }
    return element;
}
function loadComponentAndDisplay(url, targetElementId) {
    fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
        .then(function (json) {
        var targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = '';
            targetElement.appendChild(createElementFromJson(json));
        }
        else {
            console.error('Target element not found');
        }
    })
        .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    loadComponentAndDisplay('component.json', 'target');
});
