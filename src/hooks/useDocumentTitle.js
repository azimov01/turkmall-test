import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
	useLayoutEffect(() => {
		if (title) {
			document.title = title;
		} else {
			document.title = 'Turkmall | Shop';
		}
	}, [title]);
};

export default useDocumentTitle;
