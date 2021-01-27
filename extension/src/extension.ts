// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorld } from './HelloWorldPanel';
import { SidebarProvider } from './SidebarProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	//Min: 1.33.51 Not working command
	item.command="vstodo.addTodo";
	item.text = "Add Todo";


	context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider(
		"vstodo-sidebar",
		sidebarProvider
	  )
	);

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

	context.subscriptions.push(
		vscode.commands.registerCommand("vstodo.addTodo", async ()=> {
			console.log("Hello");
			const {activeTextEditor}= vscode.window;

			if (!activeTextEditor ){
				return;

			}
			const text = activeTextEditor.document.getText(activeTextEditor.selection);
			//console.log(text);
			vscode.window.showInformationMessage("Text:"+ text);
			sidebarProvider._view?.webview.postMessage({value:text, type: "new-todo"});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("vstodo.Refresh", async ()=> {
			await vscode.commands.executeCommand("workbench.action.closeSidebar");
			await vscode.commands.executeCommand("workbench.view.extension.vstodo-sidebar-view");

			//HelloWorld.kill();
			//HelloWorld.createOrShow(context.extensionUri);
			

			setTimeout(()=>{
				vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
			}, 500);
			}
		)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}