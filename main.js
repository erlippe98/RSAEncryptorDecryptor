// Function to calculate the greatest common divisor (Euclidean Algorithm)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Function to calculate the modular inverse (Extended Euclidean Algorithm)
function modInverse(a, m) {
    let m0 = m;
    let x0 = 0;
    let x1 = 1;

    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;

        m = a % m;
        a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    return x1 < 0 ? x1 + m0 : x1;
}

// Function to generate RSA keys
function generateRSAKeys() {
    // Choose two random prime numbers (p and q)
    const p = 61;
    const q = 53;

    // Calculate n (product of p and q)
    const n = p * q;

    // Calculate Euler's totient function (fi)
    const fi = (p - 1) * (q - 1);

    // Choose the public key e (must be coprime with fi)
    const e = 17;

    // Calculate the private key d (multiplicative inverse of e modulo fi)
    const d = modInverse(e, fi);

    return {
        publicKey: { n, e },
        privateKey: { n, d }
    };
}

// Function to encrypt a message
function encrypt(message, publicKey) {
    const { n, e } = publicKey;
    const encryptedMessage = BigInt(message) ** BigInt(e) % BigInt(n);
    return encryptedMessage.toString();
}

// Function to decrypt a message
function decrypt(encryptedMessage, privateKey) {
    const { n, d } = privateKey;
    const decryptedMessage = BigInt(encryptedMessage) ** BigInt(d) % BigInt(n);
    return decryptedMessage.toString();
}

// Example usage
const keys = generateRSAKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

const originalMessage = '123456';
console.log('Original Message:', originalMessage);

const encryptedMessage = encrypt(originalMessage, publicKey);
console.log('Encrypted Message:', encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage, privateKey);
console.log('Decrypted Message:', decryptedMessage);
