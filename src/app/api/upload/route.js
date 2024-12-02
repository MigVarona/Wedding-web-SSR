import { NextResponse } from 'next/server';
import { pinata } from '@/app/lib/config';

const GROUP_ID = '0193890f-b9c0-73a3-8fd0-c1e93479bd04'; // ID de grupo preexistente

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No se ha recibido ningún archivo.' }, { status: 400 });
    }

    // Usa el método correcto de la SDK para subir el archivo al grupo específico
    const uploadData = await pinata.upload.file(file, {
      groupId: GROUP_ID, // Pasa el ID del grupo preexistente
    });

    // Crea una URL firmada (ajusta según tu necesidad)
    const url = `https://${pinata.pinataGateway}/ipfs/${uploadData.IpfsHash}`;

    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
