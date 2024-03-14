"use client";
import React, { useState } from "react";
import TextEditor from "../../components/TextEditor"; // Adjust the import path based on your project structure
import { diff_match_patch } from "diff-match-patch";

const HomePage: React.FC = () => {
	// State variables for the text in each TextEditor
	const [sourceText, setSourceText] = useState(
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	);
	const [editedText, setEditedText] = useState(
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	);
	const [patchText, setPatchText] = useState("");
	const [rebuiltText, setRebuiltText] = useState("");

	const handleCompute = () => {
		// 1. Compute the delta
		const patch = computePatch(sourceText, editedText);
		setPatchText(patch);

		// 2. Apply the delta
		const originalPlusPatch = applyPatch(sourceText, patch);
		setRebuiltText(originalPlusPatch);
	};

	const computePatch = (text1: string, text2: string): string => {
		const dmp = new diff_match_patch();
		const diffs = dmp.diff_main(text1, text2);
		const patches = dmp.patch_make(text1, diffs);
		const patchString = dmp.patch_toText(patches);
		return patchString;
	};

	const applyPatch = (originalText: string, patchString: string): string => {
		const dmp = new diff_match_patch();
		const patches = dmp.patch_fromText(patchString);
		const [newText, results] = dmp.patch_apply(patches, originalText);
		return newText;
	};

	const doClear = () => {
		setPatchText("");
		setRebuiltText("");
	};

	return (
		<div className="flex flex-col items-center p-8">
			<h1 className="text-6xl font-bold mb-8">Experiment Patching Text</h1>
			<div className="grid grid-cols-2 gap-4 mb-4 w-5/6">
				<TextEditor name="Source" text={sourceText} setText={setSourceText} enabled={false} />
				<TextEditor name="Edited" text={editedText} setText={setEditedText} enabled={true} />
				<TextEditor name="Patch" text={patchText} setText={setPatchText} enabled={false} />
				<TextEditor name="Re-built" text={rebuiltText} setText={setRebuiltText} enabled={false} />
			</div>
			<div className="flex flex-row ">
				<button
					className="mr-5 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-150"
					onClick={handleCompute}
				>
					Compute
				</button>
				<button
					className="ml-5 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-150"
					onClick={doClear}
				>
					Clear
				</button>
			</div>
		</div>
	);
};

export default HomePage;
