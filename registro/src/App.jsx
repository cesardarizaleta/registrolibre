import './App.css'
import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './components/pdf';
import { useEffect, useState } from 'react';
function App() {

  firebase.initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
  })

  const db = firebase.firestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formato = e.target.format.value;

    const lines = formato.split('\n');
    const extractValue = (index) => {
      const line = lines[index];
      return line ? line.split(':')[1]?.trim() : '';
    };

    const [nombre, telefono, retira, ubicacion, producto, cantidad, pago, fecha] = [
      extractValue(0),
      extractValue(1),
      extractValue(2),
      extractValue(3),
      extractValue(4),
      extractValue(5),
      extractValue(6),
      extractValue(7)
    ];

    //Obtener Registros
    db.collection("registro").add({
      formato: formato,
      nombre: nombre,
      telefono: telefono,
      retira: retira,
      ubicacion: ubicacion,
      producto: producto,
      cantidad: cantidad,
      pago: pago,
      fecha: fecha
    })
      .then((docRef) => {
        alert("Producto registrado con éxito");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const obtenerRegistros = async () => {
    const registros = [];
    await db.collection("registro").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        registros.push(doc.data());
      });
    });
    return registros;
  }

  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    obtenerRegistros().then(setRegistros);
  }, []);


  return (
    <section className="h-screen w-screen flex justify-center flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold">Registro de Productos</h1>
      <form className="flex flex-col gap-2 w-1/2" onSubmit={handleSubmit}>
        <textarea className="border-2 outline-none resize-none border-blue-400 rounded-xl p-2" placeholder="Ingresa el formato" name="format" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Agregar</button>
      </form>
      <PDFDownloadLink document={<MyDocument registros={registros} />} fileName="registro.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando documento...' : 'Ver Registro'
        }
      </PDFDownloadLink>
    </section>
  )
}

export default App
