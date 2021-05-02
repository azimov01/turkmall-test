import React from 'react';
import useScrollTop from 'hooks/useScrollTop';

const PageNotFound = ({ history }) => {
	useScrollTop();

	return (
		<div className="page-not-found">
			<h1>:( Страница не существует.</h1>
			<br />
			<button
				className="button"
				onClick={history.goBack}
			>
				Назад
			</button>
		</div>
	);
};

export default PageNotFound;
