const setDate = () => {
	const now = new Date();
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return now.toLocaleString("en-GB", options);
};

export default setDate;
