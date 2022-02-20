export const postToShopify = async ({ query, variables }) => {
	try {
		// @ts-ignore
		const result = await fetch( 'https://' + process.env.VUE_APP_SHOPIFY_DOMAIN + '/api/2022-01/graphql', {
			method: 'POST',
            mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': process.env.VUE_APP_SHOPIFY_STOREFRONT
			},
			body: JSON.stringify({ query, variables })
		}).then((res) => res.json());

		if (result.errors) {
			console.log({ errors: result.errors });
		} else if (!result || !result.data) {
			console.log({ result });
			return 'No results found.';
		}

		return result.data;
	} catch (error) {
		console.log(error);
	}
};