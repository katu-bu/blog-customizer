import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { FormEvent, useEffect, useState } from 'react';
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
	initArticleState: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const toggleOpen = () => {
		setIsFormOpen(!isFormOpen);
	};
	const [fontFamilyOption, setFontFamilyOption] = useState(
		props.initArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(props.initArticleState.fontColor);
	const [fontSizeOption, setFontSizeOption] = useState(
		props.initArticleState.fontSizeOption
	);
	const [backgroundColor, setBackgroundColor] = useState(
		props.initArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		props.initArticleState.contentWidth
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
		toggleOpen();
		props.onSubmit(defaultArticleState);
	};

	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (isFormOpen && event.key === 'Escape') {
				setIsFormOpen(false);
			}
		};
		if (isFormOpen) {
			document.addEventListener('keydown', handleEscKey);
			return () => {
				document.removeEventListener('keydown', handleEscKey);
			};
		}
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleOpen} />
			<aside
				className={`${styles.container} ${
					isFormOpen ? styles.container_open : ''
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
			<div
				className={`${styles.overlay} ${isFormOpen ? styles.overlay_open : ''}`}
				onClick={toggleOpen}></div>
		</>
	);
};
