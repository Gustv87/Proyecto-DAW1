const pgp = require('pg-promise')();
const cn = "postgres://dlaboratory_user:xmlMHSPP26Uti42HDndbm1A98HkdmFAu@dpg-ck573i6ru70s738tc010-a.oregon-postgres.render.com/dlaboratory";



const options = {
   ssl: {
     rejectUnauthorized: false, // Deshabilitar la validación SSL/TLS
   },
 };

const db = pgp({ connectionString: cn, ...options });

db.connect()
   .then(() => {
      console.log("Conexion Exitosa Postgres");
   })
   .catch((error) => {
      console.log("Error al conectar a la base de datos:", error);
      process.exit(1); // Salir del proceso en caso de error de conexión
   });

module.exports = db;


