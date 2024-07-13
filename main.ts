import { Editor, MarkdownView, Plugin, TFile } from "obsidian";

// Remember to rename these classes and interfaces!

export default class NameTheFilePlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "name-the-file",
			name: "Name the file with selected text",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				renameFileWithSelection(view.file, editor.getSelection());
			},
		});

		const renameFileWithSelection = async (
			file: TFile | null,
			newName: string
		) => {
			if (!file || newName === "") {
				return;
			}
			// if the file name contains more than 1 line, only the first line will be used
			newName = newName.split("\n")[0];
			// change the illedgal characters in the file name
			newName = newName.replace(/[\\/:*?"<>|]/g, "_");
			const fileManager = this.app.fileManager;
			console.log(file);
			// await fileManager.renameFile(file, `${newName}.${file.extension}`);
			const folder = file.path.split("/").slice(0, -1).join("/");
			console.log(folder);
			await fileManager.renameFile(file, `${folder}/${newName}.md`);
		};
	}

	onunload() {}
}
