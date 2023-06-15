const { deterministicPartitionKey } = require("./dpk");
//const { deterministicPartitionKey } = require("./dpk-refactored");
const cryto = require('crypto');

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the existing partion key if there is one" , () => {
    const partitionKey = 'testKey'
    const event = { partitionKey }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(partitionKey);
  });

  it("Returns the hashed candidate if there is no existing key", () => {

  const event = { firstName: 'TEST', lastName: 'USER'};

  jest.spyOn(cryto,'createHash').mockImplementation(() => {
    return {
      update: () => {
        return {
          digest: () => {
            return 'this-is-random-hash-of-less-than-256-char-hex-digested';
          }
        }
      }
    };
  });

  const trivialKey = deterministicPartitionKey(event);
  expect(trivialKey).toBe('this-is-random-hash-of-less-than-256-char-hex-digested');
  });

  it("Returns the hashed and stringified candidate if there is no existing key and hash is not a string", () => {

    const event = { firstName: 'TEST', lastName: 'USER'};
  
    jest.spyOn(cryto,'createHash').mockImplementation(() => {
      return {
        update: () => {
          return {
            digest: () => {
              return 1234567890;
            }
          }
        }
      };
    });
  
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('1234567890');
  });

  it("Returns the hashed and candidate if there is no existing key and hash should be truncated to 256 chars", () => {

    const event = { firstName: 'TEST', lastName: 'USER'};
  
    jest.spyOn(cryto,'createHash').mockImplementation(() => {
      return {
        update: () => {
          return {
            digest: () => {
              return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id sapien vitae risus ultricies facilisis quis vel augue. Sed facilisis lacus venenatis metus interdum rutrum. Phasellus sollicitudin interdum elit placerat facilisis. Cras hendrerit ligula magna, et tristique ex commodo at porttitor.';
            }
          }
        }
      };
    });
  
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('1234567890');
  });
});
