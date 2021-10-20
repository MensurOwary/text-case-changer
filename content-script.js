(function () {
    const uppercasing = (selectedText, allText) => {
        return allText.replace(selectedText, selectedText.toUpperCase());
    };

    const lowercasing = (selectedText, allText) => {
        return allText.replace(selectedText, selectedText.toLowerCase());
    };

    const capitalizing = (selectedText, allText) => {
        let trimmedText = selectedText.trim();
        if (trimmedText.length < 2) {
            return trimmedText.toUpperCase();
        }
        const allTokens = allText.split(" ");
        for (let i = 0; i < allTokens.length; i++) {
            if (trimmedText === allTokens[i]) {
                const capitalizedToken =
                    trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
                allTokens[i] = capitalizedToken;
            }
        }
        return allTokens.join(" ");
    };

    const getCorrectTextModifier = (selectedText, menuItemId) => {
        switch (menuItemId) {
            case "uppercase":
                return (text) => uppercasing(selectedText, text);
            case "lowercase":
                return (text) => lowercasing(selectedText, text);
            case "capitalize":
                return (text) => capitalizing(selectedText, text);
        }
        // identity function by default
        return (text) => text;
    };

    const checkIfEditable = (domElement) => {
        return [HTMLInputElement, HTMLTextAreaElement].some(
            (type) => domElement instanceof type
        );
    };

    const checkIfValidText = (text) => {
        return text != undefined && text != null && text.trim().length !== 0;
    };

    const handler = (selectedText, menuItemId) => {
        const textModifier = getCorrectTextModifier(selectedText, menuItemId);
        if (checkIfValidText(selectedText)) {
            var currentElement = document.activeElement;
            if (checkIfEditable(currentElement)) {
                currentElement.value = textModifier(currentElement.value);
            }
        }
    };

    chrome.runtime.onMessage.addListener(function (message) {
        const { selectedText, menuItemId } = message;
        handler(selectedText, menuItemId);
    });
})();
