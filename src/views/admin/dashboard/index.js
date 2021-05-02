import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

const Dashboard = () => {
	useDocumentTitle('Turkmall | Admin');
	useScrollTop();

	return (
		<div className="loader">
			<h2>Добро пожаловать в админ-панель</h2>
		</div>
	);
};

export default Dashboard;
