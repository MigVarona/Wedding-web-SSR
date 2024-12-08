import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

// Función para manejar la solicitud POST
export async function POST(req) {
  const { name, guests, accommodation, nights } = await req.json();

  try {
    await client.connect();
    const database = client.db("Cm"); // Cambia a tu base de datos
    const collection = database.collection("CrisMiguel"); // Cambia a tu colección deseada

    const newRSVP = {
      name,
      guests,
      accommodation,
      nights,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newRSVP);
    return new Response(JSON.stringify({ message: "RSVP guardado", data: result }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error al guardar RSVP" }), { status: 500 });
  } finally {
    await client.close();
  }
}

// Función para manejar la solicitud GET
export async function GET(req) {
  try {
    await client.connect();
    const database = client.db("Cm"); // Cambia a tu base de datos
    const collection = database.collection("CrisMiguel"); // Cambia a tu colección deseada

    // Realiza la consulta para obtener todos los documentos
    const rsvps = await collection.find().toArray();

    return new Response(JSON.stringify({ data: rsvps }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error al obtener los datos" }), { status: 500 });
  } finally {
    await client.close();
  }
}

// Función para manejar la solicitud DELETE

