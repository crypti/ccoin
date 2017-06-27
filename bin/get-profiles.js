const fs = require('fs');
const profilePath = require('./profile-path');

function getProfiles() {
	const path = profilePath();
	let profiles = {};

	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				if (err.code !== 'ENOENT') {
					reject(err);
				}
			}

			if (data) {
				profiles = JSON.parse(data);
			}

			resolve(profiles);
		});
	});
}

module.exports = getProfiles;
