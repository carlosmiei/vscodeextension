// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
    const vscode = acquireVsCodeApi();
    //const counter = document.getElementById('button');
    //counter.innerText = "WTFF";
    console.log("Hello there javascript");
   
}());