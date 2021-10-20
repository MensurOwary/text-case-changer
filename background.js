chrome.contextMenus.removeAll();

const tree = {
    id: "case_change_parent",
    title: "Change Text Cases",
    children: [
        { id: "uppercase", title: "UPPERCASE" },
        { id: "capitalize", title: "Capitalize" },
        { id: "lowercase", title: "lowercase" },
    ],
};

const registerMenu = (data) => {
    chrome.contextMenus.create({
        ...data,
        contexts: ["editable"],
    });
};

// register parent
registerMenu({ id: tree.id, title: tree.title });
for (let child of tree.children) {
    registerMenu({ ...child, parentId: tree.id });
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            files: ["content-script.js"],
        },
        function () {
            console.log("sendMessage");
            chrome.tabs.sendMessage(tab.id, {
                selectedText: info.selectionText,
                menuItemId: info.menuItemId,
            });
        }
    );
});
