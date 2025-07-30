
import axios from "axios";

const url = "https://pixabay.com/api/";
const key = "51319352-42813f34bc37caf0322d42b73";

export const getImagesByQuery = async (query, page = 1) => {
	const res = await axios(url, {
		params: {
			key,
			q: query,
			image_type: "photo",
			orientation: "horizontal",
			safesearch: true,
			page,
			per_page: 15,
		}
	});
	return {
		hits: res.data.hits,
		totalHits: res.data.totalHits
	};

};