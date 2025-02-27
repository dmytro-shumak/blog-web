"use client";

// import JoditEditor from "jodit-react";
const JoditEditor = dynamic(() => import('jodit-react'), {ssr: false})

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";

export default function Editor({ onChange }: { onChange: (value: string) => void }) {
	const editor = useRef(null);
	const [content, setContent] = useState('test');

	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: 'Start typings...'
		}),
		[]
	);

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={onChange}
		/>
	);
}
