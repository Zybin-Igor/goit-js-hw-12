
const refs = {
	form: document.querySelector(".form"),
	input: document.querySelector('input[name="search-text"]'),
	gallery: document.querySelector(".gallery"),
	loader: document.querySelector(".loader"),
	loadBtn: document.querySelector(".load-more-btn"),
	scrollBtn: document.querySelector('.scroll-to-top'),
	header: document.querySelector("header"),
}

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
	createGallery,
	clearGallery,
	showLoader,
	hideLoader,
	showLoadMoreButton,
	hideLoadMoreButton,
	smoothScrollByCard,
	toggleScrollButton,
} from "./js/render-functions";

window.addEventListener("scroll", toggleScrollButton);


let query = "";
let page = 1;

refs.form.addEventListener("submit", async (event) => {
	event.preventDefault();
	clearGallery();


	query = refs.input.value.trim();
	page = 1;

	if (!query) {
		return iziToast.error({
			message: "Please enter a search query!",
			position: "topRight"
		})
	};

	showLoader();
	hideLoadMoreButton();

	try {
		const { hits, totalHits } = await getImagesByQuery(query, page);


		if (hits.length === 0) {
			return iziToast.error({
				message: `Sorry, there are no images matching your search ${query}. Please try again!`,
				position: "topRight",
			});
		}

		createGallery(hits);

		const totalPages = Math.ceil(totalHits / 15);

		if (page >= totalPages) {
			iziToast.info({
				message: "We're sorry, but you've reached the end of search results.",
				position: "topRight",
			});
		} else {
			showLoadMoreButton();
		}
	} catch (error) {
		iziToast.error({
			title: error.message,
		});
	}
	finally {
		hideLoader()
	};

	refs.form.reset();
});

refs.loadBtn.addEventListener("click", async (event) => {

	page += 1;
	hideLoadMoreButton();
	showLoader();

	try {
		const { hits, totalHits } = await getImagesByQuery(query, page);

		createGallery(hits);

		setTimeout(() => {
			smoothScrollByCard();
		}, 300);

		const totalPages = Math.ceil(totalHits / 15);

		if (page >= totalPages) {
			hideLoadMoreButton();
			iziToast.info({
				message: "We're sorry, but you've reached the end of search results.",
				position: "topRight",
			});
		} else {
			showLoadMoreButton();
		}
	} catch (error) {
		iziToast.error({
			title: error.message,
		});
	} finally {
		hideLoader();
	};

});

refs.scrollBtn.addEventListener("click", (e) => {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: "smooth" });
});