// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorld } from './HelloWorldPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vstodo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vstodo.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		HelloWorld.createOrShow(context.extensionUri);
		// vscode.window.showInformationMessage('Hello World from VSTodo MAC USER!');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand("vstodo.AskQuestion", async ()=> {
			let result = await vscode.window.showInformationMessage("How Are you?", "Good","Bad");
			console.log("User response:",result);
			if (result == 'Bad') {
				vscode.window.showInformationMessage("I don't give a shit!");
			} else {
				console.log("Nevermind, he is good!");
			}
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}