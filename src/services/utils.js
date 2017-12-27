const crypto = require('crypto');


const HASH_ALGORITHM = 'sha256';

  // SHA256 hash
exports.hash =  function(data) {

	let hash = crypto.createHash(HASH_ALGORITHM);

	hash.update(data);

	return hash.digest();

};