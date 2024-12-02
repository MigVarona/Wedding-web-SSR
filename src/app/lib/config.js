import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: 'blue-used-tarsier-623.mypinata.cloud', // Ajusta tu gateway aquí
});

export { pinata };
