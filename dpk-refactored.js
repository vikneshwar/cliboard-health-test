const crypto = require("crypto");

const HASH_ALGORITHM = "sha3-512";
const DIGEST = "hex";

const generateCandidateHash = (
  data,
  { algorithm = HASH_ALGORITHM, digest = DIGEST } = {}
) => crypto.createHash(algorithm).update(data).digest(digest);

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  candidate =
    event.partitionKey ?? generateCandidateHash(JSON.stringify(event));

  /* candidate =
    typeof candidate !== "string" ? JSON.stringify(candidate) : candidate; */

  if(typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  /* candidate =
    candidate.length > MAX_PARTITION_KEY_LENGTH
      ? generateCandidateHash(candidate)
      : candidate; */

  if(candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateCandidateHash(candidate);
  }

  return candidate;
};
