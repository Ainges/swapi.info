import type { JSX } from "react"
import { codeToHtml } from "shiki/bundle-web.mjs"
import { CopyButton } from "./copy-button"

/**
 * Props for the ResponseDisplayElement component.
 * @interface ResponseDisplayElementProps
 */
interface ResponseDisplayElementProps {
	/** The content to display, typically a JSON string. */
	children: string
	wrapText?: boolean
}

/**
 * A component to display an API response.
 * @param {ResponseDisplayElementProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ResponseDisplayElement = async ({
	children,
	wrapText = false,
}: ResponseDisplayElementProps): Promise<JSX.Element> => {
	const html = await codeToHtml(children, {
		lang: "json",
		theme: "solarized-dark",
	})

	return (
		<div className="response-display-element w-full max-w-screen-lg not-prose bg-gray-800 rounded-lg shadow-md overflow-hidden my-4 relative">
			<div className="bg-gray-700 px-4 py-2 rounded-t-lg">
				<h3 className="text-lg font-semibold text-green-400">Result:</h3>
			</div>
			<div
				className={`overflow-auto max-h-[100vh] border-x border-b border-[#333] rounded-b-lg ${
					wrapText
						? "[&>pre]:text-nowrap overflow-y-auto"
						: "[&>pre]:text-wrap overflow-y-hidden"
				}`}
				style={{
					fontSize: 16,
				}}
				/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			<div className="absolute top-1.5 right-1.5">
				<CopyButton text={children} />
			</div>
		</div>
	)
}

export default ResponseDisplayElement
