import { IpfsGateway, isIpfsUrl } from "@crossbell/ipfs-gateway";
import { getOrigin } from "../url";

export const ipfsGateway = new IpfsGateway();

export const ipfsLinkToHttpLink = (
	link: string,
	{
		noOrigin,
		forceProductionOrigin,
	}: {
		noOrigin?: boolean;
		forceProductionOrigin?: boolean;
	} = {}
): string => {
	if (!link) {
		return "";
	}

	let ret = link;

	if (isIpfsUrl(link)) {
		ret = ipfsGateway.getSwWeb2Url(link);
	}

	if (ret.startsWith("/") && !noOrigin) {
		ret = getOrigin({ forceProductionOrigin }) + ret;
	}

	return ret;
};

export const uploadToIpfs = async (file: File | Blob) => {
	const formData = new FormData();
	formData.append("file", file);

	const result = await fetch("https://ipfs-relay.crossbell.io/upload", {
		method: "PUT",
		body: formData,
	});

	if (result.ok) {
		const res = await result.json();
		return res.url;
	}
};
