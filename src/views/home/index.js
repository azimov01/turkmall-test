import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImg from 'images/234.jpg';

import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from 'constants/routes';
import MessageDisplay from 'components/ui/MessageDisplay';
import ProductFeatured from 'components/product/ProductFeatured';
import useFeaturedProducts from 'hooks/useFeaturedProducts';
import useRecommendedProducts from 'hooks/useRecommendedProducts';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';
import firebase from "../../firebase/firebase";
import {addToBasket, removeFromBasket} from "../../redux/actions/basketActions";
import {displayActionMessage} from "../../helpers/utils";

const Home = () => {
	useDocumentTitle('Turkmall | Home');
	useScrollTop();


	const {
		featuredProducts,
		fetchFeaturedProducts,
		isLoading: isLoadingFeatured,
		error: errorFeatured,
	} = useFeaturedProducts(6);
	const {
		recommendedProducts,
		fetchRecommendedProducts,
		isLoading: isLoadingRecommended,
		error: errorRecommended,
	} = useRecommendedProducts(6);


	return (
		<div className="home">
			<div className="banner">
				<div className="banner-desc">

					<h1 className="text-thin">С <strong>Turkmall</strong> все просто!</h1>
					<p>Вещи прямо из Turkey. В наличии и на заказ. Доставка 7-15 дней</p>
					{/*<p>В наличии и на заказ</p>*/}
					{/*<p>Доставка 7-15 дней</p>*/}
					<br />
					<Link to={SHOP} className="button">
						Купить сейчас
					</Link>
				</div>
				<div className="banner-img">
					<img src={bannerImg} alt="" />
				</div>
			</div>
			<div className="display">
				<div className="display-header">
					<h1>Featured Products</h1>
					<Link to={FEATURED_PRODUCTS}>Посмотреть все</Link>
				</div>
				<div className="product-display-grid">
					{(errorFeatured && !isLoadingFeatured) ? (
						<MessageDisplay
							message={errorFeatured}
							action={fetchFeaturedProducts}
							buttonLabel="Еще раз"
						/>
					) : (
							<>
								{featuredProducts.length === 0 ? new Array(4).fill({}).map((product, index) => (
									<ProductFeatured
										key={`product-skeleton ${index}`}
										product={product}
									/>
								)) : featuredProducts.map(product => (
									<ProductFeatured
										key={product.id}
										isLoading={isLoadingFeatured}
										product={product}
									/>
								))}
							</>
						)}
				</div>
			</div>
			<div className="display">
				<div className="display-header">
					<h1>Рекомендуемые товары</h1>
					<Link to={RECOMMENDED_PRODUCTS}>Посмотреть все</Link>
				</div>
				<div className="product-display-grid">
					{(errorRecommended && !isLoadingRecommended) ? (
						<MessageDisplay
							message={errorRecommended}
							action={fetchRecommendedProducts}
							buttonLabel="Еще раз"
						/>
					) : (
							<>
								{recommendedProducts.length === 0 ? new Array(4).fill({}).map((product, index) => (
									<ProductFeatured
										key={`product-skeleton ${index}`}
										product={product}
									/>
								)) : recommendedProducts.map(product => (
									<ProductFeatured
										key={product.id}
										isLoading={isLoadingRecommended}
										product={product}
									/>
								))}
							</>
						)}
				</div>
			</div>
		</div>
	);
};

export default Home;
