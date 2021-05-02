/* eslint-disable react/no-multi-comp */
import React, { lazy, Suspense } from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import CircularProgress from 'components/ui/CircularProgress';
import UserTab from '../tab/UserTab';
import useScrollTop from 'hooks/useScrollTop';

const UserAccountTab = lazy(() => import('../tab/UserAccountTab'));
const UserWishListTab = lazy(() => import('../tab/UserWishListTab'));
const UserOrdersTab = lazy(() => import('../tab/UserOrdersTab'));

const Loader = () => (
	<div className="loader" style={{ minHeight: '80vh' }}>
		<CircularProgress />
		<h6>Loading ... </h6>
	</div>
);

const UserAccount = () => {
	useScrollTop();
	useDocumentTitle('My Account');
	return (
		<UserTab>
			<div index={0} label="Профиль">
				<Suspense fallback={<Loader />}>
					<UserAccountTab />
				</Suspense>
			</div>
			<div index={1} label="Список желаний">
				<Suspense fallback={<Loader />}>
					<UserWishListTab />
				</Suspense>
			</div>
			<div index={2} label="Мои заказы">
				<Suspense fallback={<Loader />}>
					<UserOrdersTab />
				</Suspense>
			</div>
		</UserTab>
	);
};

export default UserAccount;
