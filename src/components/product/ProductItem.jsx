import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromBasket, addToBasket } from 'redux/actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import ImageLoader from '../ui/ImageLoader';

const ProductItem = ({
	product,
	isItemOnBasket,
	isLoading
}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onClickItem = () => {
		if (isLoading) return;

		if (product.id) {
			history.push(`/product/${product.id}`);
		}
	};

	const onAddToBasket = () => {
		if (isItemOnBasket) {
			dispatch(removeFromBasket(product.id));
			displayActionMessage('Товар удален из корзины', 'info');
		} else {
			dispatch(addToBasket(product));
			displayActionMessage('Товар добавлен в корзину', 'success');
		}
	};

	return (
		<SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
			<div
				className={`product-card ${!product.id ? 'product-loading' : ''}`}
				style={{
					border: isItemOnBasket ? '1px solid #cacaca' : '',
					boxShadow: isItemOnBasket ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
				}}
			>
				{isItemOnBasket && <i className="fa fa-check product-card-check" />}
				<div
					className="product-card-content"
					onClick={onClickItem}
				>
					<div className="product-card-img-wrapper">
						{product.image ? (
							<ImageLoader
								className="product-card-img"
								src={product.image}
							/>
						) : <Skeleton width={'100%'} height={'90%'} />}
					</div>
					<div className="product-details">
						<h5 className="product-card-name text-overflow-ellipsis margin-auto">{product.name || <Skeleton width={80} />}</h5>
						<p className="product-card-brand">{product.brand || <Skeleton width={60} />}</p>
						<h4 className="product-card-price">{product.price ? displayMoney(product.price) : <Skeleton width={40} />}</h4>
					</div>
				</div>
				{product.id && (
					<button
						className={`product-card-button button-small button button-block ${isItemOnBasket ? 'button-border button-border-gray' : ''}`}
						onClick={onAddToBasket}
					>
						{isItemOnBasket ? 'Удалить из корзины' : 'Добавить в корзину'}
					</button>
				)}

			</div>
		</SkeletonTheme>
	);
};

ProductItem.propType = {
	product: PropTypes.object.isRequired,
	isItemOnBasket: PropTypes.bool
};

export default ProductItem;
