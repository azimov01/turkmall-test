import React, { Component } from 'react';

class Boundary extends Component {
	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	state = {
		hasError: false
	};


	componentDidCatch(error, errorInfo) {
		console.log(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="loader">
					<h3>:( Что-то пошло не так. Пожалуйста, попробуйте еще раз.</h3>
				</div>
			);
		}

		return this.props.children;
	}
}

export default Boundary;
