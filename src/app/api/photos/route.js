import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: 'blue-used-tarsier-623.mypinata.cloud',
});
export async function GET(req) {
  try {
    // URL de la solicitud para obtener archivos desde Pinata
    const url = `https://api.pinata.cloud/v3/files`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud a Pinata');
    }

    const filesData = await response.json();

    // Verifica que `files` sea un array y asigna su valor
    const files = Array.isArray(filesData.data?.files) ? filesData.data.files : [];

    if (files.length === 0) {
      console.log('No se encontraron archivos.');
    } else {
      console.log('Archivos encontrados:', files);
    }

    // Construye las URLs públicas de las imágenes
    const photos = files.map((file) => ({
      id: file.id,
      name: file.name,
      cid: file.cid,
    }));

    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener los archivos:', error);
    return new Response('Error al obtener los archivos', {
      status: 500,
    });
  }
}

