export const readUploadedFileAsText = file => {
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

export const parseRatingsFile = async file => {
	try {
		const text = await readUploadedFileAsText(file);
		return text.split('\n').map(line => {
			line = line.replace('\r', '').split(',');
			return {
				title: line[1],
				year: line[2],
				rating: parseFloat(line[4]) * 2
			};
		}).slice(1);
	} catch (err) {
		return [];
	}
}

export default parseRatingsFile;
