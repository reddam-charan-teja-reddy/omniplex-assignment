import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Translate.module.css';
import Copy from '../../../public/svgs/Copy.svg';
import { Skeleton } from '@nextui-org/skeleton'; // Import Skeleton from NextUI

type TranslateProps = {
	sourceLanguage?: string;
	targetLanguage?: string;
	sourceText?: string;
	translatedText?: string;
};
const Translate = ({
	sourceLanguage,
	targetLanguage,
	sourceText,
	translatedText,
}: TranslateProps) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setShowTooltip(true);
		setTimeout(() => setShowTooltip(false), 2000); // Tooltip disappears after 2 seconds
	};

	return (
		<div className={styles.translateContainer}>
			<div className={styles.languageRow}>
				<div
					className={styles.language}
				>{`From: ${sourceLanguage}`}</div>
				<div
					className={styles.language}
				>{`To: ${targetLanguage}`}</div>
			</div>
			<div className={styles.textRow}>
				<div className={styles.textSection}>
					<div className={styles.label}>Source Text</div>
					<div className={styles.text}>
						{sourceText ? (
							sourceText
						) : (
							<Skeleton className={styles.skeletonText} /> // Skeleton for sourceText
						)}
					</div>
				</div>
				<div className={styles.textSection}>
					<div className={styles.label}>Translated Text</div>
					<div className={styles.text}>
						{translatedText ? (
							translatedText
						) : (
							<Skeleton className={styles.skeletonText} /> // Skeleton for translatedText
						)}
						<button
							className={styles.copyButton}
							onClick={() =>
								copyToClipboard(translatedText || '')
							}
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
						>
							<Image
								src={Copy}
								alt='Copy Icon'
								width={20}
								height={20}
							/>
							{showTooltip && (
								<span className={styles.tooltip}>
									Copy
								</span>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Translate;
