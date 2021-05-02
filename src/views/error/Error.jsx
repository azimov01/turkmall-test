import React from 'react';
import useScrollTop from 'hooks/useScrollTop';

const Error = ({ history }) => {
	useScrollTop();

	return (
		<div className="page-not-found">
			<h1>:( Произошла ошибка. Пожалуйста, попробуйте еще раз.</h1>
			<br />
			<button
				className="button"
				onClick={() => history.push('/')}
			>
				Еще раз
			</button>
		</div>

	);
};

export default Error;
