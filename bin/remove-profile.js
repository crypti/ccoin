const fs = require('fs');
const path = require('path');
const profiles = require('../profiles.json');

function removeProfile(name) {
	const updatedProfile = profiles;
	delete updatedProfile[name];

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

module.exports = removeProfile;
