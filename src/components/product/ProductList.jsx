/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-sort-props */
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { useDispatch } from 'react-redux';

import { getProducts } from 'redux/actions/productActions';
import { setLoading } from 'redux/actions/miscActions';
import MessageDisplay from '../ui/MessageDisplay';

const ProductList = (props) => {
	const [isFetching, setFetching] = useState(false);

	const dispatch = useDispatch();
	const fetchProducts = () => {
		setFetching(true);
		dispatch(getProducts(props.lastRefKey));
	};

	useEffect(() => {
		if (props.productsCount === 0 || !props.lastRefKey) {
			fetchProducts();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []);

	useEffect(() => {
		setFetching(false);
	}, [props.lastRefKey]);

	const foundOnBasket = id => !!props.basket.find(item => item.id === id);

	return props.filteredProducts.length === 0 && !props.isLoading && !props.lastRefKey ? (
		<MessageDisplay
			message={props.requestStatus ? props.requestStatus : 'Не удалось получить товары.'}
		/>
	) : props.requestStatus ? (
		<MessageDisplay
			message={props.requestStatus}
			action={fetchProducts}
			buttonLabel="Еще раз"
		/>
	) : (
				<>
					{props.children({ foundOnBasket })}
					{props.productsCount < props.totalProductsCount && (
						<div className="d-flex-center padding-l">
							<button
								className="button button-small"
								disabled={isFetching}
								onClick={fetchProducts}
							>
								{isFetching ? 'Получение товаров...' : 'Показать больше'}
							</button>
						</div>
					)}
				</>
			);
};

ProductList.propType = {
	filter: PropTypes.object,
	basket: PropTypes.arrayOf(object),
	filteredProducts: PropTypes.arrayOf(PropTypes.object),
	products: PropTypes.arrayOf(object),
	isLoading: PropTypes.bool.isRequired,
	requestStatus: PropTypes.string.isRequired,
	productsCount: PropTypes.number.isRequired,
	totalProductsCount: PropTypes.number.isRequired,
	filteredProductsLength: PropTypes.number.isRequired,
};

export default ProductList;
