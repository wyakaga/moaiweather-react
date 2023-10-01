const regionConvert = (regionCode?: string) => {
	if (!regionCode) return undefined;
	const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
	return regionNames.of(regionCode);
};

export default regionConvert;
