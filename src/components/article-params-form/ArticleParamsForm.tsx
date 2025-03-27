import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { FormEvent, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	onSubmit: (selected: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};
	const [fontFamilyOption, setFontFamilyOption] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [fontSizeOption, setFontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		toggleOpen();
		const articleState: ArticleStateType = {
			fontColor,
			fontFamilyOption,
			fontSizeOption,
			backgroundColor,
			contentWidth,
		};
		props.onSubmit(articleState);
	};

	const handleReset = () => {
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={setFontFamilyOption}
					/>

					<RadioGroup
						options={fontSizeOptions}
						title='Размер шрифта'
						name='fontSize'
						selected={fontSizeOption}
						onChange={setFontSizeOption}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
