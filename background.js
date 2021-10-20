chrome.contextMenus.removeAll();

chrome.contextMenus.create({
    id: "case_change_parent",
    title: "Change Text Cases",
    contexts: ["editable"],
});

chrome.contextMenus.create({
    parentId: "case_change_parent",
    id: "uppercase",
    title: "UPPERCASE",
    contexts: ["editable"],
});

chrome.contextMenus.create({
    parentId: "case_change_parent",
    id: "capitalize",
    title: "Capitalize",
    contexts: ["editable"],
});

chrome.contextMenus.create({
    parentId: "case_change_parent",
    id: "lowercase",
    title: "lowercase",
    contexts: ["editable"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            files: ['content-script.js']
        },
        function () {
            console.log("sendMessage")
            chrome.tabs.sendMessage(tab.id, {
                selectedText: info.selectionText,
                menuItemId: info.menuItemId,
            });
        }
    );
});
