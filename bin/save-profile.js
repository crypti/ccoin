const fs = require('fs');
const path = require('path');
const profiles = require('../profiles.json');

function saveProfile(name, from, to) {
	const updatedProfile = profiles;
	updatedProfile[name] = {
		from,
		to
	};

	const data = JSON.stringify(updatedProfile, null, 2);
	const filePath = path.resolve(__dirname, '../', 'profiles.json');

	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, data, err => {
			if (err) {
				reject(err);
			}
			resolve(updatedProfile);
		});
	});
}

module.exports = saveProfile;
