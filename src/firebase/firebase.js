import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DB_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);

		this.storage = app.storage();
		this.db = app.firestore();
		this.auth = app.auth();
	}

	// AUTH ACTIONS 
	// --------

	createAccount = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	signInWithGoogle = () => this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

	signInWithFacebook = () => this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

	signOut = () => this.auth.signOut();

	passwordReset = email => this.auth.sendPasswordResetEmail(email);

	addUser = (id, user) => this.db.collection('users').doc(id).set(user);

	getUser = id => this.db.collection('users').doc(id).get();

	passwordUpdate = password => this.auth.currentUser.updatePassword(password);

	changePassword = (currentPassword, newPassword) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;
				user.updatePassword(newPassword).then(() => {
					resolve('Password updated successfully!');
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		});
	}

	reauthenticate = (currentPassword) => {
		const user = this.auth.currentUser;
		const cred = app.auth.EmailAuthProvider.credential(user.email, currentPassword);

		return user.reauthenticateWithCredential(cred);
	}

	updateEmail = (currentPassword, newEmail) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;
				user.updateEmail(newEmail).then(() => {
					resolve('Email Successfully updated');
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		});
	}

	updateProfile = (id, updates) => this.db.collection('users').doc(id).update(updates);

	onAuthStateChanged = () => {
		return new Promise((resolve, reject) => {
			this.auth.onAuthStateChanged((user) => {
				if (user) {
					resolve(user);
				} else {
					reject(new Error('Auth State Changed failed'));
				}
			});
		});
	}

	saveBasketItems = (items, userId) => this.db.collection('users').doc(userId).update({ basket: items });

	setAuthPersistence = () => this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

	// // PRODUCT ACTIONS
	// // ---------
	getProduct = (id) => this.db.collection('products').doc(id).get();

	getProducts = (lastRefKey, searchKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			let productsRef = this.db.collection('products');
			let queryRef = productsRef.orderBy(app.firestore.FieldPath.documentId());

			if (lastRefKey) {
				let query = queryRef.startAfter(lastRefKey).limit(12);

				if (searchKey) {
					query = productsRef.orderBy('name_lower').startAfter(lastRefKey).where('name_lower', '>=', searchKey).where('name_lower', '<=', searchKey + '\uf8ff').limit(12);
				}

				try {
					const snapshot = await query.get();
					const products = [];
					snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey });
				} catch (e) {
					reject(':( Failed to fetch products.');
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject('Request timeout, please try again');
				}, 15000);

				try {
					// getting the total count of data

					// adding shallow parameter for smaller response size
					// better than making a query from firebase
					// NOT AVAILEBLE IN FIRESTORE const request = await fetch(`${process.env.FIREBASE_DB_URL}/products.json?shallow=true`);
					const totalQueryRef = this.db.collection('products');
					let totalQuery = totalQueryRef;

					if (searchKey) {
						queryRef = productsRef.orderBy('name_lower');
						totalQuery = totalQueryRef.where('name_lower', '>=', searchKey).where('name_lower', '<=', searchKey + '\uf8ff');
						productsRef = queryRef.where('name_lower', '>=', searchKey).where('name_lower', '<=', searchKey + '\uf8ff').limit(12);
					}

					const totalResult = await totalQuery.get();
					const total = totalResult.docs.length;
					const snapshot = await productsRef.limit(12).get();

					clearTimeout(timeout);
					if (!didTimeout) {
						const products = [];
						snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];

						resolve({ products, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(':( Failed to fetch products.');
				}
			}
		});
	}

	// searchProduct = (keyword) => this.db.collection('products').where('name_lower', '>=', keyword).where('name_lower', '<=', keyword + '\uf8ff').get();
	getFeaturedProducts = (itemsCount = 12) => this.db.collection('products').where('isFeatured', '==', true).limit(itemsCount).get();

	getRecommendedProducts = (itemsCount = 12) => this.db.collection('products').where('isRecommended', '==', true).limit(itemsCount).get();

	addProduct = (id, product) => this.db.collection('products').doc(id).set(product);

	generateKey = () => this.db.collection('products').doc().id;

	storeImage = async (id, folder, imageFile) => {
		const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
		const downloadURL = await snapshot.ref.getDownloadURL();

		return downloadURL;
	}

	deleteImage = id => this.storage.ref('products').child(id).delete();

	editProduct = (id, updates) => this.db.collection('products').doc(id).update(updates);

	removeProduct = id => this.db.collection('products').doc(id).delete();

	///////BRAND///////

	addBrand = (id, brand) => this.db.collection('brands').doc(id).set(brand);

	getBrand = id => this.db.collection('brands').doc(id).get();

	/////CATEGORY/////////

	addCategory = (id, category) => this.db.collection('category').doc(id).set(category);
}

const firebase = new Firebase();

// If you want to add a new field to every single document, run this
// delete or comment after first run or it may override what you have edited on first run.

// (async function () {
// 	const col = await firebase.db.collection('products').get();
// 	col.forEach((doc) => {
// 		doc.ref.update({
// 			isRecommended: false
// 		});
// 	})
// })()

export default firebase;
