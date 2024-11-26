import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(req) {
  try {
    const { name, message } = await req.json(); // Asegúrate de obtener los datos del cuerpo de la solicitud

    if (!name || !message) {
      return new Response(JSON.stringify({ message: "Faltan campos requeridos." }), { status: 400 });
    }

    await client.connect();
    const database = client.db("Cm");
    const collection = database.collection("messages");

    const newMessage = {
      name,
      message,
      timestamp: new Date(),
    };

    const result = await collection.insertOne(newMessage);

    return new Response(JSON.stringify({ message: "Mensaje guardado exitosamente." }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error al guardar el mensaje." }), { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET() {
    try {
      await client.connect();
      const database = client.db("Cm");
      const collection = database.collection("messages");
  
      const messages = await collection.find().sort({ timestamp: -1 }).toArray(); // Ordena los mensajes por fecha
  
      return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: "Error al obtener los mensajes." }), { status: 500 });
    } finally {
      await client.close();
    }
  }
