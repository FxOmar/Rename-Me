// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "rename-me.rename",
    async () => {
      const editor = vscode.window.activeTextEditor;
      const currentWorkspacePath = vscode.workspace.workspaceFolders;

      if (editor && currentWorkspacePath) {
        const newName = await vscode.window.showInputBox({
          value: path.basename(editor.document.uri.path),
        });

        if (newName !== path.basename(editor.document.uri.path)) {
          await vscode.workspace.fs.rename(
            editor.document.uri,
            vscode.Uri.file(`${currentWorkspacePath[0].uri.path}/${newName}`),
            {
              overwrite: true,
            }
          );
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
