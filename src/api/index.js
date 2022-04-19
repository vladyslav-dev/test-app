export const itunesApiRequest = async(term) => {
	const url = new URL('https://itunes.apple.com/search');
	const params = {
        country: 'US',
        media: 'music',
        limit: 5,
		term,
	};
	try {
		url.search = new URLSearchParams(params);
		const response = await fetch(url);
		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
}