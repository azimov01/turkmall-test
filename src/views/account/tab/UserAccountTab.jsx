/* eslint-disable indent */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { displayDate } from 'helpers/utils';
import { ACCOUNT_EDIT } from 'constants/routes';
import ImageLoader from 'components/ui/ImageLoader';

const UserProfile = (props) => {
	const profile = useSelector(state => state.profile);

	return (
		<div className="user-profile">
			<div className="user-profile-block">
				<div className="user-profile-banner">
					<div className="user-profile-banner-wrapper">
						<ImageLoader
							alt="Banner"
							className="user-profile-banner-img"
							src={profile.banner}
						/>
					</div>
					<div className="user-profile-avatar-wrapper">
						<ImageLoader
							alt="Avatar"
							className="user-profile-img"
							src={profile.avatar}
						/>
					</div>
					<button
						className="button button-small user-profile-edit"
						onClick={() => props.history.push(ACCOUNT_EDIT)}
					>
						Редактировать
					</button>
				</div>
				<div className="user-profile-details">
					<h2 className="user-profile-name">{profile.fullname}</h2>
					<span>Электронный почта</span>
					<br />
					<h5>{profile.email}</h5>
					<span>Адрес</span>
					<br />
					{profile.address ? (
						<h5>{profile.address}</h5>
					) : (
							<h5 className="text-subtle text-italic">Адрес не указан</h5>
						)}
					<span>Номер телефона</span>
					<br />
					{profile.mobile.data ? (
						<h5>{profile.mobile.data.num ? profile.mobile.data.num : '+998'}</h5>
					) : (
							<h5 className="text-subtle text-italic">Номер телефона не указан</h5>
						)}
					<span>Дата создания</span>
					<br />
					{profile.dateJoined ? (
						<h5>{displayDate(profile.dateJoined)}</h5>
					) : (
							<h5 className="text-subtle text-italic">Недоступен</h5>
						)}
				</div>
			</div>
		</div>
	);
};

export default withRouter(UserProfile);
