import path = require("path");
import * as vscode from "vscode";

/**
 *  Rename the current file
 *
 * @param newName
 * @param currentFile
 * @param currentWorkspacePath
 */
async function handleRenaming(
  newName: string,
  currentFile: path.ParsedPath
): Promise<void> {
  await vscode.workspace.fs.rename(
    vscode.Uri.file(`${currentFile.dir}/${currentFile.base}`),
    vscode.Uri.file(`${currentFile.dir}/${newName}`),
    {
      overwrite: false,
    }
  );
}

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "rename-me.rename",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const parseCurrentUri = path.parse(editor.document.uri.path);

        const newName = await vscode.window.showInputBox({
          value: parseCurrentUri.base,
        });

        if (newName === undefined) {
          return;
        }

        if (newName !== parseCurrentUri.base) {
          handleRenaming(newName, parseCurrentUri);
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
