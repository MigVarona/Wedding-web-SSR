import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!id) {
    return new Response(JSON.stringify({ message: "ID no proporcionado" }), { status: 400 });
  }

  try {
    await client.connect();
    const database = client.db("Cm");
    const collection = database.collection("CrisMiguel");

    const objectId = new ObjectId(id);

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ message: "RSVP eliminado" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "No se encontró el RSVP" }), { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error al eliminar el RSVP" }), { status: 500 });
  } finally {
    await client.close();
  }
}
