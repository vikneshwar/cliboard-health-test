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
    candidate = TRIVIAL_PARTITION_KEY;
    return candidate;
  }

  candidate =
    event.partitionKey ?? generateCandidateHash(JSON.stringify(event));

  candidate =
    typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;

  candidate =
    candidate.length > MAX_PARTITION_KEY_LENGTH
      ? generateCandidateHash(candidate)
      : candidate;

  return candidate;
};
