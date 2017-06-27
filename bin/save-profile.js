const fs = require('fs');
const profilePath = require('./profile-path');
const getProfiles = require('./get-profiles');

function saveProfile(name, from, to) {
	return getProfiles()
		.then(profiles => {
			const updatedProfile = profiles;
			updatedProfile[name] = {
				from,
				to
			};

			const data = JSON.stringify(updatedProfile, null, 2);
			const filePath = profilePath();

			return new Promise((resolve, reject) => {
				fs.writeFile(filePath, data, err => {
					if (err) {
						reject(err);
					}
					resolve(updatedProfile);
				});
			});
		});
}

module.exports = saveProfile;
