import React from "react";

interface TextEditorProps {
	name: string;
	text: string;
	setText: (text: string) => void;
	enabled: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ name, text, setText, enabled }) => {
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};
	return (
		<div className="flex flex-col items-center p-4">
			<h1 className="text-3xl font-bold mb-4">{name}</h1>
			<textarea
				className={`w-full h-[200px] p-4 text-lg text-black border-none rounded-3xl shadow-2xl resize-none ${
					enabled ? "bg-white" : "bg-gray-200"
				}`}
				disabled={!enabled}
				onChange={enabled ? handleChange : undefined}
				value={text}
				readOnly={!enabled}
				aria-label={name}
			></textarea>
		</div>
	);
};

export default TextEditor;
