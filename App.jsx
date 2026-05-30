import { useState, useRef } from "react";

// ─── TOKENS ──────────────────────────────────────────────────
const T = {
  lime:"#A8D429", limeD:"#7AAB00", limeL:"#F2FAD8",
  green:"#1E3A00", black:"#0A0A0A", dark:"#1C1C1E",
  gray1:"#2C2C2E", gray2:"#48484A", gray3:"#8E8E93",
  gray4:"#C7C7CC", gray5:"#F2F2F7", white:"#FFFFFF",
  red:"#FF3B30", blue:"#007AFF", yellow:"#FF9500",
  border:"#DBDBDB", purple:"#8B5CF6", pink:"#EC4899",
};

// ─── ALL CATEGORIES ──────────────────────────────────────────
const CATS = [
  {id:"gastro",  icon:"🍽️", label:"Gastronomía",    color:"#F59E0B"},
  {id:"limpieza",icon:"🧹", label:"Limpieza",        color:"#0EA5E9"},
  {id:"jardin",  icon:"🌿", label:"Jardín",          color:"#22C55E"},
  {id:"cuidado", icon:"👶", label:"Cuidado",         color:"#EC4899"},
  {id:"mascotas",icon:"🐾", label:"Mascotas",        color:"#8B5CF6"},
  {id:"belleza", icon:"✂️", label:"Belleza",         color:"#F43F5E"},
  {id:"autos",   icon:"🚗", label:"Autos",           color:"#3B82F6"},
  {id:"edicion", icon:"🎬", label:"Edición",         color:"#06B6D4"},
  {id:"eventos", icon:"🎉", label:"Eventos",         color:"#F97316"},
  {id:"prof",    icon:"📚", label:"Profesional",     color:"#6366F1"},
  {id:"trans",   icon:"🚘", label:"Transporte",      color:"#14B8A6"},
  {id:"hogar",   icon:"🔧", label:"Mantención",      color:"#78716C"},
];

// ─── WORKERS ─────────────────────────────────────────────────
const WORKERS = [
  {id:1,name:"Carlos Méndez",handle:"@carlosjardinero",service:"Jardinero",cat:"jardin",mode:"presencial",lat:-33.4891,lng:-70.6991,mobilFee:3500,mobilKm:5,
   avatar:"https://i.pravatar.cc/150?img=11",cover:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
   bio:"Jardinero profesional con 8 años de experiencia 🌿",verified:true,rating:4.9,reviews:134,jobs:134,followers:892,price:12000,pType:"trabajo",pH:4000,pD:25000,pT:12000,color:"#22C55E",since:"2022",
   highlights:[{id:"h1",name:"Jardines",icon:"🌿",color:"#22C55E"},{id:"h2",name:"Antes/Después",icon:"✨",color:"#F59E0B"},{id:"h3",name:"Clientes",icon:"⭐",color:"#EC4899"}],
   posts:[{id:"p1",type:"image",src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",likes:47},{id:"p2",type:"image",src:"https://images.unsplash.com/photo-1585320806297-9794b3e4edd0?w=300&q=80",likes:34},{id:"p3",type:"video",src:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80",likes:89},{id:"p4",type:"image",src:"https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300&q=80",likes:121},{id:"p5",type:"image",src:"https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=300&q=80",likes:78},{id:"p6",type:"video",src:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80",likes:56}]},
  {id:2,name:"Ana Martínez",handle:"@anapeloquera",service:"Peluquera a domicilio",cat:"belleza",mode:"presencial",lat:-33.4150,lng:-70.5999,mobilFee:5000,mobilKm:3,
   avatar:"https://i.pravatar.cc/150?img=47",cover:"https://images.unsplash.com/photo-1560066984-138daaa7d285?w=400&q=80",
   bio:"✂️ Peluquera profesional a domicilio. Cortes, tintes y tratamientos.",verified:true,rating:4.9,reviews:312,jobs:312,followers:3400,price:15000,pType:"trabajo",pH:null,pD:null,pT:15000,color:"#BE185D",since:"2021",
   highlights:[{id:"h1",name:"Cortes",icon:"✂️",color:"#BE185D"},{id:"h2",name:"Tintes",icon:"🎨",color:"#7C3AED"},{id:"h3",name:"Novia",icon:"👰",color:"#F59E0B"}],
   posts:[{id:"p1",type:"image",src:"https://images.unsplash.com/photo-1560066984-138daaa7d285?w=300&q=80",likes:567},{id:"p2",type:"image",src:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80",likes:423},{id:"p3",type:"video",src:"https://images.unsplash.com/photo-1560066984-138daaa7d285?w=300&q=80",likes:234},{id:"p4",type:"image",src:"https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&q=80",likes:389},{id:"p5",type:"image",src:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80",likes:178},{id:"p6",type:"video",src:"https://images.unsplash.com/photo-1560066984-138daaa7d285?w=300&q=80",likes:312}]},
  {id:3,name:"Diego Saavedra",handle:"@diegoedit",service:"Editor de Video",cat:"edicion",mode:"remoto",lat:null,lng:null,mobilFee:0,mobilKm:0,
   avatar:"https://i.pravatar.cc/150?img=60",cover:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80",
   bio:"🎬 Edito videos para YouTube y RRSS. Trabajo 100% remoto. Entrega en 24h.",verified:true,rating:4.8,reviews:201,jobs:201,followers:1240,price:25000,pType:"trabajo",pH:null,pD:150000,pT:25000,color:"#06B6D4",since:"2022",
   highlights:[{id:"h1",name:"YouTube",icon:"▶️",color:"#EF4444"},{id:"h2",name:"RRSS",icon:"📱",color:"#8B5CF6"},{id:"h3",name:"Reels",icon:"🎞️",color:"#F59E0B"}],
   posts:[{id:"p1",type:"video",src:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80",likes:156},{id:"p2",type:"image",src:"https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=300&q=80",likes:89},{id:"p3",type:"video",src:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80",likes:234},{id:"p4",type:"image",src:"https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=300&q=80",likes:67}]},
  {id:4,name:"Valentina Cruz",handle:"@valeevents",service:"Iluminación para eventos",cat:"eventos",mode:"presencial",lat:-33.4389,lng:-70.6503,mobilFee:8000,mobilKm:8,
   avatar:"https://i.pravatar.cc/150?img=44",cover:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
   bio:"💡 Iluminación profesional para eventos, cumpleaños y matrimonios. Hago magia con la luz ✨",verified:true,rating:5.0,reviews:89,jobs:89,followers:2100,price:80000,pType:"trabajo",pH:null,pD:null,pT:80000,color:"#F97316",since:"2022",
   highlights:[{id:"h1",name:"Bodas",icon:"💒",color:"#F97316"},{id:"h2",name:"Fiestas",icon:"🎉",color:"#EC4899"},{id:"h3",name:"Montaje",icon:"💡",color:"#F59E0B"}],
   posts:[{id:"p1",type:"image",src:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&q=80",likes:445},{id:"p2",type:"image",src:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80",likes:312},{id:"p3",type:"video",src:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&q=80",likes:567},{id:"p4",type:"image",src:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80",likes:234}]},
  {id:5,name:"Roberto Fuentes",handle:"@robermanejo",service:"Clases de manejo",cat:"trans",mode:"presencial",lat:-33.5200,lng:-70.7000,mobilFee:0,mobilKm:0,
   avatar:"https://i.pravatar.cc/150?img=55",cover:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
   bio:"🚘 Instructor de manejo particular. Aprende a tu ritmo, sin presiones. Auto propio.",verified:true,rating:4.7,reviews:145,jobs:145,followers:678,price:20000,pType:"hora",pH:20000,pD:null,pT:null,color:"#14B8A6",since:"2021",
   highlights:[{id:"h1",name:"Principiantes",icon:"🟢",color:"#22C55E"},{id:"h2",name:"Ruta",icon:"🗺️",color:"#3B82F6"},{id:"h3",name:"Resultados",icon:"🏆",color:"#F59E0B"}],
   posts:[{id:"p1",type:"image",src:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&q=80",likes:134},{id:"p2",type:"image",src:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80",likes:89},{id:"p3",type:"video",src:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&q=80",likes:201}]},
  {id:6,name:"Sofía Reyes",handle:"@sofiacosturas",service:"Costuras y arreglos",cat:"hogar",mode:"presencial",lat:-33.4700,lng:-70.6200,mobilFee:2000,mobilKm:3,
   avatar:"https://i.pravatar.cc/150?img=41",cover:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
   bio:"🧵 Arreglos, costuras y confección a medida. Por prenda o por hora.",verified:false,rating:4.6,reviews:67,jobs:67,followers:445,price:5000,pType:"trabajo",pH:8000,pD:null,pT:5000,color:"#8B5CF6",since:"2023",
   highlights:[{id:"h1",name:"Arreglos",icon:"🧵",color:"#8B5CF6"},{id:"h2",name:"Confección",icon:"👗",color:"#EC4899"}],
   posts:[{id:"p1",type:"image",src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",likes:45},{id:"p2",type:"image",src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",likes:67}]},
  {id:7,name:"Matías Vera",handle:"@matiflyers",service:"Repartidor de flyers",cat:"trans",mode:"presencial",lat:-33.4560,lng:-70.6450,mobilFee:0,mobilKm:0,
   avatar:"https://i.pravatar.cc/150?img=59",cover:"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
   bio:"📄 Reparto flyers y material publicitario en toda la RM. Rápido y confiable.",verified:false,rating:4.5,reviews:34,jobs:34,followers:123,price:15000,pType:"dia",pH:2500,pD:15000,pT:null,color:"#6366F1",since:"2023",
   highlights:[{id:"h1",name:"Zonas",icon:"📍",color:"#6366F1"},{id:"h2",name:"Resultados",icon:"📊",color:"#22C55E"}],
   posts:[{id:"p1",type:"image",src:"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&q=80",likes:23},{id:"p2",type:"image",src:"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&q=80",likes:34}]},
];

// ─── JOB OFFERS (for worker view) ────────────────────────────
const JOB_OFFERS = [
  {id:"j1",employer:"María González",avatar:"https://i.pravatar.cc/150?img=5",business:"Restaurante El Mirador",cat:"gastro",title:"Garzón para evento corporativo",desc:"Necesito 2 garzones para cena corporativa el viernes 30 de mayo. Experiencia requerida.",pay:"$60.000",mode:"presencial",time:"Viernes 30 Mayo · 18:00-23:00",location:"Las Condes",urgent:true,applicants:5},
  {id:"j2",employer:"Pedro Soto",avatar:"https://i.pravatar.cc/150?img=12",business:"Empresa Personal",cat:"limpieza",title:"Aseo profundo departamento",desc:"Departamento de 3 ambientes, aseo completo incluye cocina, baños y ventanas.",pay:"$45.000",mode:"presencial",time:"Sábado 25 Mayo · 09:00-14:00",location:"Providencia",urgent:false,applicants:12},
  {id:"j3",employer:"Startup Chile",avatar:"https://i.pravatar.cc/150?img=8",business:"StartupCL",cat:"edicion",title:"Editor de reels para Instagram",desc:"Necesitamos editor de video para crear contenido mensual. Trabajo remoto.",pay:"$150.000/mes",mode:"remoto",time:"Inicio inmediato · Mensual",location:"Remoto",urgent:false,applicants:28},
  {id:"j4",employer:"Ana Torres",avatar:"https://i.pravatar.cc/150?img=9",business:"Evento Privado",cat:"eventos",title:"Iluminación para cumpleaños",desc:"Buscamos especialista en iluminación para cumpleaños de 15 en salón de eventos.",pay:"$120.000",mode:"presencial",time:"Sábado 1 Junio · Todo el día",location:"La Florida",urgent:true,applicants:3},
  {id:"j5",employer:"Juan Pérez",avatar:"https://i.pravatar.cc/150?img=15",business:"Familia Pérez",cat:"cuidado",title:"Cuidador adulto mayor nocturno",desc:"Turno nocturno Lunes-Viernes para adulto mayor. Experiencia en salud necesaria.",pay:"$700.000/mes",mode:"presencial",time:"Lun-Vie · 21:00-07:00",location:"Ñuñoa",urgent:false,applicants:7},
];

const FEED_IMGS = [
  "https://images.unsplash.com/photo-1560066984-138daaa7d285?w=400&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80",
];

function fmt(n){ return "$"+(n||0).toLocaleString("es-CL"); }

// ─── GEO HELPERS ─────────────────────────────────────────────
const USER_LAT = -33.4350;  // Providencia, Santiago (simulated)
const USER_LNG = -70.6093;

function calcDist(lat, lng) {
  if (!lat || !lng) return null;
  const R = 6371;
  const dLat = (lat - USER_LAT) * Math.PI / 180;
  const dLng = (lng - USER_LNG) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(USER_LAT*Math.PI/180)*Math.cos(lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return +(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1);
}

function distLabel(km) {
  if (km === null) return "Remoto";
  if (km < 1) return "< 1 km";
  return `${km} km`;
}

// Enrich workers with distance
WORKERS.forEach(w => {
  w.distKm = calcDist(w.lat, w.lng);
  w.distLabel = distLabel(w.distKm);
});

// Sort workers by distance
WORKERS.sort((a,b) => {
  if (a.distKm === null) return 1;
  if (b.distKm === null) return -1;
  return a.distKm - b.distKm;
});

function Img({ src, style={}, fallback="#eee" }) {
  const [err, setErr] = useState(false);
  if (err) return <div style={{ background: fallback, ...style }}/>;
  return <img src={src} alt="" style={{ objectFit:"cover", ...style }} onError={()=>setErr(true)}/>;
}

function Avatar({ src, size=40, color="#ccc" }) {
  return (
    <div style={{ width:size, height:size, borderRadius:size/2, overflow:"hidden", background:color, flexShrink:0 }}>
      <Img src={src} style={{ width:"100%", height:"100%" }}/>
    </div>
  );
}

function RingAvatar({ src, size=64, color="#ccc" }) {
  return (
    <div style={{ width:size+6, height:size+6, borderRadius:(size+6)/2, background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", padding:3, flexShrink:0 }}>
      <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:T.white, padding:2 }}>
        <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:color }}>
          <Img src={src} style={{ width:"100%", height:"100%"}} />
        </div>
      </div>
    </div>
  );
}

function ModeBadge({ mode }) {
  return (
    <span style={{ background: mode==="remoto"?"#EFF6FF":"#F0FDF4", color: mode==="remoto"?T.blue:"#16A34A", fontSize:10, fontWeight:700, borderRadius:20, padding:"2px 8px", border:`1px solid ${mode==="remoto"?"#BFDBFE":"#BBF7D0"}` }}>
      {mode==="remoto"?"💻 Remoto":"📍 Presencial"}
    </span>
  );
}

// ─── PHONE ───────────────────────────────────────────────────
function Phone({ children }) {
  return (
    <div style={{ width:390, height:844, background:T.white, borderRadius:54, overflow:"hidden", position:"relative", boxShadow:"0 40px 100px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)", border:"8px solid #1C1C1E", fontFamily:"'Inter',-apple-system,sans-serif" }}>
      <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)", width:120, height:34, background:T.dark, borderRadius:20, zIndex:100 }}/>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:50, display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"0 28px 8px", zIndex:50, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(10px)" }}>
        <span style={{ fontSize:15, fontWeight:700, color:T.black }}>9:41</span>
        <div style={{ display:"flex", gap:6, alignItems:"center", color:T.black, fontSize:12 }}>●●● WiFi 🔋</div>
      </div>
      {children}
    </div>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────
function BottomNav({ active, go, role }) {
  const employerTabs = [{id:"feed",icon:"🏠",label:"Inicio"},{id:"search",icon:"🔍",label:"Buscar"},{id:"post",icon:"＋",label:"Publicar"},{id:"agenda",icon:"📅",label:"Agenda"},{id:"profile",icon:"◉",label:"Perfil"}];
  const workerTabs   = [{id:"feed",icon:"🏠",label:"Inicio"},{id:"jobs",icon:"💼",label:"Ofertas"},{id:"post",icon:"＋",label:"Publicar"},{id:"agenda",icon:"📅",label:"Agenda"},{id:"profile",icon:"◉",label:"Perfil"}];
  const tabs = role==="worker" ? workerTabs : employerTabs;
  return (
    <div style={{ position:"absolute", bottom:0, left:0, right:0, height:78, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(20px)", borderTop:`0.5px solid ${T.border}`, display:"flex", alignItems:"flex-start", justifyContent:"space-around", paddingTop:10, zIndex:50 }}>
      {tabs.map(t => (
        <div key={t.id} onClick={()=>go(t.id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", padding:"4px 8px" }}>
          <div style={{ width:42, height:42, borderRadius:t.id==="post"?21:12, background:t.id==="post"?T.lime:active===t.id?T.limeL:"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:t.id==="post"?22:20, fontWeight:t.id==="post"?800:"normal" }}>
            {t.id==="profile"
              ? <div style={{ width:26, height:26, borderRadius:13, background:T.lime, border:active===t.id?`2px solid ${T.black}`:`1.5px solid ${T.gray4}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:T.green }}>S</div>
              : <span style={{ opacity: active===t.id||t.id==="post"?1:0.45 }}>{t.icon}</span>
            }
          </div>
          <span style={{ fontSize:9, fontWeight:700, color:active===t.id?T.limeD:T.gray3, letterSpacing:0.2 }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── WHY CHAMBA DATA ─────────────────────────────────────────
const WHY_EMPLOYER = [
  { icon:"⏱️", title:"Ahorra tiempo real", desc:"Lo que tú harías en 4 horas, un experto lo hace en 1. Recupera tu fin de semana." },
  { icon:"🛡️", title:"100% verificados", desc:"Carnet de identidad, verificación facial y certificado de antecedentes. Sabes con quién tratas." },
  { icon:"🔒", title:"Paga solo al terminar", desc:"Tu dinero queda retenido. Se libera solo cuando confirmas que el trabajo quedó bien." },
  { icon:"⚡", title:"Para hoy o cuando quieras", desc:"¿Urgente? En menos de 2 horas. ¿Con tiempo? Programa para cuando más te acomode." },
  { icon:"💻", title:"Presencial y remoto", desc:"Desde jardinero hasta editor de video. Todo en un solo lugar." },
  { icon:"📍", title:"Cerca de ti siempre", desc:"Trabajadores ordenados por distancia. Ves exactamente cuánto demoran en llegar." },
  { icon:"🌟", title:"Sin complicaciones", desc:"Sin cotizaciones interminables, sin llamadas, sin efectivo. Todo en la app." },
  { icon:"🔄", title:"Recurrente o una vez", desc:"¿Necesitas ayuda todos los viernes? Programa trabajos recurrentes con descuento." },
];

const WHY_WORKER = [
  { icon:"💰", title:"Ingresos extra reales", desc:"Gana entre $150.000 y $800.000 al mes extra. Tú decides cuánto y cuándo." },
  { icon:"🗓️", title:"Tú decides cuándo", desc:"Activas tu perfil cuando quieres trabajar, lo pausas cuando no. Sin compromisos." },
  { icon:"🔒", title:"Cobro garantizado", desc:"El dinero está asegurado antes de que empieces. No más clientes que no pagan." },
  { icon:"📍", title:"Cerca de tu casa", desc:"Define tu radio de trabajo. Trabaja en tu barrio sin perder tiempo viajando." },
  { icon:"🚗", title:"Movilización incluida", desc:"Si el cliente está lejos, cobras tarifa de movilización. No pones plata de tu bolsillo." },
  { icon:"🏆", title:"Crece con insignias", desc:"Más trabajos = más visibilidad = más clientes. El sistema te premia por ser bueno." },
  { icon:"📄", title:"Boleta automática", desc:"La app emite tu boleta de honorarios al SII automáticamente. Sin trámites." },
  { icon:"🌐", title:"Presencial o remoto", desc:"¿Editas video? ¿Das clases? Trabaja desde casa y llega a clientes en todo Chile." },
];

// ─── GEO PERMISSION SCREEN ───────────────────────────────────
function GeoPermissionScreen({ onAllow, onSkip }) {
  const [requesting, setRequesting] = useState(false);
  const [granted, setGranted] = useState(false);

  function handleAllow() {
    setRequesting(true);
    setTimeout(() => {
      setGranted(true);
      setTimeout(() => onAllow(), 1200);
    }, 1500);
  }

  return (
    <div style={{ position:"absolute", inset:0, top:50, background:T.white, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 28px" }}>
      {/* Map illustration */}
      <div style={{ width:220, height:220, borderRadius:110, background:"linear-gradient(135deg,#E8F5E9,#F0FDF4)", border:`3px solid ${T.lime}`, position:"relative", marginBottom:28, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {/* Fake map grid */}
        {[0,1,2,3,4].map(i=>(
          <div key={i} style={{ position:"absolute", top:i*44, left:0, right:0, height:1, background:"rgba(0,0,0,0.06)" }}/>
        ))}
        {[0,1,2,3,4].map(i=>(
          <div key={i} style={{ position:"absolute", left:i*44, top:0, bottom:0, width:1, background:"rgba(0,0,0,0.06)" }}/>
        ))}
        {/* Worker pins */}
        {[
          {x:90,y:80,c:"#22C55E",n:"CM"},{x:140,y:120,c:"#BE185D",n:"AM"},
          {x:60,y:140,c:"#06B6D4",n:"DS"},{x:160,y:70,c:"#F97316",n:"VC"},
        ].map((p,i)=>(
          <div key={i} style={{ position:"absolute", left:p.x, top:p.y, transform:"translate(-50%,-100%)" }}>
            <div style={{ width:32, height:32, borderRadius:16, background:p.c, border:"2.5px solid white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"white", boxShadow:"0 2px 8px rgba(0,0,0,0.2)" }}>{p.n}</div>
            <div style={{ width:8, height:8, borderRadius:4, background:p.c, margin:"1px auto 0", opacity:0.6 }}/>
          </div>
        ))}
        {/* User pin */}
        <div style={{ position:"absolute", left:110, top:110, transform:"translate(-50%,-50%)" }}>
          <div style={{ width:40, height:40, borderRadius:20, background:T.lime, border:"3px solid white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:T.green, boxShadow:"0 4px 16px rgba(0,0,0,0.25)" }}>Tú</div>
          <div style={{ position:"absolute", inset:-8, borderRadius:36, border:`2px solid ${T.lime}`, opacity:0.4, animation:"pulse 2s infinite" }}/>
          <div style={{ position:"absolute", inset:-16, borderRadius:44, border:`1.5px solid ${T.lime}`, opacity:0.2 }}/>
        </div>
      </div>

      {granted ? (
        <>
          <div style={{ width:56, height:56, borderRadius:28, background:T.lime, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:14 }}>✓</div>
          <h2 style={{ fontSize:22, fontWeight:800, margin:"0 0 8px", textAlign:"center" }}>¡Ubicación activada!</h2>
          <p style={{ color:T.gray3, textAlign:"center", fontSize:14, margin:0 }}>Mostrándote trabajadores cercanos...</p>
        </>
      ) : (
        <>
          <h2 style={{ fontSize:24, fontWeight:800, margin:"0 0 10px", textAlign:"center", letterSpacing:-0.5 }}>Trabajadores cerca de ti</h2>
          <p style={{ color:T.gray2, textAlign:"center", fontSize:15, margin:"0 0 8px", lineHeight:1.5 }}>Activa tu ubicación para ver quién está disponible ahora en tu sector.</p>
          <p style={{ color:T.gray3, textAlign:"center", fontSize:13, margin:"0 0 28px", lineHeight:1.5 }}>Solo usamos tu ubicación para mostrarte distancias y calcular tarifas de movilización.</p>

          <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:10 }}>
            <button onClick={handleAllow} disabled={requesting} style={{ width:"100%", background:requesting?T.gray4:T.lime, border:"none", borderRadius:14, padding:"16px", color:requesting?T.white:T.green, fontSize:16, fontWeight:800, cursor:requesting?"wait":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              {requesting?<><span style={{ fontSize:18 }}>⌛</span> Obteniendo ubicación...</>:<><span style={{ fontSize:18 }}>📍</span> Permitir ubicación</>}
            </button>
            <button onClick={onSkip} style={{ width:"100%", background:T.white, border:`1px solid ${T.border}`, borderRadius:14, padding:"14px", color:T.gray2, fontSize:14, cursor:"pointer" }}>Ahora no, ingresar sin ubicación</button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── MAP VIEW SCREEN ─────────────────────────────────────────
function MapViewScreen({ setS, setWorker, setMatched }) {
  const [selected, setSelected] = useState(null);

  const PIN_POSITIONS = [
    {w:WORKERS[0], x:100, y:110},{w:WORKERS[1], x:170, y:80},
    {w:WORKERS[2], x:60,  y:150},{w:WORKERS[3], x:200, y:140},
    {w:WORKERS[4], x:130, y:200},{w:WORKERS[5], x:80,  y:90},
  ];

  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, background:T.white, display:"flex", flexDirection:"column" }}>
      {/* Header */}
      <div style={{ background:T.white, borderBottom:`0.5px solid ${T.border}`, padding:"10px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", zIndex:10 }}>
        <div>
          <h2 style={{ fontSize:17, fontWeight:700, margin:0 }}>Mapa cercano</h2>
          <p style={{ color:T.gray3, fontSize:12, margin:"2px 0 0" }}>📍 Providencia · {WORKERS.filter(w=>w.distKm!==null&&w.distKm<=15).length} trabajadores en 15 km</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>setS("feed")} style={{ background:T.gray5, border:"none", borderRadius:20, padding:"6px 14px", fontSize:13, fontWeight:600, cursor:"pointer" }}>⊞ Lista</button>
          <div style={{ background:T.lime, borderRadius:20, padding:"6px 14px", fontSize:13, fontWeight:700, color:T.green }}>🗺️ Mapa</div>
        </div>
      </div>

      {/* Radius filter */}
      <div style={{ background:T.white, borderBottom:`0.5px solid ${T.border}`, padding:"8px 16px", display:"flex", gap:8, overflowX:"auto" }}>
        {[2,5,10,15,20].map(km=>(
          <div key={km} style={{ flexShrink:0, background:km===10?T.black:T.gray5, borderRadius:20, padding:"5px 14px", cursor:"pointer" }}>
            <span style={{ color:km===10?T.white:T.gray2, fontSize:12, fontWeight:600 }}>{km} km</span>
          </div>
        ))}
      </div>

      {/* Map area */}
      <div style={{ flex:1, position:"relative", background:"#E8F0DF", overflow:"hidden" }}>
        {/* Road lines */}
        <div style={{ position:"absolute", top:"45%", left:0, right:0, height:3, background:"rgba(255,255,255,0.7)" }}/>
        <div style={{ position:"absolute", top:0, bottom:0, left:"50%", width:3, background:"rgba(255,255,255,0.7)" }}/>
        <div style={{ position:"absolute", top:0, bottom:0, left:"30%", width:2, background:"rgba(255,255,255,0.5)" }}/>
        <div style={{ position:"absolute", top:"70%", left:0, right:0, height:2, background:"rgba(255,255,255,0.5)" }}/>

        {/* Range circle */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:220, height:220, borderRadius:110, border:`2px dashed ${T.lime}`, background:"rgba(168,212,41,0.06)" }}/>

        {/* Worker pins */}
        {PIN_POSITIONS.map(({w,x,y},i)=>(
          <div key={i} onClick={()=>setSelected(selected?.id===w.id?null:w)} style={{ position:"absolute", left:x, top:y, transform:"translate(-50%,-100%)", cursor:"pointer", zIndex:selected?.id===w.id?20:10 }}>
            <div style={{ background:w.color, borderRadius:20, padding:"5px 10px", border:`2.5px solid ${T.white}`, display:"flex", alignItems:"center", gap:5, boxShadow:"0 3px 10px rgba(0,0,0,0.2)", transform:selected?.id===w.id?"scale(1.15)":"scale(1)", transition:"transform 0.15s" }}>
              <div style={{ width:22, height:22, borderRadius:11, overflow:"hidden", background:w.color }}>
                <Img src={w.avatar} style={{ width:"100%", height:"100%" }}/>
              </div>
              <span style={{ color:T.white, fontWeight:700, fontSize:11 }}>{fmt(w.price)}</span>
            </div>
            <div style={{ width:8, height:8, borderRadius:4, background:w.color, margin:"1px auto 0", boxShadow:"0 1px 4px rgba(0,0,0,0.3)" }}/>
          </div>
        ))}

        {/* User pin */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
          <div style={{ width:44, height:44, borderRadius:22, background:T.lime, border:"3px solid white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:"0 4px 16px rgba(0,0,0,0.25)" }}>📍</div>
          <div style={{ position:"absolute", inset:-8, borderRadius:38, border:`2px solid ${T.lime}`, opacity:0.4 }}/>
        </div>

        {/* Selected worker card */}
        {selected&&(
          <div style={{ position:"absolute", bottom:12, left:12, right:12, background:T.white, borderRadius:16, padding:"14px", boxShadow:"0 8px 32px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:50, height:50, borderRadius:25, overflow:"hidden", background:selected.color }}>
                <Img src={selected.avatar} style={{ width:"100%", height:"100%" }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontWeight:700, fontSize:15 }}>{selected.name}</span>
                  {selected.verified&&<span style={{ fontSize:12 }}>✅</span>}
                </div>
                <span style={{ color:T.gray3, fontSize:13 }}>{selected.service}</span>
              </div>
              <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:T.gray3 }}>✕</button>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:12 }}>
              <span style={{ background:T.limeL, color:T.limeD, fontSize:12, fontWeight:700, borderRadius:20, padding:"4px 10px" }}>📍 {selected.distLabel}</span>
              <span style={{ background:T.limeL, color:T.limeD, fontSize:12, fontWeight:700, borderRadius:20, padding:"4px 10px" }}>⭐ {selected.rating}</span>
              {selected.mobilFee>0&&<span style={{ background:"#FEF3C7", color:"#92400E", fontSize:12, fontWeight:700, borderRadius:20, padding:"4px 10px" }}>🚗 +{fmt(selected.mobilFee)}</span>}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>{setWorker(selected);setS("worker");}} style={{ flex:1, background:T.gray5, border:`1px solid ${T.border}`, borderRadius:12, padding:"11px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Ver perfil</button>
              <button onClick={()=>{setMatched(selected);setS("match");}} style={{ flex:2, background:T.lime, border:"none", borderRadius:12, padding:"11px", fontSize:14, fontWeight:700, color:T.green, cursor:"pointer" }}>Contratar · {fmt(selected.price)}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── WHY CHAMBA SCREEN ───────────────────────────────────────
function WhyChambaScreen({ onContinue, role }) {
  const [idx, setIdx] = useState(0);
  const reasons = role==="worker" ? WHY_WORKER : WHY_EMPLOYER;
  const current = reasons[idx];

  return (
    <div style={{ position:"absolute", inset:0, top:50, background:T.white, display:"flex", flexDirection:"column" }}>
      {/* Progress dots */}
      <div style={{ display:"flex", justifyContent:"center", gap:6, padding:"16px 0 0" }}>
        {reasons.map((_,i)=>(
          <div key={i} style={{ width:i===idx?24:6, height:6, borderRadius:3, background:i===idx?T.black:T.gray4, transition:"all 0.3s" }}/>
        ))}
      </div>

      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 32px" }}>
        {/* Big icon */}
        <div style={{ width:120, height:120, borderRadius:60, background:idx%2===0?T.limeL:T.gray5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:54, marginBottom:28, boxShadow:`0 8px 32px rgba(0,0,0,0.1)` }}>
          {current.icon}
        </div>

        <h2 style={{ fontSize:26, fontWeight:900, textAlign:"center", margin:"0 0 14px", letterSpacing:-0.5, color:T.black, lineHeight:1.2 }}>{current.title}</h2>
        <p style={{ color:T.gray2, textAlign:"center", fontSize:16, lineHeight:1.6, margin:"0 0 32px" }}>{current.desc}</p>

        {/* Tap to continue */}
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          {idx>0&&<button onClick={()=>setIdx(i=>i-1)} style={{ width:44, height:44, borderRadius:22, background:T.gray5, border:"none", fontSize:18, cursor:"pointer" }}>←</button>}
          <button onClick={()=>{ if(idx<reasons.length-1) setIdx(i=>i+1); else onContinue(); }} style={{ background:T.black, border:"none", borderRadius:25, padding:"14px 32px", color:T.white, fontSize:16, fontWeight:700, cursor:"pointer" }}>
            {idx<reasons.length-1 ? "Siguiente →" : "¡Empezar ya! 🚀"}
          </button>
        </div>
      </div>

      {/* Skip */}
      <div style={{ padding:"0 0 24px", textAlign:"center" }}>
        <span onClick={onContinue} style={{ color:T.gray3, fontSize:13, cursor:"pointer", textDecoration:"underline" }}>Saltar introducción</span>
      </div>
    </div>
  );
}

function RoleSelectScreen({ onSelect }) {
  return (
    <div style={{ position:"absolute", inset:0, top:50, background:T.white, display:"flex", flexDirection:"column" }}>
      {/* Hero */}
      <div style={{ background:"linear-gradient(160deg,#1E3A00,#3D7A00)", padding:"40px 28px 32px", textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:12 }}>⚡</div>
        <h1 style={{ color:T.lime, fontWeight:900, fontSize:30, margin:"0 0 8px", letterSpacing:-1 }}>chamba</h1>
        <p style={{ color:"rgba(255,255,255,0.7)", fontSize:16, margin:0, lineHeight:1.5 }}>La red social del trabajo y los ingresos extra</p>
      </div>

      <div style={{ flex:1, padding:"32px 24px", display:"flex", flexDirection:"column", gap:16 }}>
        <p style={{ color:T.gray2, fontSize:16, fontWeight:600, textAlign:"center", margin:"0 0 8px" }}>¿Cómo usarás Chamba hoy?</p>

        {/* Employer */}
        <div onClick={()=>onSelect("employer")} style={{ background:T.white, border:`2px solid ${T.border}`, borderRadius:20, padding:"22px", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}
          onMouseEnter={e=>{e.currentTarget.style.border=`2px solid ${T.lime}`;e.currentTarget.style.background=T.limeL;}}
          onMouseLeave={e=>{e.currentTarget.style.border=`2px solid ${T.border}`;e.currentTarget.style.background=T.white;}}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ width:60, height:60, borderRadius:30, background:T.limeL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>👤</div>
            <div style={{ flex:1 }}>
              <p style={{ color:T.black, fontWeight:800, fontSize:18, margin:"0 0 4px" }}>Soy Empleador</p>
              <p style={{ color:T.gray3, fontSize:13, margin:0, lineHeight:1.4 }}>Busco trabajadores para mi hogar, empresa o evento</p>
            </div>
            <span style={{ color:T.gray3, fontSize:22 }}>→</span>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
            {["Buscar trabajadores","Contratar","Pago seguro"].map(tag=>(
              <span key={tag} style={{ background:T.gray5, borderRadius:20, padding:"4px 10px", fontSize:11, color:T.gray2 }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Worker */}
        <div onClick={()=>onSelect("worker")} style={{ background:T.white, border:`2px solid ${T.border}`, borderRadius:20, padding:"22px", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 20px rgba(0,0,0,0.08)" }}
          onMouseEnter={e=>{e.currentTarget.style.border=`2px solid ${T.black}`;e.currentTarget.style.background=T.gray5;}}
          onMouseLeave={e=>{e.currentTarget.style.border=`2px solid ${T.border}`;e.currentTarget.style.background=T.white;}}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ width:60, height:60, borderRadius:30, background:T.dark, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>🧑‍🔧</div>
            <div style={{ flex:1 }}>
              <p style={{ color:T.black, fontWeight:800, fontSize:18, margin:"0 0 4px" }}>Soy Trabajador</p>
              <p style={{ color:T.gray3, fontSize:13, margin:0, lineHeight:1.4 }}>Ofrezco mis servicios y busco ingresos extra</p>
            </div>
            <span style={{ color:T.gray3, fontSize:22 }}>→</span>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
            {["Presencial","Remoto","Pago semanal","Insignias"].map(tag=>(
              <span key={tag} style={{ background:T.dark, borderRadius:20, padding:"4px 10px", fontSize:11, color:"rgba(255,255,255,0.7)" }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Switch role */}
        <p style={{ color:T.gray3, textAlign:"center", fontSize:13, margin:0 }}>Puedes cambiar de modo en cualquier momento desde tu perfil</p>

        {/* Social proof */}
        <div style={{ background:T.limeL, border:`1px solid ${T.lime}`, borderRadius:16, padding:"14px", display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ display:"flex" }}>
            {[11,33,47,44,55].map(n=>(
              <div key={n} style={{ width:28, height:28, borderRadius:14, border:`2px solid ${T.white}`, marginLeft:n===11?0:-8, overflow:"hidden", background:T.gray5 }}>
                <Img src={`https://i.pravatar.cc/60?img=${n}`} style={{ width:"100%", height:"100%"}} />
              </div>
            ))}
          </div>
          <p style={{ color:T.green, fontSize:13, fontWeight:600, margin:0, flex:1 }}>+12.400 personas ya usan Chamba en Chile</p>
        </div>
      </div>
    </div>
  );
}

// ─── EMPLOYER FEED ───────────────────────────────────────────
function EmployerFeed({ go, setS, setWorker, setMatched }) {
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [activeDays, setActiveDays] = useState([]);
  const [modeFilter, setModeFilter] = useState(null); // null | "presencial" | "remoto"
  const [showFilters, setShowFilters] = useState(false);

  const DAYS = [{k:"lu",l:"Lu"},{k:"ma",l:"Ma"},{k:"mi",l:"Mi"},{k:"ju",l:"Ju"},{k:"vi",l:"Vi"},{k:"sa",l:"Sá"},{k:"do",l:"Do"}];
  const DOW_MAP = { lu:"Lunes",ma:"Martes",mi:"Miércoles",ju:"Jueves",vi:"Viernes",sa:"Sábado",do:"Domingo" };

  const filtered = WORKERS.filter(w => {
    if (activeCat && w.cat !== activeCat) return false;
    if (modeFilter && w.mode !== modeFilter) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.service.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeFilterCount = (activeCat?1:0) + activeDays.length + (modeFilter?1:0);

  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, overflowY:"auto", background:T.white }}>
      {/* Sticky header */}
      <div style={{ position:"sticky", top:0, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(10px)", zIndex:20, borderBottom:`0.5px solid ${T.border}` }}>
        <div style={{ padding:"10px 14px 8px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:22, fontWeight:900, color:T.black, letterSpacing:-0.5 }}>chamba</span>
            <span style={{ background:T.limeL, color:T.limeD, fontSize:10, fontWeight:700, borderRadius:10, padding:"2px 8px" }}>Empleador</span>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setS("map")} style={{ background:T.gray5, border:"none", borderRadius:20, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer", color:T.gray2 }}>🗺️</button>
            <button onClick={()=>setS("createoffer")} style={{ background:T.lime, border:"none", borderRadius:20, padding:"6px 12px", fontSize:12, fontWeight:700, color:T.green, cursor:"pointer" }}>＋ Publicar</button>
            <span style={{ fontSize:20, cursor:"pointer" }}>✉️</span>
          </div>
        </div>
        {/* Search + filter button */}
        <div style={{ padding:"0 14px 8px", display:"flex", gap:8 }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:T.gray5, borderRadius:12, padding:"9px 13px" }}>
            <span style={{ fontSize:15, color:T.gray3 }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar trabajadores..." style={{ background:"none", border:"none", outline:"none", fontSize:14, color:T.dark, flex:1 }}/>
            {search&&<span onClick={()=>setSearch("")} style={{ fontSize:14, cursor:"pointer", color:T.gray3 }}>✕</span>}
          </div>
          <button onClick={()=>setShowFilters(!showFilters)} style={{ background:activeFilterCount>0?T.black:T.gray5, border:"none", borderRadius:12, padding:"9px 13px", fontSize:12, fontWeight:600, cursor:"pointer", color:activeFilterCount>0?T.white:T.gray2, position:"relative" }}>
            ⚙️ Filtrar {activeFilterCount>0&&<span style={{ position:"absolute", top:-3, right:-3, width:16, height:16, borderRadius:8, background:T.lime, color:T.green, fontSize:9, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{activeFilterCount}</span>}
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters&&(
          <div style={{ padding:"0 14px 12px", borderTop:`0.5px solid ${T.border}` }}>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"10px 0 8px" }}>📅 ¿Qué días necesitas?</p>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
              {DAYS.map(d=>{
                const active=activeDays.includes(d.k);
                return <div key={d.k} onClick={()=>setActiveDays(prev=>active?prev.filter(x=>x!==d.k):[...prev,d.k])} style={{ background:active?T.black:T.gray5, borderRadius:20, padding:"6px 13px", cursor:"pointer", border:`1.5px solid ${active?T.black:T.border}` }}>
                  <span style={{ color:active?T.white:T.gray2, fontSize:13, fontWeight:600 }}>{d.l}</span>
                </div>;
              })}
              {activeDays.length>0&&<div onClick={()=>setActiveDays([])} style={{ background:"#FEE2E2", borderRadius:20, padding:"6px 12px", cursor:"pointer" }}><span style={{ color:T.red, fontSize:12, fontWeight:600 }}>✕ Limpiar</span></div>}
            </div>
            <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"0 0 8px" }}>📍 Modalidad</p>
            <div style={{ display:"flex", gap:6 }}>
              {[{k:null,l:"Todos"},{k:"presencial",l:"📍 Presencial"},{k:"remoto",l:"💻 Remoto"}].map(m=>(
                <div key={String(m.k)} onClick={()=>setModeFilter(m.k)} style={{ background:modeFilter===m.k?T.black:T.gray5, borderRadius:20, padding:"6px 13px", cursor:"pointer" }}>
                  <span style={{ color:modeFilter===m.k?T.white:T.gray2, fontSize:12, fontWeight:600 }}>{m.l}</span>
                </div>
              ))}
            </div>
            {activeDays.length>0&&<div style={{ background:T.limeL, border:`1px solid ${T.lime}`, borderRadius:10, padding:"8px 12px", marginTop:10 }}>
              <span style={{ color:T.green, fontSize:12, fontWeight:600 }}>🗓️ Disponibles los: {activeDays.map(d=>DOW_MAP[d]).join(", ")}</span>
            </div>}
          </div>
        )}

        {/* Category pills */}
        <div style={{ display:"flex", gap:8, padding:"0 14px 10px", overflowX:"auto" }}>
          <div onClick={()=>setActiveCat(null)} style={{ flexShrink:0, background:!activeCat?T.black:T.gray5, borderRadius:20, padding:"6px 13px", cursor:"pointer" }}>
            <span style={{ color:!activeCat?T.white:T.gray2, fontSize:12, fontWeight:600 }}>Todo</span>
          </div>
          {CATS.map(c=>(
            <div key={c.id} onClick={()=>setActiveCat(activeCat===c.id?null:c.id)} style={{ flexShrink:0, display:"flex", alignItems:"center", gap:5, background:activeCat===c.id?c.color:T.gray5, borderRadius:20, padding:"6px 12px", cursor:"pointer" }}>
              <span style={{ fontSize:13 }}>{c.icon}</span>
              <span style={{ color:activeCat===c.id?T.white:T.gray2, fontSize:12, fontWeight:600 }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stories */}
      <div style={{ display:"flex", gap:12, padding:"12px 14px 10px", overflowX:"auto", borderBottom:`0.5px solid ${T.border}` }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, flexShrink:0 }}>
          <div style={{ width:62, height:62, borderRadius:31, background:T.lime, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontWeight:800, color:T.green, position:"relative" }}>
            S
            <div style={{ position:"absolute", bottom:0, right:0, width:20, height:20, borderRadius:10, background:T.blue, border:`2px solid ${T.white}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:T.white, fontWeight:800 }}>+</div>
          </div>
          <span style={{ fontSize:10, color:T.black }}>Tu story</span>
        </div>
        {WORKERS.map(w=>(
          <div key={w.id} onClick={()=>{setWorker(w);setS("worker");}} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, flexShrink:0, cursor:"pointer" }}>
            <RingAvatar src={w.avatar} size={56} color={w.color}/>
            <span style={{ fontSize:10, color:T.black, maxWidth:60, textAlign:"center", overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{w.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>

      {/* Active filter result count */}
      {activeFilterCount>0&&(
        <div style={{ padding:"8px 14px", background:T.limeL, borderBottom:`0.5px solid ${T.lime}`, display:"flex", justifyContent:"space-between" }}>
          <span style={{ color:T.green, fontSize:13, fontWeight:600 }}>{filtered.length} trabajador{filtered.length!==1?"es":""} encontrado{filtered.length!==1?"s":""}</span>
          <span onClick={()=>{setActiveCat(null);setActiveDays([]);setModeFilter(null);}} style={{ color:T.limeD, fontSize:12, fontWeight:700, cursor:"pointer" }}>Limpiar</span>
        </div>
      )}

      {/* Feed */}
      {filtered.length===0
        ? <div style={{ padding:"50px 20px", textAlign:"center" }}>
            <p style={{ fontSize:44, margin:"0 0 12px" }}>🔍</p>
            <p style={{ color:T.gray2, fontSize:16, fontWeight:700, margin:"0 0 20px" }}>Sin resultados</p>
            <button onClick={()=>{setActiveCat(null);setActiveDays([]);setModeFilter(null);}} style={{ background:T.black, border:"none", borderRadius:20, padding:"10px 24px", color:T.white, fontSize:14, fontWeight:600, cursor:"pointer" }}>Limpiar filtros</button>
          </div>
        : filtered.map(w=>(
          <div key={w.id} style={{ marginBottom:1, background:T.white, borderBottom:`0.5px solid ${T.border}` }}>
            <div style={{ display:"flex", alignItems:"center", padding:"10px 14px", gap:10 }}>
              <div onClick={()=>{setWorker(w);setS("worker");}} style={{ cursor:"pointer" }}>
                <RingAvatar src={w.avatar} size={38} color={w.color}/>
              </div>
              <div onClick={()=>{setWorker(w);setS("worker");}} style={{ flex:1, cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:14, fontWeight:700 }}>{w.name}</span>
                  {w.verified&&<span style={{ fontSize:12 }}>✅</span>}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:12, color:T.gray3 }}>{w.service}</span>
                  <ModeBadge mode={w.mode}/>
                  {w.distKm!==null&&<span style={{ background:T.limeL, color:T.limeD, fontSize:10, fontWeight:700, borderRadius:10, padding:"1px 7px" }}>📍 {w.distLabel}</span>}
                </div>
              </div>
              <button onClick={()=>{setMatched(w);setS("match");}} style={{ background:T.lime, border:"none", borderRadius:20, padding:"7px 13px", fontSize:12, fontWeight:700, color:T.green, cursor:"pointer" }}>Contratar</button>
            </div>
            <div style={{ position:"relative", width:"100%", paddingBottom:"100%", background:T.gray5 }}>
              <Img src={w.posts[0]?.src||w.cover} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} fallback={w.color}/>
              <div style={{ position:"absolute", bottom:12, right:12, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)", borderRadius:20, padding:"6px 14px" }}>
                <span style={{ color:T.lime, fontWeight:800, fontSize:15 }}>{fmt(w.price)}</span>
                <span style={{ color:"rgba(255,255,255,0.7)", fontSize:11, marginLeft:3 }}>{w.pType==="hora"?"/hora":w.pType==="dia"?"/día":"/trabajo"}</span>
              </div>
            </div>
            <div style={{ padding:"10px 14px 12px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ display:"flex", gap:14 }}>
                  <span onClick={()=>setLikedPosts(p=>({...p,[w.id]:!p[w.id]}))} style={{ cursor:"pointer", fontSize:24 }}>{likedPosts[w.id]?"❤️":"🤍"}</span>
                  <span style={{ cursor:"pointer", fontSize:22 }}>💬</span>
                  <span style={{ cursor:"pointer", fontSize:22 }}>↗️</span>
                </div>
                <span style={{ cursor:"pointer", fontSize:22 }}>🔖</span>
              </div>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>{(w.reviews+(likedPosts[w.id]?1:0)).toLocaleString()} me gusta</div>
              <div style={{ fontSize:13, lineHeight:1.5 }}><span style={{ fontWeight:700 }}>{w.handle} </span><span style={{ color:T.dark }}>{w.bio}</span></div>
              <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
                <span style={{ background:T.limeL, color:T.limeD, fontSize:11, fontWeight:700, borderRadius:20, padding:"3px 10px" }}>⭐ {w.rating}</span>
                <ModeBadge mode={w.mode}/>
              </div>
            </div>
          </div>
        ))
      }
      <div style={{ height:16 }}/>
    </div>
  );
}
function WorkerFeed({ go, setS }) {
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState("");
  const [applied, setApplied] = useState({});

  const filtered = JOB_OFFERS.filter(j => {
    if (activeCat && j.cat !== activeCat) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, overflowY:"auto", background:T.white }}>
      {/* Header */}
      <div style={{ position:"sticky", top:0, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(10px)", zIndex:20, borderBottom:`0.5px solid ${T.border}` }}>
        <div style={{ padding:"10px 14px 8px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:22, fontWeight:900, color:T.black, letterSpacing:-0.5 }}>chamba</span>
            <span style={{ background:T.dark, color:T.white, fontSize:10, fontWeight:700, borderRadius:10, padding:"2px 8px" }}>Trabajador</span>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <span style={{ fontSize:20, cursor:"pointer" }}>🔔</span>
            <span style={{ fontSize:20, cursor:"pointer" }}>✉️</span>
          </div>
        </div>
        {/* Search */}
        <div style={{ padding:"0 14px 10px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:T.gray5, borderRadius:12, padding:"9px 14px" }}>
            <span style={{ fontSize:16, color:T.gray3 }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar ofertas de trabajo..." style={{ background:"none", border:"none", outline:"none", fontSize:14, color:T.dark, flex:1 }}/>
            {search&&<span onClick={()=>setSearch("")} style={{ fontSize:16, cursor:"pointer", color:T.gray3 }}>✕</span>}
          </div>
        </div>
      </div>

      {/* Stories de empleadores */}
      <div style={{ display:"flex", gap:12, padding:"12px 14px 10px", overflowX:"auto", borderBottom:`0.5px solid ${T.border}` }}>
        {JOB_OFFERS.map((j,i)=>(
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, flexShrink:0, cursor:"pointer" }}>
            <div style={{ width:62, height:62, borderRadius:31, background:"linear-gradient(45deg,#f09433,#e6683c,#dc2743)", padding:3 }}>
              <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:T.white, padding:2 }}>
                <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden" }}>
                  <Img src={j.avatar} style={{ width:"100%", height:"100%" }}/>
                </div>
              </div>
            </div>
            <span style={{ fontSize:10, color:T.black, maxWidth:60, textAlign:"center", overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{j.employer.split(" ")[0]}</span>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div style={{ display:"flex", gap:8, padding:"10px 14px", overflowX:"auto", borderBottom:`0.5px solid ${T.border}` }}>
        <div onClick={()=>setActiveCat(null)} style={{ flexShrink:0, background:!activeCat?T.black:T.gray5, borderRadius:20, padding:"7px 14px", cursor:"pointer" }}>
          <span style={{ color:!activeCat?T.white:T.gray2, fontSize:13, fontWeight:600 }}>Todo</span>
        </div>
        {CATS.map(c=>(
          <div key={c.id} onClick={()=>setActiveCat(activeCat===c.id?null:c.id)} style={{ flexShrink:0, display:"flex", alignItems:"center", gap:6, background:activeCat===c.id?c.color:T.gray5, borderRadius:20, padding:"7px 14px", cursor:"pointer" }}>
            <span style={{ fontSize:14 }}>{c.icon}</span>
            <span style={{ color:activeCat===c.id?T.white:T.gray2, fontSize:12, fontWeight:600 }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Job cards */}
      <div style={{ padding:"12px 14px" }}>
        {filtered.length===0
          ? <div style={{ padding:"40px 0", textAlign:"center" }}><p style={{ fontSize:40, margin:"0 0 12px" }}>🔍</p><p style={{ color:T.gray3, fontSize:15 }}>No hay ofertas en esta categoría</p></div>
          : filtered.map(j=>(
            <div key={j.id} style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:20, padding:"16px", marginBottom:14, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
              {/* Employer */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <Avatar src={j.avatar} size={40}/>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14, fontWeight:700, color:T.black, margin:0 }}>{j.employer}</p>
                  <p style={{ fontSize:12, color:T.gray3, margin:0 }}>{j.business}</p>
                </div>
                {j.urgent&&<span style={{ background:"#FEF3C7", color:"#92400E", fontSize:10, fontWeight:700, borderRadius:20, padding:"3px 10px", border:"1px solid #FCD34D" }}>⚡ Urgente</span>}
              </div>

              {/* Job image placeholder */}
              <div style={{ height:180, borderRadius:14, overflow:"hidden", marginBottom:12, background:CATS.find(c=>c.id===j.cat)?.color+"20", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                <Img src={FEED_IMGS[filtered.indexOf(j)%FEED_IMGS.length]} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} fallback={CATS.find(c=>c.id===j.cat)?.color}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)" }}/>
                <div style={{ position:"absolute", bottom:10, left:12, right:12, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                  <span style={{ color:T.white, fontWeight:800, fontSize:18 }}>{j.pay}</span>
                  <ModeBadge mode={j.mode}/>
                </div>
              </div>

              {/* Job details */}
              <h3 style={{ fontSize:16, fontWeight:700, color:T.black, margin:"0 0 6px" }}>{j.title}</h3>
              <p style={{ fontSize:13, color:T.gray2, margin:"0 0 10px", lineHeight:1.5 }}>{j.desc}</p>

              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
                <span style={{ background:T.gray5, borderRadius:20, padding:"4px 10px", fontSize:12, color:T.gray2 }}>🕐 {j.time}</span>
                <span style={{ background:T.gray5, borderRadius:20, padding:"4px 10px", fontSize:12, color:T.gray2 }}>📍 {j.location}</span>
                <span style={{ background:T.gray5, borderRadius:20, padding:"4px 10px", fontSize:12, color:T.gray2 }}>👥 {j.applicants} postulantes</span>
              </div>

              <button
                onClick={()=>setApplied(p=>({...p,[j.id]:!p[j.id]}))}
                style={{ width:"100%", background:applied[j.id]?T.gray5:T.black, border:`1px solid ${applied[j.id]?T.border:T.black}`, borderRadius:14, padding:"13px", color:applied[j.id]?T.gray2:T.white, fontSize:14, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}>
                {applied[j.id]?"✓ Postulación enviada":"Postular ahora"}
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ─── WORKER PROFILE SCREEN ───────────────────────────────────
function WorkerScreen({ worker, setS, setMatched }) {
  const [wTab, setWTab] = useState("posts");
  const [followed, setFollowed] = useState(false);
  const [story, setStory] = useState(null);
  const [sIdx, setSIdx] = useState(0);

  if (story) {
    const posts = worker.posts.slice(0, story.count);
    return (
      <div style={{ position:"absolute", inset:0, background:T.dark, zIndex:200, display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"54px 14px 10px" }}>
          <div style={{ display:"flex", gap:3, marginBottom:14 }}>
            {posts.map((_,i)=>(
              <div key={i} style={{ flex:1, height:2.5, background:i<=sIdx?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.35)", borderRadius:2 }}/>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:17, overflow:"hidden", border:`2px solid ${T.white}` }}><Img src={worker.avatar} style={{ width:"100%", height:"100%" }}/></div>
            <span style={{ color:T.white, fontWeight:700, fontSize:14, flex:1 }}>{worker.name}</span>
            <button onClick={()=>setStory(null)} style={{ background:"none", border:"none", color:T.white, fontSize:22, cursor:"pointer" }}>✕</button>
          </div>
        </div>
        <div style={{ flex:1, position:"relative" }}>
          <Img src={posts[sIdx]?.src||worker.cover} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} fallback={worker.color}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))" }}/>
          <div style={{ position:"absolute", left:0, top:0, width:"40%", height:"100%" }} onClick={()=>setSIdx(i=>Math.max(0,i-1))}/>
          <div style={{ position:"absolute", right:0, top:0, width:"40%", height:"100%" }} onClick={()=>{ if(sIdx<posts.length-1) setSIdx(i=>i+1); else setStory(null); }}/>
          <div style={{ position:"absolute", bottom:30, left:16, right:16 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(0,0,0,0.5)", borderRadius:20, padding:"4px 12px", marginBottom:8 }}>
              <span style={{ fontSize:14 }}>{story.icon}</span>
              <span style={{ color:T.white, fontSize:12, fontWeight:700 }}>{story.name}</span>
            </div>
            <p style={{ color:T.white, fontSize:14, lineHeight:1.4, margin:"0 0 12px" }}>{posts[sIdx]?.caption||worker.bio}</p>
            <button onClick={()=>{setMatched(worker);setStory(null);setS("match");}} style={{ width:"100%", background:T.lime, border:"none", borderRadius:25, padding:"13px", color:T.green, fontWeight:800, fontSize:14, cursor:"pointer" }}>Contratar · {fmt(worker.price)}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:0, overflowY:"auto", background:T.white }}>
      {/* Back */}
      <div style={{ display:"flex", alignItems:"center", padding:"12px 16px", gap:12, borderBottom:`0.5px solid ${T.border}` }}>
        <button onClick={()=>setS("feed")} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>←</button>
        <span style={{ fontSize:16, fontWeight:700 }}>{worker.handle}</span>
      </div>

      {/* Profile header */}
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:20, marginBottom:14 }}>
          <RingAvatar src={worker.avatar} size={80} color={worker.color}/>
          <div style={{ flex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", textAlign:"center" }}>
              {[{v:worker.jobs,l:"trabajos"},{v:worker.followers.toLocaleString(),l:"seguidores"},{v:"145",l:"siguiendo"}].map((s,i)=>(
                <div key={i}><div style={{ fontSize:17, fontWeight:800 }}>{s.v}</div><div style={{ fontSize:12 }}>{s.l}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
            <span style={{ fontSize:15, fontWeight:800 }}>{worker.name}</span>
            {worker.verified&&<span style={{ fontSize:13 }}>✅</span>}
            <span style={{ background:T.limeL, color:T.limeD, fontSize:11, fontWeight:700, borderRadius:10, padding:"1px 8px" }}>{worker.service}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
            <span style={{ fontSize:13, color:T.gray3 }}>📍 {worker.service.includes("Video")||worker.service.includes("foto")||worker.mode==="remoto"?"Remoto · Chile":"Santiago"}</span>
            <span style={{ fontSize:13, color:T.yellow }}>⭐ {worker.rating}</span>
            <ModeBadge mode={worker.mode}/>
          </div>
          <p style={{ fontSize:14, color:T.dark, lineHeight:1.5, margin:"0 0 6px" }}>{worker.bio}</p>
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          <button onClick={()=>{setMatched(worker);setS("match");}} style={{ flex:2, background:T.lime, border:"none", borderRadius:10, padding:"10px", fontSize:14, fontWeight:700, color:T.green, cursor:"pointer" }}>Contratar</button>
          <button onClick={()=>setFollowed(f=>!f)} style={{ flex:1, background:followed?T.white:T.black, border:`1px solid ${T.black}`, borderRadius:10, padding:"10px", fontSize:13, fontWeight:700, color:followed?T.black:T.white, cursor:"pointer" }}>{followed?"Siguiendo":"Seguir"}</button>
          <button style={{ width:44, background:T.white, border:`1px solid ${T.border}`, borderRadius:10, fontSize:16, cursor:"pointer" }}>✉️</button>
        </div>

        {/* Tarifas */}
        <div style={{ background:T.gray5, borderRadius:14, padding:"12px 14px", marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>💰 Tarifas</span>
            <ModeBadge mode={worker.mode}/>
          </div>
          {[worker.pH?{icon:"⏱️",l:"Por hora",v:worker.pH,u:"/hora",p:worker.pType==="hora"}:null,worker.pD?{icon:"📅",l:"Por día",v:worker.pD,u:"/día",p:worker.pType==="dia"}:null,worker.pT?{icon:"✅",l:"Por trabajo",v:worker.pT,u:"/trabajo",p:worker.pType==="trabajo"}:null].filter(Boolean).map((t,i,arr)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:i<arr.length-1?8:0, marginBottom:i<arr.length-1?8:0, borderBottom:i<arr.length-1?`0.5px solid ${T.border}`:"none" }}>
              <span style={{ fontSize:17 }}>{t.icon}</span>
              <span style={{ color:T.gray2, fontSize:13, flex:1 }}>{t.l}</span>
              {t.p&&<span style={{ background:T.lime, borderRadius:8, padding:"1px 7px", fontSize:9, color:T.green, fontWeight:900 }}>PRINCIPAL</span>}
              <span style={{ color:T.black, fontWeight:800, fontSize:16 }}>{fmt(t.v)}</span>
              <span style={{ color:T.gray3, fontSize:11 }}>{t.u}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div style={{ padding:"0 16px 14px", display:"flex", gap:14, overflowX:"auto" }}>
        {worker.highlights.map(h=>(
          <div key={h.id} onClick={()=>{setStory(h);setSIdx(0);}} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5, cursor:"pointer", flexShrink:0 }}>
            <div style={{ width:64, height:64, borderRadius:32, border:`1.5px solid ${T.border}`, background:h.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:26 }}>{h.icon}</span>
            </div>
            <span style={{ fontSize:11, color:T.black, fontWeight:500, maxWidth:70, textAlign:"center" }}>{h.name}</span>
          </div>
        ))}
      </div>

      {/* Video de presentación */}
      <div style={{ margin:"0 16px 14px", borderRadius:16, overflow:"hidden", position:"relative", height:190 }}>
        <Img src={worker.cover} style={{ width:"100%", height:"100%" }} fallback={worker.color}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.75), transparent 50%)" }}/>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:54, height:54, borderRadius:27, background:"rgba(255,255,255,0.9)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          <span style={{ fontSize:22, marginLeft:4 }}>▶</span>
        </div>
        <div style={{ position:"absolute", bottom:10, left:14 }}>
          <span style={{ color:"rgba(255,255,255,0.8)", fontSize:11, background:"rgba(0,0,0,0.4)", borderRadius:20, padding:"3px 10px" }}>🎬 Video de presentación · 1:24</span>
        </div>
      </div>

      {/* Posts tabs */}
      <div style={{ display:"flex", borderTop:`0.5px solid ${T.border}`, borderBottom:`0.5px solid ${T.border}` }}>
        {[{k:"posts",icon:"⊞"},{k:"videos",icon:"▶"},{k:"tagged",icon:"🏷️"}].map(t=>(
          <button key={t.k} onClick={()=>setWTab(t.k)} style={{ flex:1, padding:"12px 0", background:"none", border:"none", borderBottom:`2px solid ${wTab===t.k?T.black:"transparent"}`, fontSize:18, cursor:"pointer", opacity:wTab===t.k?1:0.4 }}>{t.icon}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:1.5 }}>
        {worker.posts.filter(p=>wTab==="videos"?p.type==="video":true).map(p=>(
          <div key={p.id} style={{ position:"relative", paddingBottom:"100%", background:T.gray5 }}>
            <Img src={p.src} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} fallback={worker.color}/>
            {p.type==="video"&&<span style={{ position:"absolute", top:6, right:6, fontSize:14 }}>▶</span>}
            <div style={{ position:"absolute", bottom:4, left:6, fontSize:11, color:T.white, fontWeight:700, textShadow:"0 1px 3px rgba(0,0,0,0.8)" }}>❤️ {p.likes}</div>
          </div>
        ))}
      </div>
      <div style={{ height:20 }}/>
    </div>
  );
}

// ─── AGENDA SCREEN ───────────────────────────────────────────
function AgendaScreen({ go, role }) {
  const [days, setDays] = useState({lu:true,ma:true,mi:true,ju:true,vi:true,sa:false,do:false});
  const [from, setFrom] = useState("09:00");
  const [to,   setTo]   = useState("18:00");
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const HOURS = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];
  const fromIdx = HOURS.indexOf(from);

  const BOOKINGS = [
    {day:"Mié 22 Mayo", time:"10:00–12:00", service:"Corte de pasto", worker:"Carlos Méndez", status:"confirmado", color:"#22C55E"},
    {day:"Vie 24 Mayo", time:"14:00–16:00", service:"Lavado de auto", worker:"Rodrigo Soto", status:"confirmado", color:"#3B82F6"},
    {day:"Lun 27 Mayo", time:"09:00–13:00", service:"Aseo del hogar", worker:"Laura Muñoz", status:"pendiente", color:"#F97316"},
  ];

  const days_list = [{k:"lu",l:"Lu"},{k:"ma",l:"Ma"},{k:"mi",l:"Mi"},{k:"ju",l:"Ju"},{k:"vi",l:"Vi"},{k:"sa",l:"Sá"},{k:"do",l:"Do"}];
  const DOW_KEYS = ["lu","ma","mi","ju","vi","sa","do"];
  const allCells = [...Array(4).fill(null), ...Array.from({length:31},(_,i)=>i+1), ...Array(2).fill(null)];
  const weeks = [];
  for(let i=0;i<allCells.length;i+=7) weeks.push(allCells.slice(i,i+7));

  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, overflowY:"auto", background:T.white }}>
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:T.black, margin:0 }}>Mi Agenda</h2>
            <p style={{ color:T.gray3, fontSize:13, margin:"3px 0 0" }}>{role==="worker"?"Tu disponibilidad":"Chambas programadas"}</p>
          </div>
          <button onClick={()=>{setEditMode(!editMode);setSaved(false);}} style={{ background:editMode?T.black:T.gray5, border:"none", borderRadius:20, padding:"8px 16px", color:editMode?T.white:T.black, fontSize:13, fontWeight:700, cursor:"pointer" }}>
            {editMode?"✓ Guardar":"✏️ Editar"}
          </button>
        </div>

        {/* Saved confirmation */}
        {saved&&!editMode&&<div style={{ background:T.limeL, border:`1px solid ${T.lime}`, borderRadius:12, padding:"10px 14px", marginBottom:14, display:"flex", gap:8, alignItems:"center" }}>
          <span>✅</span><span style={{ color:T.limeD, fontSize:13, fontWeight:600 }}>Horario guardado correctamente</span>
        </div>}

        {/* Edit mode */}
        {editMode&&(
          <div style={{ background:T.gray5, borderRadius:16, padding:"16px", marginBottom:16 }}>
            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.black, margin:"0 0 10px" }}>Días disponibles</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:5, marginBottom:16 }}>
              {days_list.map(d=>(
                <div key={d.k} onClick={()=>setDays(p=>({...p,[d.k]:!p[d.k]}))} style={{ height:44, borderRadius:10, background:days[d.k]?T.black:T.white, border:`1.5px solid ${days[d.k]?T.black:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.15s" }}>
                  <span style={{ color:days[d.k]?T.white:T.gray3, fontSize:11, fontWeight:700 }}>{d.l}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.black, margin:"0 0 8px" }}>Horario</p>
            <div style={{ marginBottom:10 }}>
              <p style={{ color:T.gray3, fontSize:12, margin:"0 0 6px" }}>Desde</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {HOURS.slice(0,8).map(h=>(
                  <div key={h} onClick={()=>setFrom(h)} style={{ padding:"5px 10px", borderRadius:8, cursor:"pointer", background:from===h?T.black:T.white, border:`1px solid ${from===h?T.black:T.border}`, color:from===h?T.white:T.gray2, fontSize:12, fontWeight:600 }}>{h}</div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color:T.gray3, fontSize:12, margin:"0 0 6px" }}>Hasta</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {HOURS.filter((_,i)=>i>fromIdx).map(h=>(
                  <div key={h} onClick={()=>setTo(h)} style={{ padding:"5px 10px", borderRadius:8, cursor:"pointer", background:to===h?T.black:T.white, border:`1px solid ${to===h?T.black:T.border}`, color:to===h?T.white:T.gray2, fontSize:12, fontWeight:600 }}>{h}</div>
                ))}
              </div>
            </div>
            <button onClick={()=>{setEditMode(false);setSaved(true);}} style={{ width:"100%", marginTop:14, background:T.lime, border:"none", borderRadius:12, padding:"13px", color:T.green, fontSize:14, fontWeight:700, cursor:"pointer" }}>Guardar horario ✓</button>
          </div>
        )}

        {/* Calendar */}
        <div style={{ marginBottom:16 }}>
          <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.black, margin:"0 0 10px" }}>Mayo 2026</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:6 }}>
            {["L","M","M","J","V","S","D"].map((d,i)=>(
              <div key={i} style={{ textAlign:"center", fontSize:11, fontWeight:700, color:days[DOW_KEYS[i]]?T.black:T.gray4 }}>{d}</div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
            {(weeks[2]||[]).map((day,i)=>{
              const dow = day?DOW_KEYS[(4+day-1)%7]:null;
              const avail = day&&days[dow];
              const today = day===21;
              const booked = day&&[22,24,27].includes(day);
              return (
                <div key={i} style={{ height:34, borderRadius:8, background:booked?"#FEF3C7":today?T.lime:avail?T.limeL:day?T.gray5:"transparent", border:`1px solid ${booked?"#FCD34D":today?T.limeD:avail?T.lime:day?T.border:"transparent"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {day&&<span style={{ fontSize:12, fontWeight:today||booked?700:400, color:today?T.green:booked?"#92400E":avail?T.limeD:T.gray3 }}>{day}</span>}
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:12, marginTop:8 }}>
            {[{color:T.limeL,border:T.lime,label:"Disponible"},{color:"#FEF3C7",border:"#FCD34D",label:"Reservado"},{color:T.lime,border:T.limeD,label:"Hoy"}].map((l,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ width:10, height:10, borderRadius:3, background:l.color, border:`1px solid ${l.border}` }}/>
                <span style={{ fontSize:10, color:T.gray3 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings */}
        <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.black, margin:"0 0 10px" }}>Próximas chambas</p>
        {BOOKINGS.map((b,i)=>(
          <div key={i} style={{ display:"flex", gap:14, padding:"12px", background:T.white, border:`1px solid ${T.border}`, borderRadius:14, marginBottom:10, boxShadow:"0 1px 6px rgba(0,0,0,0.05)", borderLeft:`4px solid ${b.color}` }}>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:T.black, margin:0 }}>{b.day}</p>
              <p style={{ fontSize:12, color:T.gray3, margin:"2px 0 0" }}>{b.time}</p>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:600, color:T.black, margin:0 }}>{b.service}</p>
              <p style={{ fontSize:12, color:T.gray3, margin:"2px 0 0" }}>{b.worker}</p>
            </div>
            <span style={{ background:b.status==="confirmado"?T.limeL:"#FEF3C7", color:b.status==="confirmado"?T.limeD:"#92400E", fontSize:10, fontWeight:700, borderRadius:20, padding:"3px 8px", alignSelf:"flex-start" }}>{b.status}</span>
          </div>
        ))}

        {/* Summary */}
        <div style={{ background:T.gray5, borderRadius:14, padding:"14px", marginBottom:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, textAlign:"center" }}>
            {[{v:`${Object.values(days).filter(Boolean).length}`,l:"días/sem"},{v:`${from}–${to}`,l:"turno"},{v:"3",l:"reservas"}].map((s,i)=>(
              <div key={i}><p style={{ fontSize:16, fontWeight:800, color:T.black, margin:0 }}>{s.v}</p><p style={{ fontSize:11, color:T.gray3, margin:"2px 0 0" }}>{s.l}</p></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE SCREEN ──────────────────────────────────────────
function ProfileScreen({ go, setS, role, setRole, matches }) {
  const [pTab, setPTab] = useState("posts");
  const isWorker = role==="worker";

  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, overflowY:"auto", background:T.white }}>
      <div style={{ borderBottom:`0.5px solid ${T.border}`, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:16, fontWeight:700 }}>sebastianlp</span>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={()=>setRole(isWorker?"employer":"worker")} style={{ background:isWorker?T.dark:T.limeL, border:"none", borderRadius:20, padding:"6px 14px", color:isWorker?T.white:T.limeD, fontSize:12, fontWeight:700, cursor:"pointer" }}>
            {isWorker?"👤 Modo Empleador":"🧑‍🔧 Modo Trabajador"}
          </button>
          <span style={{ fontSize:20, cursor:"pointer" }}>☰</span>
        </div>
      </div>

      <div style={{ padding:"16px 16px 0" }}>
        {/* Avatar + stats */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:20, marginBottom:14 }}>
          <div style={{ width:84, height:84, borderRadius:42, background:T.lime, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, fontWeight:800, color:T.green }}>S</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", textAlign:"center" }}>
              {[{v:matches.length||4,l:"chambas"},{v:"312",l:"seguidores"},{v:"89",l:"siguiendo"}].map((s,i)=>(
                <div key={i}><div style={{ fontSize:17, fontWeight:800 }}>{s.v}</div><div style={{ fontSize:12 }}>{s.l}</div></div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ fontSize:15, fontWeight:700, margin:"0 0 2px" }}>Sebastián López</p>
        <div style={{ display:"flex", gap:6, marginBottom:4 }}>
          <span style={{ background:isWorker?T.dark:T.limeL, color:isWorker?T.white:T.limeD, fontSize:11, fontWeight:700, borderRadius:10, padding:"2px 8px" }}>{isWorker?"🧑‍🔧 Trabajador":"👤 Empleador"}</span>
          <span style={{ background:T.gray5, color:T.gray2, fontSize:11, borderRadius:10, padding:"2px 8px" }}>📍 Providencia</span>
        </div>
        <p style={{ fontSize:14, color:T.dark, margin:"0 0 14px", lineHeight:1.5 }}>Usando Chamba para {isWorker?"ofrecer mis servicios 💪":"encontrar los mejores trabajadores 🚀"}</p>

        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          <button style={{ flex:1, background:T.gray5, border:"none", borderRadius:10, padding:"8px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Editar perfil</button>
          <button style={{ flex:1, background:T.gray5, border:"none", borderRadius:10, padding:"8px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Compartir</button>
          <button onClick={()=>setS("verify")} style={{ width:44, background:T.gray5, border:"none", borderRadius:10, fontSize:16, cursor:"pointer" }}>🛡️</button>
        </div>

        {/* Highlights */}
        <div style={{ display:"flex", gap:14, overflowX:"auto", marginBottom:14, paddingBottom:4 }}>
          {[{icon:"⭐",name:"Favoritos"},{icon:"🏆",name:"Metas"},{icon:isWorker?"📊":"🏠",name:isWorker?"Mis stats":"Mi hogar"},{icon:"➕",name:"Nuevo"}].map((h,i)=>(
            <div key={i} onClick={()=>i===1&&setS("insignias")} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5, cursor:"pointer", flexShrink:0 }}>
              <div style={{ width:62, height:62, borderRadius:31, border:`1.5px solid ${T.border}`, background:T.gray5, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:24 }}>{h.icon}</span>
              </div>
              <span style={{ fontSize:11, color:T.black }}>{h.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Posts tabs */}
      <div style={{ display:"flex", borderTop:`0.5px solid ${T.border}`, borderBottom:`0.5px solid ${T.border}` }}>
        {[{k:"posts",icon:"⊞"},{k:"saved",icon:"🔖"},{k:"tagged",icon:"🏷️"}].map(t=>(
          <button key={t.k} onClick={()=>setPTab(t.k)} style={{ flex:1, padding:"12px 0", background:"none", border:"none", borderBottom:`2px solid ${pTab===t.k?T.black:"transparent"}`, fontSize:18, cursor:"pointer", opacity:pTab===t.k?1:0.4 }}>{t.icon}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:1.5 }}>
        {FEED_IMGS.map((src,i)=>(
          <div key={i} style={{ position:"relative", paddingBottom:"100%", background:T.gray5 }}>
            <Img src={src} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}/>
          </div>
        ))}
      </div>

      <div style={{ padding:"20px 16px" }}>
        {isWorker
          ? <button onClick={()=>setS("insignias")} style={{ width:"100%", background:T.lime, border:"none", borderRadius:14, padding:"13px", color:T.green, fontSize:14, fontWeight:700, cursor:"pointer" }}>🏆 Ver mis metas e insignias</button>
          : <button onClick={()=>setS("onboarding")} style={{ width:"100%", background:T.black, border:"none", borderRadius:14, padding:"13px", color:T.white, fontSize:14, fontWeight:700, cursor:"pointer" }}>🧑‍🔧 También quiero ofrecer servicios</button>
        }
      </div>
    </div>
  );
}

// ─── MATCH / CONFIGURE / PAYMENT / CONFIRM ───────────────────
function MatchScreen({ matched, setS }) {
  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 22px", background:T.white }}>
      <div style={{ position:"relative", marginBottom:14 }}>
        <RingAvatar src={matched.avatar} size={90} color={matched.color}/>
        <div style={{ position:"absolute", bottom:0, right:0, width:30, height:30, borderRadius:15, background:T.lime, border:`3px solid ${T.white}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>✓</div>
      </div>
      <h2 style={{ fontSize:28, fontWeight:800, margin:"0 0 6px", letterSpacing:-0.5 }}>¡Match!</h2>
      <p style={{ color:T.gray3, textAlign:"center", margin:"0 0 22px", fontSize:15, lineHeight:1.6 }}><strong style={{ color:T.black }}>{matched.name}</strong> disponible para {matched.service}</p>
      <div style={{ width:"100%", background:T.gray5, borderRadius:16, padding:"16px", marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Avatar src={matched.avatar} size={42} color={matched.color}/>
            <div><p style={{ margin:0, fontWeight:700, fontSize:14 }}>{matched.name}</p><p style={{ color:T.gray3, margin:0, fontSize:12 }}>⭐ {matched.rating}</p></div>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ margin:0, fontWeight:800, fontSize:18 }}>{fmt(matched.price)}</p>
            <p style={{ color:T.gray3, margin:0, fontSize:11 }}>{matched.pType==="hora"?"/hora":"/trabajo"}</p>
          </div>
        </div>
        <div style={{ background:T.limeL, borderRadius:12, padding:"10px 12px", display:"flex", gap:8 }}>
          <span>🔒</span><p style={{ color:T.green, fontSize:13, margin:0, fontWeight:600 }}>Pago retenido · Se libera al confirmar el trabajo</p>
        </div>
      </div>
      <button onClick={()=>setS("configure")} style={{ width:"100%", background:T.lime, border:"none", borderRadius:14, padding:"15px", color:T.green, fontSize:15, fontWeight:800, cursor:"pointer", marginBottom:10, boxShadow:`0 4px 20px ${T.lime}80` }}>Configurar y pagar →</button>
      <button onClick={()=>setS("feed")} style={{ width:"100%", background:T.white, border:`1px solid ${T.border}`, borderRadius:14, padding:"13px", color:T.gray2, fontSize:14, cursor:"pointer" }}>Seguir buscando</button>
    </div>
  );
}

function ConfigureScreen({ matched, setS }) {
  const [matOpt,setMatOpt]=useState("worker");
  const [pt,setPt]=useState(matched?.pType||"trabajo");
  const [extras,setExtras]=useState({});
  const [bookMode,setBookMode]=useState("ahora");
  const [mobilAccepted,setMobilAccepted]=useState(false);
  const CFG={1:{matCost:3500,extras:[{id:"b",icon:"📐",l:"Bordes",price:3000},{id:"l",icon:"🧹",l:"Post-limpieza",price:2000}]},2:{matCost:2500,extras:[{id:"i",icon:"🪣",l:"Interior",price:4000}]},3:{matCost:8000,extras:[{id:"u",icon:"⚡",l:"Urgencia <1h",price:10000}]},4:{matCost:0,extras:[]},5:{matCost:0,extras:[]},6:{matCost:3000,extras:[]},7:{matCost:0,extras:[]}};
  const cfg=CFG[matched?.id]||{matCost:0,extras:[]};
  const base=matched?(pt==="hora"?(matched.pH||matched.price):pt==="dia"?(matched.pD||matched.price):(matched.pT||matched.price)):0;
  const urg=bookMode==="ahora"?Math.round(base*0.3):0;
  const mat=matOpt==="worker"?(cfg.matCost||0):0;
  const ext=(cfg.extras||[]).filter(e=>extras[e.id]).reduce((s,e)=>s+e.price,0);
  // Mobility fee: only for presencial workers with mobilFee > 0
  const hasMobil = matched?.mode==="presencial" && matched?.mobilFee > 0;
  const mobil = hasMobil && mobilAccepted ? matched.mobilFee : 0;
  const comm=Math.round((base+urg+mat+ext+mobil)*0.1);
  const total=base+urg+mat+ext+mobil+comm;
  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", background:T.white }}>
      <div style={{ borderBottom:`0.5px solid ${T.border}`, padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>setS("match")} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>←</button>
        <span style={{ fontSize:16, fontWeight:700 }}>Configurar servicio</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
        {/* When */}
        <p style={{ fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, margin:"0 0 10px" }}>¿Cuándo?</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
          {[{k:"ahora",icon:"⚡",l:"Ahora",d:"+30%"},{k:"programar",icon:"📅",l:"Programar",d:"Normal"}].map(m=>(
            <div key={m.k} onClick={()=>setBookMode(m.k)} style={{ background:bookMode===m.k?T.gray5:T.white, border:`1.5px solid ${bookMode===m.k?T.black:T.border}`, borderRadius:14, padding:"14px", cursor:"pointer", textAlign:"center" }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{m.icon}</div>
              <p style={{ fontWeight:700, fontSize:14, margin:"0 0 3px" }}>{m.l}</p>
              <span style={{ background:bookMode===m.k?T.black:T.gray5, color:bookMode===m.k?T.white:T.gray3, borderRadius:20, padding:"2px 8px", fontSize:11, fontWeight:600 }}>{m.d}</span>
            </div>
          ))}
        </div>
        {/* Pricing */}
        <p style={{ fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, margin:"0 0 10px" }}>Tarifa</p>
        {[matched?.pH?{k:"hora",icon:"⏱️",l:"Por hora",v:matched.pH}:null,matched?.pD?{k:"dia",icon:"📅",l:"Por día",v:matched.pD}:null,matched?.pT?{k:"trabajo",icon:"✅",l:"Por trabajo",v:matched.pT}:null].filter(Boolean).map(t=>(
          <div key={t.k} onClick={()=>setPt(t.k)} style={{ display:"flex", alignItems:"center", gap:12, background:pt===t.k?T.gray5:T.white, border:`1.5px solid ${pt===t.k?T.black:T.border}`, borderRadius:12, padding:"12px", marginBottom:8, cursor:"pointer" }}>
            <span style={{ fontSize:19 }}>{t.icon}</span><span style={{ flex:1, fontWeight:600, fontSize:14 }}>{t.l}</span><span style={{ fontWeight:800, fontSize:15 }}>{fmt(t.v)}</span>
            <div style={{ width:20, height:20, borderRadius:10, background:pt===t.k?T.black:"transparent", border:`2px solid ${pt===t.k?T.black:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:T.white }}>{pt===t.k?"✓":""}</div>
          </div>
        ))}
        {/* Materials */}
        {cfg.matCost>0&&<><p style={{ fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, margin:"14px 0 10px" }}>Materiales</p>
        {[{k:"worker",icon:"🧑‍🔧",l:"Trabajador trae",s:`+${fmt(cfg.matCost)}`},{k:"client",icon:"🏠",l:"Yo proporciono",s:"Gratis"}].map(o=>(
          <div key={o.k} onClick={()=>setMatOpt(o.k)} style={{ display:"flex", alignItems:"center", gap:12, background:matOpt===o.k?T.gray5:T.white, border:`1.5px solid ${matOpt===o.k?T.black:T.border}`, borderRadius:12, padding:"12px", marginBottom:8, cursor:"pointer" }}>
            <span style={{ fontSize:19 }}>{o.icon}</span><span style={{ flex:1, fontWeight:600, fontSize:14 }}>{o.l}</span><span style={{ color:T.gray3, fontSize:13 }}>{o.s}</span>
            <div style={{ width:20, height:20, borderRadius:10, background:matOpt===o.k?T.black:"transparent", border:`2px solid ${matOpt===o.k?T.black:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:T.white }}>{matOpt===o.k?"✓":""}</div>
          </div>
        ))}</>}
        {/* Extras */}
        {(cfg.extras||[]).length>0&&<><p style={{ fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, margin:"14px 0 10px" }}>Extras</p>
        {(cfg.extras||[]).map(ex=>{const on=!!extras[ex.id];return <div key={ex.id} onClick={()=>setExtras(p=>({...p,[ex.id]:!p[ex.id]}))} style={{ display:"flex", alignItems:"center", gap:12, background:on?T.gray5:T.white, border:`1.5px solid ${on?T.black:T.border}`, borderRadius:12, padding:"12px", marginBottom:8, cursor:"pointer" }}>
          <span style={{ fontSize:19 }}>{ex.icon}</span><span style={{ flex:1, fontWeight:600, fontSize:14 }}>{ex.l}</span><span style={{ color:T.gray3, fontSize:13 }}>+{fmt(ex.price)}</span>
          <div style={{ width:20, height:20, borderRadius:6, background:on?T.black:"transparent", border:`2px solid ${on?T.black:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:T.white }}>{on?"✓":""}</div>
        </div>;})}</>}

        {/* Mobility fee */}
        {hasMobil&&(
          <div>
            <p style={{ fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, margin:"14px 0 10px" }}>🚗 Tarifa de movilización</p>
            <div style={{ background:"#FEF3C7", border:"1px solid #FCD34D", borderRadius:14, padding:"14px", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <span style={{ fontSize:22 }}>🚗</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:700, fontSize:14, margin:0, color:T.black }}>{matched?.name} cobra tarifa de movilización</p>
                  <p style={{ color:"#92400E", fontSize:12, margin:"3px 0 0" }}>Está a {matched?.distLabel} de ti · El trabajador se traslada hasta tu ubicación</p>
                </div>
                <span style={{ fontWeight:800, fontSize:16, color:"#92400E" }}>{fmt(matched?.mobilFee)}</span>
              </div>
              <p style={{ color:"#78350F", fontSize:12, margin:"0 0 12px", lineHeight:1.4 }}>
                Esta tarifa compensa el tiempo y costo de traslado del trabajador. Es opcional — si prefieres, puedes buscar alguien más cercano.
              </p>
              <div style={{ display:"flex", gap:8 }}>
                <div onClick={()=>setMobilAccepted(true)} style={{ flex:2, background:mobilAccepted?T.black:T.white, border:`1.5px solid ${mobilAccepted?T.black:T.border}`, borderRadius:12, padding:"10px", cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                  <p style={{ color:mobilAccepted?T.white:T.black, fontWeight:700, fontSize:13, margin:0 }}>✓ Aceptar tarifa</p>
                  <p style={{ color:mobilAccepted?"rgba(255,255,255,0.7)":T.gray3, fontSize:11, margin:"2px 0 0" }}>+{fmt(matched?.mobilFee)}</p>
                </div>
                <div onClick={()=>setMobilAccepted(false)} style={{ flex:1, background:!mobilAccepted?T.gray5:T.white, border:`1.5px solid ${!mobilAccepted?T.black:T.border}`, borderRadius:12, padding:"10px", cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                  <p style={{ color:T.black, fontWeight:600, fontSize:13, margin:0 }}>Sin tarifa</p>
                </div>
              </div>
            </div>
            {!mobilAccepted&&(
              <div style={{ background:T.gray5, borderRadius:10, padding:"10px 12px", display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
                <span style={{ fontSize:14 }}>💡</span>
                <p style={{ color:T.gray2, fontSize:12, margin:0 }}>Sin tarifa, el trabajador puede priorizar clientes más cercanos o rechazar el trabajo.</p>
              </div>
            )}
          </div>
        )}

        {/* Total */}
        <div style={{ background:T.gray5, borderRadius:14, padding:"14px", marginTop:8 }}>
          {[
            [matched?.service, fmt(base)],
            urg?["⚡ Urgencia (+30%)", fmt(urg)]:null,
            mat?["🧰 Materiales", `+${fmt(mat)}`]:null,
            mobil?[`🚗 Movilización (${matched?.distLabel})`, `+${fmt(mobil)}`]:null,
            ["Comisión (10%)", fmt(comm)],
          ].filter(Boolean).map(([l,v],i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
              <span style={{ color:T.gray3, fontSize:13 }}>{l}</span><span style={{ fontSize:13, fontWeight:600 }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:10, display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontWeight:800, fontSize:15 }}>Total</span>
            <span style={{ color:T.limeD, fontWeight:900, fontSize:20 }}>{fmt(total)}</span>
          </div>
        </div>
      </div>
      <div style={{ padding:"12px 16px 16px", borderTop:`0.5px solid ${T.border}` }}>
        <button onClick={()=>setS("payment")} style={{ width:"100%", background:T.lime, border:"none", borderRadius:14, padding:"16px", color:T.green, fontSize:15, fontWeight:800, cursor:"pointer" }}>Continuar · {fmt(total)}</button>
      </div>
    </div>
  );
}

// ─── CREATE OFFER SCREEN ─────────────────────────────────────
function CreateOfferScreen({ setS }) {
  const [step, setStep] = useState(0);
  const [cat, setCat] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pay, setPay] = useState("");
  const [mode, setMode] = useState("presencial");
  const [days, setDays] = useState([]);
  const [timeFrom, setTimeFrom] = useState("09:00");
  const [timeTo, setTimeTo] = useState("18:00");
  const [urgent, setUrgent] = useState(false);
  const [posted, setPosted] = useState(false);

  const DAYS_LIST = [{k:"lu",l:"Lu",full:"Lunes"},{k:"ma",l:"Ma",full:"Martes"},{k:"mi",l:"Mi",full:"Miércoles"},{k:"ju",l:"Ju",full:"Jueves"},{k:"vi",l:"Vi",full:"Viernes"},{k:"sa",l:"Sá",full:"Sábado"},{k:"do",l:"Do",full:"Domingo"}];
  const HOURS = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];

  if (posted) {
    return (
      <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 24px", background:T.white }}>
        <div style={{ width:88, height:88, borderRadius:44, background:T.lime, display:"flex", alignItems:"center", justifyContent:"center", fontSize:38, marginBottom:18, boxShadow:`0 0 0 14px ${T.limeL}` }}>📢</div>
        <h2 style={{ fontSize:24, fontWeight:800, margin:"0 0 8px", textAlign:"center" }}>¡Oferta publicada!</h2>
        <p style={{ color:T.gray3, textAlign:"center", margin:"0 0 24px", fontSize:14, lineHeight:1.6 }}>Los trabajadores ya pueden ver tu oferta y postular. Te notificaremos cada vez que alguien aplique.</p>
        <div style={{ width:"100%", background:T.gray5, borderRadius:16, padding:"16px", marginBottom:20 }}>
          <p style={{ fontSize:13, fontWeight:700, color:T.black, margin:"0 0 12px" }}>Resumen de tu oferta</p>
          <div style={{ display:"flex", gap:10, marginBottom:8 }}><span style={{ fontSize:18 }}>{cat?.icon}</span><span style={{ fontWeight:700, fontSize:15 }}>{title}</span></div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <span style={{ background:T.limeL, color:T.limeD, borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:700 }}>{fmt(parseInt(pay)||0)}</span>
            <ModeBadge mode={mode}/>
            {days.length>0&&<span style={{ background:T.gray5, color:T.gray2, borderRadius:20, padding:"3px 10px", fontSize:12 }}>{days.map(d=>DAYS_LIST.find(x=>x.k===d)?.l).join(", ")}</span>}
            {urgent&&<span style={{ background:"#FEF3C7", color:"#92400E", borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:700 }}>⚡ Urgente</span>}
          </div>
        </div>
        <button onClick={()=>setS("feed")} style={{ width:"100%", background:T.lime, border:"none", borderRadius:14, padding:"15px", color:T.green, fontSize:15, fontWeight:800, cursor:"pointer", marginBottom:10 }}>Ver mi feed</button>
        <button onClick={()=>{setPosted(false);setStep(0);setCat(null);setTitle("");setDesc("");setPay("");setDays([]);}} style={{ width:"100%", background:T.white, border:`1px solid ${T.border}`, borderRadius:14, padding:"13px", color:T.gray2, fontSize:14, cursor:"pointer" }}>Publicar otra oferta</button>
      </div>
    );
  }

  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", background:T.white }}>
      {/* Header */}
      <div style={{ borderBottom:`0.5px solid ${T.border}`, padding:"12px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
          <button onClick={()=>step===0?setS("feed"):setStep(s=>s-1)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>←</button>
          <div>
            <p style={{ color:T.gray3, fontSize:12, margin:0 }}>Paso {step+1} de 3</p>
            <p style={{ fontWeight:700, fontSize:16, margin:"2px 0 0" }}>{step===0?"Tipo de trabajo":step===1?"Detalles de la oferta":"Cuándo y cómo"}</p>
          </div>
        </div>
        <div style={{ height:3, background:T.gray5, borderRadius:2 }}>
          <div style={{ width:`${((step+1)/3)*100}%`, height:"100%", background:T.lime, borderRadius:2, transition:"width 0.3s" }}/>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>

        {/* STEP 0: Category */}
        {step===0&&(
          <div>
            <p style={{ color:T.gray2, fontSize:14, margin:"0 0 16px", lineHeight:1.5 }}>¿Qué tipo de trabajador necesitas?</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {CATS.map(c=>{
                const active = cat?.id===c.id;
                return (
                  <div key={c.id} onClick={()=>setCat(c)} style={{ background:active?c.color+"15":T.white, border:`2px solid ${active?c.color:T.border}`, borderRadius:14, padding:"14px", cursor:"pointer", transition:"all 0.15s", display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:38, height:38, borderRadius:19, background:active?c.color+"25":T.gray5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{c.icon}</div>
                    <span style={{ fontWeight:600, fontSize:13, color:T.black }}>{c.label}</span>
                    {active&&<div style={{ marginLeft:"auto", width:20, height:20, borderRadius:10, background:c.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:T.white }}>✓</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 1: Details */}
        {step===1&&(
          <div>
            {cat&&<div style={{ display:"flex", alignItems:"center", gap:10, background:T.gray5, borderRadius:12, padding:"12px", marginBottom:18 }}>
              <span style={{ fontSize:22 }}>{cat.icon}</span>
              <span style={{ fontWeight:700, fontSize:14 }}>{cat.label}</span>
            </div>}

            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"0 0 8px" }}>Título de la oferta</p>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder={`Ej: ${cat?.label} para evento familiar`} style={{ width:"100%", background:T.gray5, border:`1.5px solid ${title?T.black:T.border}`, borderRadius:12, padding:"12px 14px", fontSize:14, color:T.black, outline:"none", marginBottom:16, boxSizing:"border-box" }}/>

            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"0 0 8px" }}>Descripción</p>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe en detalle lo que necesitas, requisitos, experiencia esperada..." rows={4} style={{ width:"100%", background:T.gray5, border:`1.5px solid ${desc?T.black:T.border}`, borderRadius:12, padding:"12px 14px", fontSize:14, color:T.black, outline:"none", resize:"none", marginBottom:16, boxSizing:"border-box", fontFamily:"inherit" }}/>

            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"0 0 8px" }}>Pago ofrecido</p>
            <div style={{ display:"flex", alignItems:"center", background:T.gray5, border:`1.5px solid ${pay?T.black:T.border}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
              <span style={{ padding:"12px 14px", color:T.gray3, fontSize:17, fontWeight:700, background:T.white, borderRight:`1px solid ${T.border}` }}>$</span>
              <input type="number" placeholder="ej: 50.000" value={pay} onChange={e=>setPay(e.target.value)} style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.black, fontSize:16, fontWeight:700, padding:"12px 14px" }}/>
              <select style={{ background:"transparent", border:"none", outline:"none", color:T.gray3, fontSize:13, padding:"12px 14px", cursor:"pointer" }}>
                <option>total</option><option>/ hora</option><option>/ día</option>
              </select>
            </div>

            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"0 0 8px" }}>¿Es urgente?</p>
            <div style={{ display:"flex", gap:8 }}>
              {[{k:false,l:"No urgente",d:"Plazo normal"},{k:true,l:"⚡ Urgente",d:"Necesito ASAP"}].map(u=>(
                <div key={String(u.k)} onClick={()=>setUrgent(u.k)} style={{ flex:1, background:urgent===u.k?T.gray5:T.white, border:`1.5px solid ${urgent===u.k?T.black:T.border}`, borderRadius:12, padding:"12px", cursor:"pointer", textAlign:"center" }}>
                  <p style={{ fontWeight:700, fontSize:14, margin:"0 0 2px" }}>{u.l}</p>
                  <p style={{ color:T.gray3, fontSize:12, margin:0 }}>{u.d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: When & How */}
        {step===2&&(
          <div>
            {/* Mode */}
            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"0 0 10px" }}>Modalidad del trabajo</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:20 }}>
              {[{k:"presencial",icon:"📍",l:"Presencial"},{k:"remoto",icon:"💻",l:"Remoto"},{k:"ambos",icon:"🔄",l:"Ambos"}].map(m=>(
                <div key={m.k} onClick={()=>setMode(m.k)} style={{ background:mode===m.k?T.gray5:T.white, border:`1.5px solid ${mode===m.k?T.black:T.border}`, borderRadius:12, padding:"12px 8px", cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                  <div style={{ fontSize:22, marginBottom:5 }}>{m.icon}</div>
                  <span style={{ fontWeight:600, fontSize:12, color:T.black }}>{m.l}</span>
                </div>
              ))}
            </div>

            {/* Days needed */}
            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"0 0 10px" }}>¿Qué días necesitas? (opcional)</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:5, marginBottom:16 }}>
              {DAYS_LIST.map(d=>{
                const active = days.includes(d.k);
                return (
                  <div key={d.k} onClick={()=>setDays(prev=>active?prev.filter(x=>x!==d.k):[...prev,d.k])} style={{ height:42, borderRadius:10, background:active?T.black:T.gray5, border:`1.5px solid ${active?T.black:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.15s" }}>
                    <span style={{ color:active?T.white:T.gray3, fontSize:11, fontWeight:700 }}>{d.l}</span>
                  </div>
                );
              })}
            </div>

            {/* Time range */}
            <p style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, color:T.gray3, margin:"0 0 10px" }}>Horario (opcional)</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
              {[{label:"Desde",val:timeFrom,set:setTimeFrom},{label:"Hasta",val:timeTo,set:setTimeTo}].map((h,i)=>(
                <div key={i}>
                  <p style={{ color:T.gray3, fontSize:12, margin:"0 0 6px" }}>{h.label}</p>
                  <select value={h.val} onChange={e=>h.set(e.target.value)} style={{ width:"100%", background:T.gray5, border:`1.5px solid ${T.border}`, borderRadius:10, padding:"10px 12px", fontSize:14, color:T.black, outline:"none", cursor:"pointer" }}>
                    {HOURS.map(hr=><option key={hr} value={hr}>{hr}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div style={{ background:T.gray5, borderRadius:16, padding:"14px", marginBottom:8 }}>
              <p style={{ fontSize:12, fontWeight:700, color:T.black, margin:"0 0 12px" }}>Vista previa de tu oferta</p>
              <div style={{ display:"flex", gap:10, marginBottom:8 }}>
                <div style={{ width:40, height:40, borderRadius:20, background:cat?.color+"20", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{cat?.icon}</div>
                <div>
                  <p style={{ fontWeight:700, fontSize:14, margin:0 }}>{title||"Título de tu oferta"}</p>
                  <p style={{ color:T.gray3, fontSize:12, margin:"2px 0 0" }}>{cat?.label}</p>
                </div>
              </div>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                {pay&&<span style={{ background:T.limeL, color:T.limeD, borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:700 }}>{fmt(parseInt(pay)||0)}</span>}
                <ModeBadge mode={mode}/>
                {days.length>0&&<span style={{ background:T.white, color:T.gray2, borderRadius:20, padding:"3px 10px", fontSize:11, border:`1px solid ${T.border}` }}>{days.map(d=>DAYS_LIST.find(x=>x.k===d)?.l).join(", ")}</span>}
                {urgent&&<span style={{ background:"#FEF3C7", color:"#92400E", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>⚡ Urgente</span>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding:"12px 16px 16px", borderTop:`0.5px solid ${T.border}` }}>
        {step<2
          ?<button onClick={()=>{ if(step===0&&!cat)return; if(step===1&&(!title||!pay))return; setStep(s=>s+1); }} style={{ width:"100%", background:(step===0&&cat)||(step===1&&title&&pay)?T.black:T.gray5, border:"none", borderRadius:14, padding:"15px", color:(step===0&&cat)||(step===1&&title&&pay)?T.white:T.gray3, fontSize:15, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}>Continuar →</button>
          :<button onClick={()=>setPosted(true)} style={{ width:"100%", background:T.lime, border:"none", borderRadius:14, padding:"15px", color:T.green, fontSize:15, fontWeight:800, cursor:"pointer" }}>📢 Publicar oferta</button>
        }
      </div>
    </div>
  );
}

function PaymentScreen({ matched, setS }) {
  const [pm,setPm]=useState(0);
  const total=Math.round((matched?.price||0)*1.1);
  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", background:T.white }}>
      <div style={{ borderBottom:`0.5px solid ${T.border}`, padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>setS("configure")} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>←</button>
        <span style={{ fontSize:16, fontWeight:700 }}>Confirmar pago</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
        <div style={{ background:T.gray5, borderRadius:14, padding:"14px", marginBottom:18 }}>
          {[[matched?.service,fmt(matched?.price||0)],["Comisión (10%)",fmt(Math.round((matched?.price||0)*0.1))]].map(([l,v],i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}><span style={{ color:T.gray3, fontSize:13 }}>{l}</span><span style={{ fontSize:13, fontWeight:600 }}>{v}</span></div>
          ))}
          <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:10, display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontWeight:800, fontSize:15 }}>Total</span><span style={{ color:T.limeD, fontWeight:900, fontSize:20 }}>{fmt(total)}</span>
          </div>
        </div>
        {[{icon:"📱",l:"Webpay / Transbank",s:"Tarjeta débito o crédito"},{icon:"🏦",l:"Transferencia bancaria",s:"Mach, TENPO, banco"},{icon:"💳",l:"Wallet Chamba",s:"Saldo: $15.000"}].map((m,i)=>(
          <div key={i} onClick={()=>setPm(i)} style={{ display:"flex", alignItems:"center", gap:12, background:pm===i?T.gray5:T.white, border:`1.5px solid ${pm===i?T.black:T.border}`, borderRadius:14, padding:"14px", marginBottom:10, cursor:"pointer" }}>
            <span style={{ fontSize:24 }}>{m.icon}</span><div style={{ flex:1 }}><p style={{ margin:0, fontSize:14, fontWeight:600 }}>{m.l}</p><p style={{ color:T.gray3, margin:0, fontSize:12 }}>{m.s}</p></div>
            <div style={{ width:22, height:22, borderRadius:11, background:pm===i?T.black:"transparent", border:`2px solid ${pm===i?T.black:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:T.white }}>{pm===i?"✓":""}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"12px 16px 16px", borderTop:`0.5px solid ${T.border}` }}>
        <button onClick={()=>setS("confirm")} style={{ width:"100%", background:T.black, border:"none", borderRadius:14, padding:"16px", color:T.white, fontSize:15, fontWeight:700, cursor:"pointer" }}>🔒 Pagar {fmt(total)}</button>
      </div>
    </div>
  );
}

function ConfirmScreen({ matched, setS, setMatches }) {
  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 22px", background:T.white }}>
      <div style={{ width:88, height:88, borderRadius:44, background:T.lime, display:"flex", alignItems:"center", justifyContent:"center", fontSize:38, marginBottom:18, boxShadow:`0 0 0 14px ${T.limeL}` }}>✓</div>
      <h2 style={{ fontSize:26, fontWeight:800, margin:"0 0 8px" }}>¡Chamba reservada!</h2>
      <p style={{ color:T.gray3, textAlign:"center", margin:"0 0 22px", fontSize:14, lineHeight:1.6 }}>{matched?.name} fue notificado.<br/>Pago protegido hasta que termines.</p>
      <div style={{ width:"100%", background:T.gray5, borderRadius:16, padding:"16px", marginBottom:20 }}>
        {[{icon:"✅",l:"Pago reservado",done:true},{icon:"💬",l:`${matched?.name} notificado`,done:true},{icon:"🛠️",l:"Servicio en progreso",done:false},{icon:"🔓",l:"Tú liberas el pago al finalizar",done:false}].map((s,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:i<3?13:0 }}>
            <div style={{ width:30, height:30, borderRadius:15, background:s.done?T.limeL:T.gray5, border:`1.5px solid ${s.done?T.lime:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{s.icon}</div>
            <span style={{ color:s.done?T.black:T.gray3, fontSize:13, fontWeight:s.done?600:400 }}>{s.l}</span>
          </div>
        ))}
      </div>
      <button onClick={()=>{setMatches(m=>[...m,matched]);setS("feed");}} style={{ width:"100%", background:T.lime, border:"none", borderRadius:14, padding:"15px", color:T.green, fontSize:15, fontWeight:800, cursor:"pointer" }}>Ver mi feed</button>
    </div>
  );
}

function VerifyScreen({ setS }) {
  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", background:T.white }}>
      <div style={{ borderBottom:`0.5px solid ${T.border}`, padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>setS("profile")} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>←</button>
        <span style={{ fontSize:16, fontWeight:700 }}>Verificación de identidad</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
        <div style={{ background:T.limeL, border:`1px solid ${T.lime}`, borderRadius:14, padding:"14px", marginBottom:20, display:"flex", gap:12 }}>
          <span style={{ fontSize:22 }}>🛡️</span>
          <div><p style={{ color:T.green, margin:0, fontWeight:700, fontSize:14 }}>¿Por qué verificamos?</p><p style={{ color:T.gray2, margin:"4px 0 0", fontSize:13, lineHeight:1.5 }}>Solo usuarios verificados pueden contratar o recibir pagos. Protege a toda la comunidad.</p></div>
        </div>
        {[{n:"1",icon:"🪪",t:"Foto de tu carnet",d:"Anverso y reverso. IA extrae y valida tus datos automáticamente.",action:"📷 Fotografiar"},{n:"2",icon:"🤳",t:"Selfie de verificación",d:"Foto en vivo, liveness detection anti-fraude.",action:"📸 Selfie"},{n:"3",icon:"📋",t:"Certificado antecedentes",d:"Registro Civil, máx. 90 días.",action:"📎 Subir"},{n:"4",icon:"✅",t:"Revisión final",d:"Resultado en ~5 minutos.",action:null}].map((s,i)=>(
          <div key={i} style={{ display:"flex", gap:14, paddingBottom:i<3?16:0, marginBottom:i<3?16:0, borderBottom:i<3?`0.5px solid ${T.border}`:"none" }}>
            <div style={{ width:36, height:36, borderRadius:18, background:T.gray5, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:18 }}>{s.icon}</div>
            <div style={{ flex:1 }}>
              <p style={{ margin:0, fontWeight:700, fontSize:14 }}>{s.n}. {s.t}</p>
              <p style={{ color:T.gray3, margin:"4px 0 8px", fontSize:13, lineHeight:1.4 }}>{s.d}</p>
              {s.action&&<button style={{ background:T.gray5, border:"none", borderRadius:20, padding:"6px 14px", fontSize:13, fontWeight:600, cursor:"pointer" }}>{s.action}</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsigniasScreen({ setS }) {
  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", background:T.white }}>
      <div style={{ borderBottom:`0.5px solid ${T.border}`, padding:"12px 16px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>setS("profile")} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>←</button>
        <span style={{ fontSize:16, fontWeight:700 }}>Metas e Insignias</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
        <div style={{ background:T.lime, borderRadius:20, padding:"20px", marginBottom:20, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:-15, top:-15, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.2)" }}/>
          <p style={{ color:T.green, fontSize:10, fontWeight:800, letterSpacing:1.5, textTransform:"uppercase", margin:"0 0 4px" }}>Nivel actual</p>
          <h2 style={{ color:T.green, fontSize:26, margin:"0 0 4px", fontWeight:800 }}>🚀 En camino</h2>
          <p style={{ color:"rgba(30,50,0,0.65)", fontSize:13, margin:"0 0 10px" }}>12 trabajos · 13 para el siguiente nivel</p>
          <div style={{ background:"rgba(255,255,255,0.4)", borderRadius:6, height:6 }}>
            <div style={{ width:"48%", height:"100%", background:T.green, borderRadius:6 }}/>
          </div>
        </div>
        {[{icon:"🎯",level:"Primer paso",goal:3,reward:"$2.000",done:true,cur:3},{icon:"🚀",level:"En camino",goal:10,reward:"$5.000",done:true,cur:10},{icon:"⭐",level:"Pro",goal:25,reward:"$15.000",done:false,cur:12},{icon:"🏆",level:"Experto",goal:50,reward:"$30.000",done:false,cur:12},{icon:"💎",level:"Elite",goal:100,reward:"$75.000",done:false,cur:12}].map((g,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:i<4?`0.5px solid ${T.border}`:"none" }}>
            <div style={{ width:46, height:46, borderRadius:23, background:g.done?T.lime:T.gray5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{g.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <p style={{ margin:0, fontWeight:700, fontSize:14 }}>{g.level}</p>
                {g.done&&<span style={{ background:T.lime, borderRadius:20, padding:"1px 8px", fontSize:10, color:T.green, fontWeight:800 }}>✓ Logrado</span>}
              </div>
              {!g.done&&<div style={{ marginTop:6 }}>
                <div style={{ background:T.gray5, borderRadius:4, height:4 }}><div style={{ width:`${(g.cur/g.goal)*100}%`, height:"100%", background:T.lime, borderRadius:4 }}/></div>
                <span style={{ color:T.gray3, fontSize:11, marginTop:3, display:"block" }}>{g.cur}/{g.goal} trabajos</span>
              </div>}
            </div>
            <div style={{ textAlign:"right" }}><p style={{ color:g.done?T.limeD:T.gray3, fontWeight:800, fontSize:15, margin:0 }}>{g.reward}</p><p style={{ color:T.gray3, fontSize:11, margin:0 }}>bono</p></div>
          </div>
        ))}
        <div style={{ background:T.gray5, borderRadius:16, padding:"14px", marginTop:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div><p style={{ fontWeight:700, fontSize:14, margin:0 }}>💰 Pago semanal</p><p style={{ color:T.gray3, fontSize:12, margin:0 }}>Lunes 27 Mayo · 3 trabajos</p></div>
            <span style={{ color:T.limeD, fontWeight:800, fontSize:18 }}>$47.000</span>
          </div>
          <div style={{ background:T.limeL, border:`1px solid ${T.lime}`, borderRadius:10, padding:"9px 12px", display:"flex", gap:8 }}>
            <span>📄</span><p style={{ color:T.green, fontSize:12, margin:0, fontWeight:600 }}>Boleta de honorarios emitida automáticamente al SII</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingScreen({ setS }) {
  const [step,setStep]=useState(0);
  const [cat,setCat]=useState(null);
  const [types,setTypes]=useState({});
  const [prices,setPrices]=useState({hora:"",dia:"",trabajo:""});
  const [main,setMain]=useState(null);
  const [workMode,setWorkMode]=useState("presencial");
  const CATS2=[{k:"gastro",icon:"🍽️",l:"Garzón / Bartender",t:["hora"]},{k:"peluqueria",icon:"✂️",l:"Peluquero / Estilista",t:["trabajo"]},{k:"jardineria",icon:"🌿",l:"Jardinero",t:["trabajo","dia"]},{k:"limpieza",icon:"🧹",l:"Limpieza del hogar",t:["hora","dia"]},{k:"gasfiteria",icon:"🔧",l:"Gasfitero",t:["hora","trabajo"]},{k:"edicion",icon:"🎬",l:"Editor de video/foto",t:["trabajo","dia"]},{k:"eventos",icon:"🎉",l:"Iluminación eventos",t:["trabajo"]},{k:"manejo",icon:"🚘",l:"Clases de manejo",t:["hora"]},{k:"costuras",icon:"🧵",l:"Costuras por prenda",t:["trabajo"]},{k:"flyers",icon:"📄",l:"Repartidor de flyers",t:["dia","hora"]},{k:"cuidado",icon:"👶",l:"Niñera / Cuidador",t:["hora","dia"]},{k:"trainer",icon:"💪",l:"Personal trainer",t:["hora"]},{k:"otro",icon:"🛠️",l:"Otro oficio",t:["hora","dia","trabajo"]}];
  const TIPOS=[{k:"hora",icon:"⏱️",l:"Por hora",d:"Cobras por cada hora",e:"Garzón, niñera"},{k:"dia",icon:"📅",l:"Por día",d:"Tarifa fija por jornada",e:"Pintor, flyers"},{k:"trabajo",icon:"✅",l:"Por trabajo",d:"Precio fijo por el servicio",e:"Corte, edición"}];
  const filtered=cat?TIPOS.filter(t=>cat.t.includes(t.k)||cat.k==="otro"):TIPOS;
  const remoteOnly=["edicion","otro"].includes(cat?.k);
  const canNext=(step===0&&!!cat)||(step===1&&Object.values(types).filter(Boolean).length>0);
  return (
    <div style={{ position:"absolute", inset:0, top:50, bottom:78, display:"flex", flexDirection:"column", background:T.white }}>
      <div style={{ borderBottom:`0.5px solid ${T.border}`, padding:"12px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
          <button onClick={()=>step===0?setS("profile"):setStep(s=>s-1)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>←</button>
          <div><p style={{ color:T.gray3, fontSize:12, margin:0 }}>Paso {step+1} de 4</p><p style={{ fontWeight:700, fontSize:16, margin:"2px 0 0" }}>{step===0?"¿Qué servicio ofreces?":step===1?"¿Cómo cobras?":step===2?"¿Presencial o remoto?":"Tus tarifas"}</p></div>
        </div>
        <div style={{ height:3, background:T.gray5, borderRadius:2 }}>
          <div style={{ width:`${((step+1)/4)*100}%`, height:"100%", background:T.lime, borderRadius:2, transition:"width 0.3s" }}/>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px" }}>
        {step===0&&CATS2.map(c=>{
          const active=cat?.k===c.k;
          return <div key={c.k} onClick={()=>setCat(c)} style={{ display:"flex", alignItems:"center", gap:12, background:active?T.gray5:T.white, border:`1.5px solid ${active?T.black:T.border}`, borderRadius:14, padding:"12px", marginBottom:9, cursor:"pointer" }}>
            <div style={{ width:40, height:40, borderRadius:20, background:active?T.lime:T.gray5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:21 }}>{c.icon}</div>
            <span style={{ flex:1, fontWeight:700, fontSize:14, color:T.black }}>{c.l}</span>
            <div style={{ display:"flex", gap:4 }}>{c.t.map(t=><span key={t} style={{ background:T.gray5, borderRadius:6, padding:"2px 5px", fontSize:10, color:T.gray3 }}>{t==="hora"?"⏱️":t==="dia"?"📅":"✅"}</span>)}</div>
            {active&&<div style={{ width:22, height:22, borderRadius:11, background:T.black, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:T.white }}>✓</div>}
          </div>;
        })}
        {step===1&&<>
          {cat&&<div style={{ background:T.gray5, borderRadius:14, padding:"12px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}><span style={{ fontSize:21 }}>{cat.icon}</span><span style={{ fontWeight:700, fontSize:14 }}>{cat.l}</span></div>}
          <p style={{ color:T.gray2, fontSize:14, margin:"0 0 14px" }}>Selecciona <strong>una o más</strong> modalidades.</p>
          {filtered.map(t=>{
            const active=!!types[t.k];
            return <div key={t.k} onClick={()=>{setTypes(p=>({...p,[t.k]:!p[t.k]}));if(!main)setMain(t.k);}} style={{ background:active?T.gray5:T.white, border:`1.5px solid ${active?T.black:T.border}`, borderRadius:16, padding:"14px", marginBottom:11, cursor:"pointer" }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:42, height:42, borderRadius:21, background:active?T.lime:T.gray5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:21 }}>{t.icon}</div>
                <div style={{ flex:1 }}><p style={{ margin:0, fontWeight:700, fontSize:14 }}>{t.l}</p><p style={{ color:T.gray3, margin:"3px 0", fontSize:12 }}>{t.d}</p><p style={{ color:T.gray3, margin:0, fontSize:11, fontStyle:"italic" }}>Ej: {t.e}</p></div>
                <div style={{ width:22, height:22, borderRadius:6, background:active?T.black:"transparent", border:`2px solid ${active?T.black:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:T.white }}>{active?"✓":""}</div>
              </div>
              {active&&Object.values(types).filter(Boolean).length>1&&<div style={{ marginTop:10, paddingTop:10, borderTop:`0.5px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:T.gray3, fontSize:13 }}>¿Principal?</span>
                <div onClick={e=>{e.stopPropagation();setMain(t.k);}} style={{ background:main===t.k?T.black:T.gray5, borderRadius:20, padding:"4px 14px", fontSize:13, color:main===t.k?T.white:T.black, fontWeight:600, cursor:"pointer" }}>{main===t.k?"✓ Principal":"Marcar"}</div>
              </div>}
            </div>;
          })}
        </>}
        {step===2&&<>
          <p style={{ color:T.gray2, fontSize:14, margin:"0 0 18px", lineHeight:1.5 }}>¿Cómo entregas tu servicio?{remoteOnly?" (Tu servicio es compatible con trabajo remoto)":""}</p>
          {[{k:"presencial",icon:"📍",l:"Presencial",d:"Vas donde el cliente o el cliente viene donde ti"},{k:"remoto",icon:"💻",l:"Remoto",d:"Trabajas desde casa, entregas por internet"},{k:"ambos",icon:"🔄",l:"Ambos",d:"Flexible según el cliente"}].map(m=>(
            <div key={m.k} onClick={()=>setWorkMode(m.k)} style={{ display:"flex", alignItems:"center", gap:14, background:workMode===m.k?T.gray5:T.white, border:`1.5px solid ${workMode===m.k?T.black:T.border}`, borderRadius:16, padding:"16px", marginBottom:12, cursor:"pointer" }}>
              <div style={{ width:46, height:46, borderRadius:23, background:workMode===m.k?T.lime:T.gray5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{m.icon}</div>
              <div style={{ flex:1 }}><p style={{ margin:0, fontWeight:700, fontSize:15 }}>{m.l}</p><p style={{ color:T.gray3, margin:"4px 0 0", fontSize:13 }}>{m.d}</p></div>
              <div style={{ width:22, height:22, borderRadius:11, background:workMode===m.k?T.black:"transparent", border:`2px solid ${workMode===m.k?T.black:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:T.white }}>{workMode===m.k?"✓":""}</div>
            </div>
          ))}
        </>}
        {step===3&&<>
          <p style={{ color:T.gray2, fontSize:14, margin:"0 0 16px" }}>Ingresa tus tarifas. Puedes cambiarlas después.</p>
          {[{k:"hora",icon:"⏱️",l:"Por hora",u:"/hora",ph:"ej: 5.000"},{k:"dia",icon:"📅",l:"Por día",u:"/día",ph:"ej: 35.000"},{k:"trabajo",icon:"✅",l:"Por trabajo",u:"/trabajo",ph:"ej: 12.000"}].filter(t=>types[t.k]).map(t=>(
            <div key={t.k} style={{ border:`1.5px solid ${main===t.k?T.black:T.border}`, borderRadius:16, padding:"16px", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <span style={{ fontSize:21 }}>{t.icon}</span>
                <span style={{ fontWeight:700, fontSize:15, flex:1 }}>{t.l}</span>
                {main===t.k&&<span style={{ background:T.lime, borderRadius:8, padding:"1px 8px", fontSize:10, color:T.green, fontWeight:900 }}>PRINCIPAL</span>}
              </div>
              <div style={{ display:"flex", alignItems:"center", background:T.gray5, borderRadius:12, overflow:"hidden" }}>
                <span style={{ padding:"12px 14px", color:T.gray3, fontSize:17, fontWeight:700, background:T.white, borderRight:`1px solid ${T.border}` }}>$</span>
                <input type="number" placeholder={t.ph} value={prices[t.k]} onChange={e=>setPrices(p=>({...p,[t.k]:e.target.value}))} style={{ flex:1, background:"transparent", border:"none", outline:"none", color:T.black, fontSize:18, fontWeight:700, padding:"12px 14px" }}/>
                <span style={{ padding:"12px 14px", color:T.gray3, fontSize:13 }}>{t.u}</span>
              </div>
              {prices[t.k]&&<p style={{ color:T.limeD, fontSize:13, margin:"8px 0 0", fontWeight:600 }}>= {fmt(parseInt(prices[t.k])||0)} {t.u}</p>}
            </div>
          ))}
        </>}
      </div>
      <div style={{ padding:"12px 16px 16px", borderTop:`0.5px solid ${T.border}` }}>
        {step<3
          ?<button onClick={()=>{if(!canNext&&step<2)return;setStep(s=>s+1);}} style={{ width:"100%", background:(canNext||step>=2)?T.black:T.gray5, border:"none", borderRadius:14, padding:"15px", color:(canNext||step>=2)?T.white:T.gray3, fontSize:15, fontWeight:700, cursor:"pointer" }}>Continuar →</button>
          :<button onClick={()=>setS("profile")} style={{ width:"100%", background:T.lime, border:"none", borderRadius:14, padding:"15px", color:T.green, fontSize:15, fontWeight:700, cursor:"pointer" }}>✓ Crear mi perfil de trabajador</button>
        }
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [screen,  setScreen]  = useState("geo");  // starts with geo permission
  const [tab,     setTab]     = useState("feed");
  const [role,    setRole]    = useState("employer");
  const [worker,  setWorker]  = useState(null);
  const [matched, setMatched] = useState(null);
  const [matches, setMatches] = useState([]);
  const [geoGranted, setGeoGranted] = useState(false);

  function go(t) {
    setTab(t);
    const map = { feed:"feed", search:"search", jobs:"jobs", post:"feed", agenda:"agenda", profile:"profile", history:"profile" };
    setScreen(map[t]||t);
  }

  function handleGeo(granted) {
    setGeoGranted(granted);
    setScreen("roleselect");
  }

  function handleRoleSelect(r) {
    setRole(r);
    setScreen("why"); // show why screen after role select
  }

  function handleWhyContinue() {
    setScreen("feed");
    setTab("feed");
  }

  function handleRoleChange(r) {
    setRole(r);
    setScreen("feed");
    setTab("feed");
  }

  const noNavScreens = ["geo","roleselect","why","worker","match","configure","payment","confirm","verify","insignias","onboarding","createoffer"];
  const showNav = !noNavScreens.includes(screen);

  return (
    <div style={{ minHeight:"100vh", background:"#111", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'Inter',-apple-system,sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <Phone>
        {screen==="geo"         && <GeoPermissionScreen onAllow={()=>handleGeo(true)} onSkip={()=>handleGeo(false)}/>}
        {screen==="roleselect"  && <RoleSelectScreen onSelect={handleRoleSelect}/>}
        {screen==="why"         && <WhyChambaScreen onContinue={handleWhyContinue} role={role}/>}
        {screen==="feed"        && role==="employer" && <EmployerFeed go={go} setS={setScreen} setWorker={setWorker} setMatched={setMatched}/>}
        {screen==="feed"        && role==="worker"   && <WorkerFeed go={go} setS={setScreen}/>}
        {screen==="search"      && <EmployerFeed go={go} setS={setScreen} setWorker={setWorker} setMatched={setMatched}/>}
        {screen==="jobs"        && <WorkerFeed go={go} setS={setScreen}/>}
        {screen==="map"         && <MapViewScreen setS={setScreen} setWorker={setWorker} setMatched={setMatched}/>}
        {screen==="worker"      && worker && <WorkerScreen worker={worker} setS={setScreen} setMatched={setMatched}/>}
        {screen==="match"       && matched && <MatchScreen matched={matched} setS={setScreen}/>}
        {screen==="configure"   && matched && <ConfigureScreen matched={matched} setS={setScreen}/>}
        {screen==="payment"     && matched && <PaymentScreen matched={matched} setS={setScreen}/>}
        {screen==="confirm"     && matched && <ConfirmScreen matched={matched} setS={setScreen} setMatches={setMatches}/>}
        {screen==="createoffer" && <CreateOfferScreen setS={setScreen}/>}
        {screen==="agenda"      && <AgendaScreen go={go} role={role}/>}
        {screen==="profile"     && <ProfileScreen go={go} setS={setScreen} role={role} setRole={handleRoleChange} matches={matches}/>}
        {screen==="verify"      && <VerifyScreen setS={setScreen}/>}
        {screen==="insignias"   && <InsigniasScreen setS={setScreen}/>}
        {screen==="onboarding"  && <OnboardingScreen setS={setScreen}/>}
        {showNav && <BottomNav active={tab} go={go} role={role}/>}
      </Phone>
    </div>
  );
}
