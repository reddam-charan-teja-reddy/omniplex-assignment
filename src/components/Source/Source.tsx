import React from 'react';
import Image from 'next/image';
import styles from './Source.module.css';
import File from '../File/File';
import Search from '../Search/Search';
import Stock from '../Stock/Stock';
import Widget from '../Widget/Widget';
import Weather from '../Weather/Weather';
import Dictionary from '../Dictionary/Dictionary';
import Translate from '../Translate/Translate';
import {
	FileInfo,
	SearchType,
	StockType,
	WeatherType,
	DictionaryType,
	TranslatePluginData,
} from '@/utils/types';

import SourceLogo from '../../../public/svgs/Source.svg';

type Props = {
	mode: string;
	fileInfo?: FileInfo;
	searchResults?: SearchType;
	stockResults?: StockType;
	weatherResults?: WeatherType;
	dictionaryResults?: DictionaryType;
	translateResults?: TranslatePluginData;
};

const Source = (props: Props) => {
	if (props.mode !== 'chat') {
		return (
			<div className={styles.sourceContainer}>
				<div className={styles.sourceTextRow}>
					<Image
						src={SourceLogo}
						alt='Source'
						className={styles.sourceImg}
					/>
					<p className={styles.sourceText}>Source</p>
				</div>

				{props.mode === 'image' && (
					<div className={styles.sourceRow}>
						<File fileInfo={props.fileInfo} />
					</div>
				)}

				{props.mode === 'search' && (
					<>
						<Search searchResults={props.searchResults} />
						<Widget searchResults={props.searchResults} />
					</>
				)}

				{props.mode === 'stock' && (
					<div className={styles.sourceRow}>
						<Stock stockResults={props.stockResults} />
					</div>
				)}

				{props.mode === 'weather' && (
					<div className={styles.sourceRow}>
						<Weather weatherResults={props.weatherResults} />
					</div>
				)}

				{props.mode === 'dictionary' && (
					<div className={styles.sourceRow}>
						<Dictionary
							dictionaryResults={props.dictionaryResults}
						/>
					</div>
				)}
				{props.mode === 'translate' && (
					<div className={styles.sourceRow}>
						<Translate
							sourceLanguage={
								props.translateResults?.sourceLanguage
							}
							targetLanguage={
								props.translateResults?.targetLanguage
							}
							sourceText={
								props.translateResults?.sourceText
							}
							translatedText={
								props.translateResults?.translatedText
							}
						/>
					</div>
				)}
			</div>
		);
	}

	return null;
};

export default Source;
