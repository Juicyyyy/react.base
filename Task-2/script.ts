interface JsonElement {
    tag: string;
    attrs: { [key: string]: string };
    children: (JsonElement | string)[];
}

function createElementFromJson(json: JsonElement): HTMLElement {
    const element = document.createElement(json.tag);

    if (json.attrs) {
        Object.keys(json.attrs).forEach(attr => {
            element.setAttribute(attr, json.attrs[attr]);
        });
    }

    if (json.children) {
        json.children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(createElementFromJson(child));
            }
        });
    }

    return element;
}

function loadComponentAndDisplay(url: string, targetElementId: string): void {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json() as Promise<JsonElement>;
        })
        .then(json => {
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                targetElement.innerHTML = '';
                targetElement.appendChild(createElementFromJson(json));
            } else {
                console.error('Target element not found');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponentAndDisplay('component.json', 'target');
});