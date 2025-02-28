/*
Copyright {2025} {Christophe Favergeon}

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "mycode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerTextEditorCommand('mycode.cleanMacro', (textEditor, edit) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello VS Code!');
		if (textEditor.selection.isEmpty) 
		{
			vscode.window.showInformationMessage('No code selected !');
		}
		else 
		{
			const text = textEditor.document.getText(textEditor.selection);
			
			// Split the text into lines
			const lines = text.split(/\r?\n/);
			//console.log(lines);

			var max_nb=0;
			
			// Apply a transformation to each line
			const transformedLines = lines.map(line => {
				// Example transformation: convert each line to uppercase
                return line.replace(/[ ]*[\\]*$/, '');
			});

			transformedLines.map(line => {
				if (line.length > max_nb)
				{
					max_nb=line.length;
				}
			});

			const nb_lines = transformedLines.length;

			const filteredLines = transformedLines.map((line,index) => {
				// Example transformation: convert each line to uppercase
				if (index === nb_lines-1)
				{
					return line;
				}
				else
				{
					return line + ' '.repeat(max_nb-line.length) + " \\";
				}
			});

            //console.log(filteredLines);
			
			// Join the transformed lines back into a single string
			const transformedText = filteredLines.join('\n');
			
			// Replace the selected text with the transformed text
			edit.replace(textEditor.selection, transformedText);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
