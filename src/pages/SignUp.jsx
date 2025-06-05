import { Form, Image, Spinner } from "react-bootstrap";

import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import {
  ButtonStyled,
  NavLinkStyled,
  LoginFormStyled,
  LoginContainerStyled2,
} from "../components/StyledComponents";
import { signUp } from "../api/auth/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

{
  /*Defino el esquema */
}

// Datos de departamentos y ciudades de Colombia
const departamentosYCiudades = {
  Amazonas: [
    "Leticia",
    "El Encanto",
    "La Chorrera",
    "La Pedrera",
    "La Victoria",
    "Miriti - Paraná",
    "Puerto Alegría",
    "Puerto Arica",
    "Puerto Nariño",
    "Puerto Santander",
    "Tarapacá",
  ],
  Antioquia: [
    "Medellín",
    "Bello",
    "Itagüí",
    "Envigado",
    "Apartadó",
    "Turbo",
    "Rionegro",
    "Sabaneta",
    "Copacabana",
    "La Estrella",
    "Caucasia",
    "Necoclí",
    "El Carmen de Viboral",
    "Puerto Berrío",
    "Chigorodó",
  ],
  Arauca: [
    "Arauca",
    "Arauquita",
    "Cravo Norte",
    "Fortul",
    "Puerto Rondón",
    "Saravena",
    "Tame",
  ],
  Atlántico: [
    "Barranquilla",
    "Soledad",
    "Malambo",
    "Sabanagrande",
    "Puerto Colombia",
    "Galapa",
    "Sabanalarga",
    "Baranoa",
    "Usiacurí",
    "Tubará",
    "Ponedera",
    "Palmar de Varela",
    "Candelaria",
    "Campo de la Cruz",
    "Repelón",
  ],
  Bolívar: [
    "Cartagena",
    "Magangué",
    "Turbaco",
    "Arjona",
    "El Carmen de Bolívar",
    "San Pablo",
    "Santa Rosa",
    "Simití",
    "Mompós",
    "Mahates",
    "María la Baja",
    "San Juan Nepomuceno",
    "Santa Rosa del Sur",
    "Morales",
    "San Jacinto",
  ],
  Boyacá: [
    "Tunja",
    "Duitama",
    "Sogamoso",
    "Chiquinquirá",
    "Paipa",
    "Villa de Leyva",
    "Puerto Boyacá",
    "Monguí",
    "Nobsa",
    "Garagoa",
    "Barbosa",
    "Sáchica",
    "Ráquira",
    "Tinjacá",
    "Sutamarchán",
  ],
  Caldas: [
    "Manizales",
    "La Dorada",
    "Chinchiná",
    "Riosucio",
    "Anserma",
    "Villamaría",
    "Pensilvania",
    "Supía",
    "Palestina",
    "Aguadas",
    "Pácora",
    "Salamina",
    "Aranzazu",
    "Belalcázar",
    "Filadelfia",
  ],
  Caquetá: [
    "Florencia",
    "San Vicente del Caguán",
    "Puerto Rico",
    "La Montañita",
    "El Paujil",
    "Cartagena del Chairá",
    "El Doncello",
    "Belén de los Andaquíes",
    "Albania",
    "Curillo",
    "Milán",
    "Morelia",
    "San José del Fragua",
    "Solano",
    "Solita",
    "Valparaíso",
  ],
  Casanare: [
    "Yopal",
    "Aguazul",
    "Tauramena",
    "Villanueva",
    "Monterrey",
    "Sabanalarga",
    "Recetor",
    "Chameza",
    "Hato Corozal",
    "La Salina",
    "Maní",
    "Nunchía",
    "Orocué",
    "Paz de Ariporo",
    "Pore",
    "Támara",
    "Trinidad",
    "San Luis de Palenque",
    "Sácama",
  ],
  Cauca: [
    "Popayán",
    "Santander de Quilichao",
    "Puerto Tejada",
    "Patía",
    "Corinto",
    "Miranda",
    "Padilla",
    "Villa Rica",
    "Piendamó",
    "Silvia",
    "Guapi",
    "Timbío",
    "Caldono",
    "Jambaló",
    "Toribío",
  ],
  Cesar: [
    "Valledupar",
    "Aguachica",
    "Codazzi",
    "La Paz",
    "San Diego",
    "Chiriguaná",
    "Curumaní",
    "El Copey",
    "Bosconia",
    "El Paso",
    "Astrea",
    "Becerril",
    "La Gloria",
    "Manaure",
    "Pailitas",
    "Pelaya",
    "Pueblo Bello",
    "Río de Oro",
    "San Alberto",
    "San Martín",
    "Tamalameque",
  ],
  Chocó: [
    "Quibdó",
    "Istmina",
    "Condoto",
    "Tadó",
    "Riosucio",
    "Acandí",
    "Unguía",
    "Turbo",
    "Capurganá",
    "Bahía Solano",
    "Nuquí",
    "El Carmen de Atrato",
    "Lloró",
    "Bagadó",
    "Bojayá",
    "El Cantón del San Pablo",
    "Carmen del Darién",
    "Cértegui",
    "Juradó",
    "Litoral del San Juan",
    "Medio Atrato",
    "Medio Baudó",
    "Medio San Juan",
    "Nóvita",
    "Río Iró",
    "Río Quito",
    "San José del Palmar",
    "Sipí",
    "Unión Panamericana",
  ],
  Córdoba: [
    "Montería",
    "Cereté",
    "Sahagún",
    "Lorica",
    "Ciénaga de Oro",
    "Planeta Rica",
    "Montelíbano",
    "Tierralta",
    "Ayapel",
    "Buenavista",
    "Canalete",
    "Chinú",
    "Cotorra",
    "La Apartada",
    "Los Córdobas",
    "Momil",
    "Moñitos",
    "Pueblo Nuevo",
    "Puerto Escondido",
    "Puerto Libertador",
    "Purísima",
    "San Andrés Sotavento",
    "San Antero",
    "San Bernardo del Viento",
    "San Carlos",
    "San José de Uré",
    "San Pelayo",
    "Tuchín",
    "Valencia",
  ],
  Cundinamarca: [
    "Bogotá",
    "Soacha",
    "Girardot",
    "Zipaquirá",
    "Facatativá",
    "Chía",
    "Madrid",
    "Mosquera",
    "Fusagasugá",
    "Cajicá",
    "Sibaté",
    "Tocancipá",
    "Cota",
    "La Calera",
    "Sopó",
    "Tabio",
    "Tenjo",
    "Gachancipá",
    "Bojacá",
    "El Rosal",
    "Funza",
    "Subachoque",
    "Arbeláez",
    "Cabrera",
    "Choachí",
    "Chocontá",
    "Cogua",
    "Cáqueza",
    "Cucunubá",
    "El Colegio",
    "Fómeque",
    "Fosca",
    "Gachalá",
    "Gacheta",
    "Gama",
    "Girardot",
    "Granada",
    "Guachetá",
    "Guaduas",
    "Guasca",
    "Guataquí",
    "Guatavita",
    "Guayabal de Síquima",
    "Guayabetal",
    "Gutiérrez",
    "Jerusalén",
    "Junín",
    "La Mesa",
    "La Palma",
    "La Peña",
    "La Vega",
    "Lenguazaque",
    "Macheta",
    "Manta",
    "Medina",
    "Nemocón",
    "Nilo",
    "Nimaima",
    "Nocaima",
    "Venecia",
    "Pacho",
    "Paime",
    "Pandi",
    "Paratebueno",
    "Pasca",
    "Puerto Salgar",
    "Pulí",
    "Quebradanegra",
    "Quetame",
    "Quipile",
    "Apulo",
    "Ricaurte",
    "San Antonio del Tequendama",
    "San Bernardo",
    "San Cayetano",
    "San Francisco",
    "San Juan de Río Seco",
    "Sasaima",
    "Sesquilé",
    "Silvania",
    "Simijaca",
    "Susa",
    "Sutatausa",
    "Tausa",
    "Tena",
    "Tibacuy",
    "Tibirita",
    "Tocaima",
    "Topaipí",
    "Ubalá",
    "Ubaque",
    "Villa de San Diego de Ubaté",
    "Une",
    "Útica",
    "Vergara",
    "Vianí",
    "Villa Gómez",
    "Villa Pinzón",
    "Villeta",
    "Viotá",
    "Yacopí",
    "Zipacón",
  ],
  Guainía: [
    "Inírida",
    "Barranco Minas",
    "Mapiripana",
    "San Felipe",
    "Puerto Colombia",
    "La Guadalupe",
    "Cacahual",
    "Pana Pana",
    "Morichal",
  ],
  Guaviare: ["San José del Guaviare", "Calamar", "El Retorno", "Miraflores"],
  Huila: [
    "Neiva",
    "Pitalito",
    "Garzón",
    "La Plata",
    "Campoalegre",
    "Timaná",
    "San Agustín",
    "Íquira",
    "Rivera",
    "Palermo",
    "Gigante",
    "Aipe",
    "Algeciras",
    "Altamira",
    "Baraya",
    "Colombia",
    "Elías",
    "Guadalupe",
    "Hobo",
    "Isnos",
    "La Argentina",
    "Nátaga",
    "Oporapa",
    "Paicol",
    "Palestina",
    "Pital",
    "Saladoblanco",
    "Santa María",
    "Suaza",
    "Tarqui",
    "Tesalia",
    "Tello",
    "Teruel",
    "Villavieja",
    "Yaguará",
  ],
  "La Guajira": [
    "Riohacha",
    "Maicao",
    "Uribia",
    "Manaure",
    "San Juan del Cesar",
    "Villanueva",
    "El Molino",
    "Fonseca",
    "Barrancas",
    "Distracción",
    "Hatonuevo",
    "La Jagua del Pilar",
    "Urumita",
    "Albania",
    "Dibulla",
  ],
  Magdalena: [
    "Santa Marta",
    "Ciénaga",
    "Fundación",
    "Aracataca",
    "El Banco",
    "Plato",
    "Zona Bananera",
    "Algarrobo",
    "Ariguaní",
    "Cerro San Antonio",
    "Chivolo",
    "Concordia",
    "El Piñón",
    "El Retén",
    "Guamal",
    "Nueva Granada",
    "Pedraza",
    "Pijiño del Carmen",
    "Pivijay",
    "Puebloviejo",
    "Remolino",
    "Sabanas de San Ángel",
    "Salamina",
    "San Sebastián de Buenavista",
    "San Zenón",
    "Santa Ana",
    "Santa Bárbara de Pinto",
    "Sitionuevo",
    "Tenerife",
    "Zapayán",
  ],
  Meta: [
    "Villavicencio",
    "Acacías",
    "Granada",
    "San Martín",
    "Puerto López",
    "Cumaral",
    "Restrepo",
    "El Calvario",
    "Guamal",
    "Castilla la Nueva",
    "San Carlos de Guaroa",
    "Barranca de Upía",
    "Cabuyaro",
    "Fuente de Oro",
    "Puerto Gaitán",
    "Puerto Lleras",
    "Puerto Rico",
    "La Macarena",
    "Uribe",
    "Lejanías",
    "Mesetas",
    "Vista Hermosa",
    "La Uribe",
    "El Castillo",
    "El Dorado",
    "Cubarral",
    "San Juan de Arama",
  ],
  Nariño: [
    "Pasto",
    "Tumaco",
    "Ipiales",
    "Túquerres",
    "Samaniego",
    "La Unión",
    "Sandoná",
    "Consacá",
    "Yacuanquer",
    "Tangua",
    "Funes",
    "Guachucal",
    "Cumbal",
    "Aldana",
    "Carlosama",
    "Contadero",
    "Córdoba",
    "Cuaspud",
    "Gualmatán",
    "Iles",
    "Imués",
    "Ospina",
    "Potosí",
    "Puerres",
    "Pupiales",
    "Ricaurte",
    "Ancuyá",
    "Arboleda",
    "Barbacoas",
    "Belén",
    "Buesaco",
    "Chachagüí",
    "Colón",
    "Cumbitara",
    "El Charco",
    "El Peñol",
    "El Rosario",
    "El Tablón de Gómez",
    "Francisco Pizarro",
    "Leiva",
    "Linares",
    "Los Andes",
    "Magüí",
    "Mallama",
    "Mosquera",
    "Nariño",
    "Olaya Herrera",
    "Policarpa",
    "Providencia",
    "Roberto Payán",
    "Santa Bárbara",
    "Santacruz",
    "Sapuyes",
    "Taminango",
    "La Florida",
    "La Llanada",
    "La Tola",
    "La Cruz",
  ],
  "Norte de Santander": [
    "Cúcuta",
    "Ocaña",
    "Pamplona",
    "Villa del Rosario",
    "Los Patios",
    "El Zulia",
    "San Cayetano",
    "Puerto Santander",
    "Villa Caro",
    "Tibú",
    "Sardinata",
    "El Tarra",
    "Convención",
    "Teorama",
    "Hacarí",
    "La Esperanza",
    "La Playa",
    "Abrego",
    "Arboledas",
    "Bochalema",
    "Bucarasica",
    "Cácota",
    "Cáchira",
    "Chinácota",
    "Chitagá",
    "Cuchilla",
    "Durania",
    "Gramalote",
    "Herrán",
    "Labateca",
    "Lourdes",
    "Mutiscua",
    "Pamplonita",
    "Ragonvalia",
    "Salazar",
    "San Calixto",
    "Santiago",
    "Santo Domingo",
    "Silos",
    "Toledo",
    "Villacaro",
  ],
  Putumayo: [
    "Mocoa",
    "Puerto Asís",
    "Orito",
    "Valle del Guamuez",
    "San Miguel",
    "Villagarzón",
    "Puerto Caicedo",
    "Puerto Guzmán",
    "Leguízamo",
    "Sibundoy",
    "Santiago",
    "Colón",
    "San Francisco",
  ],
  Quindío: [
    "Armenia",
    "Calarcá",
    "La Tebaida",
    "Montenegro",
    "Quimbaya",
    "Circasia",
    "Filandia",
    "Salento",
    "Córdoba",
    "Pijao",
    "Buenavista",
    "Génova",
  ],
  Risaralda: [
    "Pereira",
    "Dosquebradas",
    "Santa Rosa de Cabal",
    "La Virginia",
    "Cartago",
    "Chinchiná",
    "Marsella",
    "Belén de Umbría",
    "Apía",
    "Balboa",
    "Guática",
    "La Celia",
    "Mistrató",
    "Pueblo Rico",
    "Quinchía",
    "Santuario",
  ],
  "San Andrés y Providencia": ["San Andrés", "Providencia"],
  Santander: [
    "Bucaramanga",
    "Floridablanca",
    "Girón",
    "Piedecuesta",
    "Barrancabermeja",
    "Barbosa",
    "Socorro",
    "San Gil",
    "Málaga",
    "Vélez",
    "Sabana de Torres",
    "Puerto Wilches",
    "Simacota",
    "Aguada",
    "Albania",
    "Aratoca",
    "Barbosa",
    "Bolívar",
    "Burgos",
    "Cabrera",
    "California",
    "Capitanejo",
    "Carcasí",
    "Cepitá",
    "Cerrito",
    "Charalá",
    "Charta",
    "Chima",
    "Chipatá",
    "Cimitarra",
    "Concepción",
    "Confines",
    "Contratación",
    "Coromoro",
    "Curití",
    "El Carmen de Chucurí",
    "El Guacamayo",
    "El Peñón",
    "El Playón",
    "Encino",
    "Enciso",
    "Florián",
    "Galán",
    "Gámbita",
    "Guaca",
    "Guadalupe",
    "Guapotá",
    "Guavatá",
    "Güepsa",
    "Hato",
    "Jesús María",
    "Jordán",
    "La Belleza",
    "La Paz",
    "Landázuri",
    "Lebríja",
    "Los Santos",
    "Macaravita",
    "Matanza",
    "Mogotes",
    "Molagavita",
    "Ocamonte",
    "Oiba",
    "Onzaga",
    "Palmar",
    "Palmas del Socorro",
    "Páramo",
    "Pinchote",
    "Puente Nacional",
    "Puerto Parra",
    "Rionegro",
    "Suaita",
    "Sucre",
    "Suratá",
    "Tona",
    "Valle de San José",
    "Villanueva",
    "Zapatoca",
  ],
  Sucre: [
    "Sincelejo",
    "Corozal",
    "Sampués",
    "Tolú",
    "San Onofre",
    "Coveñas",
    "Morroa",
    "Los Palmitos",
    "Ovejas",
    "Chalán",
    "Coloso",
    "Galeras",
    "Guaranda",
    "La Unión",
    "Majagual",
    "Palmito",
    "San Benito Abad",
    "San Juan de Betulia",
    "San Marcos",
    "San Pedro",
    "Santiago de Tolú",
    "Sucre",
    "Buenavista",
    "Caimito",
    "San Luis de Sincé",
  ],
  Tolima: [
    "Ibagué",
    "Espinal",
    "Melgar",
    "Girardot",
    "Honda",
    "Líbano",
    "Mariquita",
    "Chaparral",
    "Purificación",
    "Guamo",
    "Saldaña",
    "Flandes",
    "Ambalema",
    "Armero",
    "Ataco",
    "Cajamarca",
    "Carmen de Apicalá",
    "Casabianca",
    "Coello",
    "Coyaima",
    "Cunday",
    "Dolores",
    "Falan",
    "Fresno",
    "Herveo",
    "Icononzo",
    "Lérida",
    "Natagaima",
    "Ortega",
    "Palocabildo",
    "Piedras",
    "Planadas",
    "Prado",
    "Roncesvalles",
    "Rovira",
    "San Antonio",
    "San Luis",
    "Santa Isabel",
    "Suárez",
    "Valle de San Juan",
    "Venadillo",
    "Villahermosa",
    "Villarrica",
  ],
  "Valle del Cauca": [
    "Cali",
    "Palmira",
    "Buenaventura",
    "Tuluá",
    "Cartago",
    "Buga",
    "Yumbo",
    "Jamundí",
    "Candelaria",
    "Florida",
    "Pradera",
    "Ginebra",
    "Guacarí",
    "El Cerrito",
    "Restrepo",
    "La Cumbre",
    "Vijes",
    "Yotoco",
    "Alcalá",
    "Andalucía",
    "Ansermanuevo",
    "Argelia",
    "Bolívar",
    "Caicedonia",
    "Calima",
    "Dagua",
    "El Águila",
    "El Cairo",
    "El Dovio",
    "La Unión",
    "La Victoria",
    "Obando",
    "Riofrío",
    "Roldanillo",
    "San Pedro",
    "Sevilla",
    "Toro",
    "Trujillo",
    "Ulloa",
    "Versalles",
    "Zarzal",
  ],
  Vaupés: ["Mitú", "Carurú", "Pacoa", "Taraira", "Papunaua", "Yavaraté"],
  Vichada: ["Puerto Carreño", "La Primavera", "Santa Rosalía", "Cumaribo"],
};

const signUpSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(3, "El nombre debe tener al menos 3 caracteres"),

    celular: z.string({
      required_error: "El celular es requerido",
    }),
    email: z
      .string({
        required_error: "El correo es requerido",
      })
      .email("El correo no es valido"),
    password: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres"),
    confirmPassword: z.string({
      required_error: "La confirmacion de la contraseña es requerida",
    }),
    address: z.string({
      required_error: "La dirección es requerida",
    }),
    state: z.string({
      required_error: "El departamento es requerido",
    }),
    city: z.string({
      required_error: "La ciudad es requerida",
    }),
    zipCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const SignUp = () => {
  const initialValues = {
    name: "",
    celular: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
  };
  const navigate = useNavigate();

  const onRegister = async (payload) => {
    try {
      delete payload.confirmPassword;
      const response = await signUp({
        ...payload,
        tipoUsuario: "Cliente",
      });

      const { data } = response;

      if (data) {
        Swal.fire({
          title: "Registro exitoso",
          text: "Usuario registrado correctamente",
          icon: "success",
          confirmButtonText: "Iniciar Sesion",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { replace: true });
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Tu Usuario no ha sido Creado",
        text: "Porfavor intenta de nuevo",
      });
    }
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    await onRegister(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <LoginContainerStyled2>
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <Zenitho />
      </div> */}

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(signUpSchema)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <LoginFormStyled
            onSubmit={handleSubmit}
            style={{ paddingBottom: "2rem" }}
          >
            <div className="d-flex justify-center">
              <Image
                src="https://res.cloudinary.com/dppqkypts/image/upload/v1709156443/AMV_LOGO_1_nx3ofa.png"
                width={70}
              />
            </div>

            <div className="mb-3 text-center px-2">
              <p className="text-white" style={{ fontSize: "0.85rem" }}>
                <i className="bi bi-info-circle-fill me-2"></i>
                Este registro es para <strong>Clientes</strong>. Si deseas
                registrarte como <strong>Tienda Aliada</strong> o{" "}
                <strong>Reventa</strong>, por favor comunícate directamente con
                nuestras líneas de atención AMV.
              </p>
            </div>

            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? "is-invalid" : ""}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su numero de celular  o whatsapp"
                name="celular"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.celular}
                className={
                  touched.celular && errors.celular ? "is-invalid" : ""
                }
              />
              <ErrorMessage
                name="celular"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmailSignUp">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? "is-invalid" : ""}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
              <Form.Text className="text-white">
                Nunca compartiremos tu correo con nadie mas.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPasswordSignUp">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Tu contraseña (8-20 caracteres)"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  touched.password && errors.password ? "is-invalid" : ""
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su dirección"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                className={
                  touched.address && errors.address ? "is-invalid" : ""
                }
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group controlId="formBasicState">
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="Escriba el departamento..."
                list="departamentos-list"
                onChange={(e) => {
                  handleChange(e);
                  // Limpiar la ciudad cuando cambie el departamento si es una opción de la lista
                  if (
                    Object.keys(departamentosYCiudades).includes(e.target.value)
                  ) {
                    handleChange({
                      target: {
                        name: "city",
                        value: "",
                      },
                    });
                  }
                }}
                onBlur={handleBlur}
                value={values.state}
                className={touched.state && errors.state ? "is-invalid" : ""}
              />
              <datalist id="departamentos-list">
                {Object.keys(departamentosYCiudades).map((departamento) => (
                  <option key={departamento} value={departamento} />
                ))}
              </datalist>
              <ErrorMessage
                name="state"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder={
                  values.state && departamentosYCiudades[values.state]
                    ? "Escriba la ciudad..."
                    : "Escriba la ciudad (primero seleccione un departamento para sugerencias)"
                }
                list="ciudades-list"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                className={touched.city && errors.city ? "is-invalid" : ""}
              />
              <datalist id="ciudades-list">
                {values.state &&
                  departamentosYCiudades[values.state]?.map((ciudad) => (
                    <option key={ciudad} value={ciudad} />
                  ))}
              </datalist>
              <ErrorMessage
                name="city"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group controlId="formBasicZipCode">
              <Form.Label>Código Postal (Opcional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su código postal"
                name="zipCode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.zipCode}
                className={
                  touched.zipCode && errors.zipCode ? "is-invalid" : ""
                }
              />
              <ErrorMessage
                name="zipCode"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <div className="d-flex justify-center pt-1">
              <ButtonStyled
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Registrarse"
                ) : (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span className="ms-2">Cargando...</span>
                  </>
                )}
              </ButtonStyled>
            </div>
            <div>
              <p className="text-center pt-4 text-white">¿Ya tienes cuenta?</p>
              <div className="d-flex justify-center">
                <NavLinkStyled to={"/login"}>
                  <p className="text-center">Inicia sesion</p>
                </NavLinkStyled>
              </div>
            </div>
          </LoginFormStyled>
        )}
      </Formik>
    </LoginContainerStyled2>
  );
};
