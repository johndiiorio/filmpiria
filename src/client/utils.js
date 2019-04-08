const readUploadedFileAsText = file => {
	const fileReader = new FileReader();

	return new Promise((resolve, reject) => {
		fileReader.onerror = () => {
			fileReader.abort();
			reject();
		};

		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.readAsText(file);
	});
};

const csvToArray = text => {
	let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
	for (l of text) {
		if ('"' === l) {
			if (s && l === p) row[i] += l;
			s = !s;
		} else if (',' === l && s) l = row[++i] = '';
		else if ('\n' === l && s) {
			if ('\r' === p) row[i] = row[i].slice(0, -1);
			row = ret[++r] = [l = '']; i = 0;
		} else row[i] += l;
		p = l;
	}
	return ret;
};

export const parseRatingsFile = async file => {
	try {
		const text = await readUploadedFileAsText(file);
		const textWithoutR = text.split('\r').join();
		const data = csvToArray(textWithoutR).slice(1);
		let ratings = [];
		data.forEach(d => {
			if (d.length >= 5) {
				ratings.push({
					title: d[1],
					year: d[2],
					url: d[3].split('film/')[1],
					rating: parseFloat(d[4]) * 2
				});
			}
		});
		return ratings;
	} catch (err) {
		return [];
	}
}


export default parseRatingsFile;
