import React from 'react';
import useScrollTop from 'hooks/useScrollTop';

const NoInternet = () => {
	useScrollTop();

	return (
		<div className="page-not-found">
			<h1>:( Подключение к Интернету отсутствует.</h1>
			<p>Пожалуйста, проверьте подключение к сети и попробуйте еще раз.</p>
			<br />
			<button
				className="button"
				onClick={() => window.location.reload(true)}
			>
				Еще раз
			</button>
		</div>

	);
};

export default NoInternet;
