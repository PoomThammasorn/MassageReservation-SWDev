export default timecompare = (time1, time2, isLess) => {
	const t1 = parseInt(time1.replace(":", ""));
	const t2 = parseInt(time2.replace(":", ""));
	if (isLess) return t1 < t2;
	return t1 > t2;
};
