import { useState, useEffect, useRef } from "react";

// -- THEME -----------------------------------------------------
const T = {
  lime:"#A8D429", limeD:"#7AAB00", limeL:"#F2FAD8",
  green:"#1E3A00", black:"#0A0A0A", dark:"#1C1C1E",
  gray1:"#2C2C2E", gray2:"#48484A", gray3:"#8E8E93",
  gray4:"#C7C7CC", gray5:"#F2F2F7", white:"#FFFFFF",
  red:"#FF3B30", blue:"#007AFF", yellow:"#FF9500",
  border:"#DBDBDB", purple:"#8B5CF6", pink:"#EC4899",
};

const IMG_OVERLAY = 'linear-gradient(to bottom,rgba(0,0,0,0.04) 0%,transparent 40%,rgba(0,0,0,0.55) 100%)';

const CAT_COLORS = {
  limpieza:{bg:"#F0FDF4",c:"#15803D"}, belleza:{bg:"#FDF4FF",c:"#9333EA"},
  mascotas:{bg:"#FEF3C7",c:"#92400E"}, jardin:{bg:"#F0FDF4",c:"#166534"},
  eventos:{bg:"#FFF7ED",c:"#C2410C"},  edicion:{bg:"#EFF6FF",c:"#1D4ED8"},
  cuidado:{bg:"#FDF4FF",c:"#DB2777"},  trans:{bg:"#F0F9FF",c:"#0369A1"},
  hogar:{bg:"#F5F3FF",c:"#7C3AED"},    default:{bg:"#F2FAD8",c:"#7AAB00"},
};

function fmt(n){ return "$"+(n||0).toLocaleString("es-CL"); }
function timeToMins(t){const[h,m]=(t||"00:00").split(":").map(Number);return h*60+m;}

// -- DATA ------------------------------------------------------
const COUNTRIES = [
  {code:"CL",flag:"🇨🇱",name:"Chile",dial:"+56"},
  {code:"CO",flag:"🇨🇴",name:"Colombia",dial:"+57"},
  {code:"PE",flag:"🇵🇪",name:"Peru",dial:"+51"},
  {code:"MX",flag:"🇲🇽",name:"Mexico",dial:"+52"},
  {code:"AR",flag:"🇦🇷",name:"Argentina",dial:"+54"},
];

const JULIA = {
  name:"Julia Morales", handle:"@juliamorales",
  avatar:"https://i.pravatar.cc/150?img=23",
  cover:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  bio:"Limpieza profesional, pinta caritas, maquillaje, cuidado de mascotas y colorimetria. Siempre con mis propias herramientas.",
  rating:4.9, reviews:87, jobs:87, followers:892, following:145,
  verified:true,
  services:[
    {id:"s1",icon:"🧹",active:true,name:"Aseo general",price:35000,cat:"limpieza",hours:3,earlyDiscount:{enabled:true,pct:10,minDays:2},desc:"Limpieza completa del hogar. Incluye cocina, bano, dormitorios y living.",myMaterials:["Aspiradora","Trapeador","Productos de limpieza","Guantes"],clientMaterials:[]},
    {id:"s2",icon:"🎨",active:true,name:"Pinta caritas",price:12000,cat:"belleza",hours:2,earlyDiscount:{enabled:false,pct:10,minDays:3},desc:"Pintacaritas para fiestas infantiles. Disenos de animales, superheroes y princesas.",myMaterials:["Pinturas hipoalergenicas","Pinceles","Esponjas"],clientMaterials:[]},
    {id:"s3",icon:"💄",active:true,name:"Maquillaje profesional",price:25000,cat:"belleza",hours:1,earlyDiscount:{enabled:true,pct:15,minDays:3},desc:"Maquillaje profesional a domicilio para eventos, graduaciones y ocasiones especiales.",myMaterials:["Kit de maquillaje profesional","Brochas","Fijadores"],clientMaterials:[]},
    {id:"s4",icon:"🐾",active:false,name:"Cuidado de mascotas",price:15000,cat:"mascotas",hours:4,earlyDiscount:{enabled:false,pct:5,minDays:1},desc:"Cuidado diurno de mascotas en tu hogar. Alimentacion, paseos y compannia.",myMaterials:[],clientMaterials:["Comida del animal","Correa","Bolsas de desechos"]},
    {id:"s5",icon:"🎨",active:true,name:"Asesoria de colorimetria",price:45000,cat:"belleza",hours:1.5,earlyDiscount:{enabled:true,pct:10,minDays:7},desc:"Asesoria personal de colorimetria. Descubre los colores que mejor te favorecen segun tu tono de piel.",myMaterials:["Muestras de telas","Guia de colores","Paleta de temporada"],clientMaterials:[]},
  ],
  highlights:[
    {id:"hl1",name:"Aseos",icon:"🧹",color:"#0EA5E9",stories:[
      {src:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",caption:"Aseo profundo depto Providencia"},
      {src:"https://images.unsplash.com/photo-1527515637462-cff94edd0e52?w=600&q=80",caption:"Antes y despues cocina"},
    ]},
    {id:"hl2",name:"Caritas",icon:"🎨",color:"#EC4899",stories:[
      {src:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",caption:"Fiesta de cumpleanos"},
    ]},
    {id:"hl3",name:"Maquillaje",icon:"💄",color:"#7C3AED",stories:[
      {src:"https://images.unsplash.com/photo-1560066984-138daaa7d285?w=600&q=80",caption:"Maquillaje de gala"},
    ]},
  ],
};

const WORKERS = [
  {id:1,name:"Ana Martinez",handle:"@anapeloquera",service:"Peluquera a domicilio",cat:"belleza",mode:"presencial",
   lat:-33.4150,lng:-70.5999,mobilFee:5000,
   schedule:{days:["lu","ma","mi","ju","vi"],from:"09:00",to:"19:00"},
   avatar:"https://i.pravatar.cc/150?img=47",
   cover:"https://images.unsplash.com/photo-1560066984-138daaa7d285?w=800&q=80",
   bio:"Peluquera profesional a domicilio. Cortes, tintes y tratamientos capilares.",
   verified:true,rating:4.9,reviews:312,jobs:312,price:15000,color:"#BE185D",
   extras:[{id:"e1",name:"Arreglo de barba",price:3000},{id:"e2",name:"Tinte raices",price:8000}],
   posts:[
     {id:"p1",src:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",likes:567,caption:"Tinte y corte a domicilio"},
     {id:"p2",src:"https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80",likes:423,caption:"Balayage Las Condes"},
     {id:"p3",src:"https://images.unsplash.com/photo-1560066984-138daaa7d285?w=600&q=80",likes:234,caption:"Peinado de novia"},
   ]},
  {id:2,name:"Carlos Mendez",handle:"@carlosjardinero",service:"Jardinero",cat:"jardin",mode:"presencial",
   lat:-33.4891,lng:-70.6991,mobilFee:3500,
   schedule:{days:["lu","ma","mi","ju","vi","sa"],from:"08:00",to:"18:00"},
   avatar:"https://i.pravatar.cc/150?img=11",
   cover:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
   bio:"Jardinero profesional con 8 anos de experiencia. Poda, diseno y mantencion.",
   verified:true,rating:4.8,reviews:134,jobs:134,price:12000,color:"#22C55E",
   extras:[{id:"e1",name:"Fertilizante premium",price:5000},{id:"e2",name:"Herramientas especiales",price:3000}],
   posts:[
     {id:"p1",src:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",likes:47,caption:"Jardin Providencia"},
     {id:"p2",src:"https://images.unsplash.com/photo-1585320806297-9794b3e4edd0?w=600&q=80",likes:34,caption:"Poda arboles frutales"},
     {id:"p3",src:"https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=600&q=80",likes:89,caption:"Diseno jardin Las Condes"},
   ]},
  {id:3,name:"Diego Saavedra",handle:"@diegoedit",service:"Editor de Video",cat:"edicion",mode:"remoto",
   lat:null,lng:null,mobilFee:0,
   schedule:{days:["lu","ma","mi","ju","vi","sa","do"],from:"00:00",to:"23:59"},
   avatar:"https://i.pravatar.cc/150?img=60",
   cover:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
   bio:"Edito videos para YouTube, Instagram y TikTok. Entrega en 24h. 100% remoto.",
   verified:true,rating:4.8,reviews:201,jobs:201,price:25000,color:"#06B6D4",
   extras:[{id:"e1",name:"Subtitulos",price:5000},{id:"e2",name:"Motion graphics",price:15000}],
   posts:[
     {id:"p1",src:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",likes:156,caption:"Edicion YouTube 8 min"},
     {id:"p2",src:"https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80",likes:89,caption:"Color grading cine"},
   ]},
  {id:4,name:"Valentina Cruz",handle:"@valeevents",service:"Iluminacion para eventos",cat:"eventos",mode:"presencial",
   lat:-33.4389,lng:-70.6503,mobilFee:8000,
   schedule:{days:["ju","vi","sa","do"],from:"10:00",to:"22:00"},
   avatar:"https://i.pravatar.cc/150?img=44",
   cover:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
   bio:"Iluminacion profesional para bodas, cumpleanos y eventos corporativos.",
   verified:true,rating:5.0,reviews:89,jobs:89,price:80000,color:"#F97316",
   extras:[{id:"e1",name:"Maquina de humo",price:20000},{id:"e2",name:"Confetti",price:8000}],
   posts:[
     {id:"p1",src:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",likes:445,caption:"Boda Vina del Mar"},
     {id:"p2",src:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",likes:312,caption:"Cumpleanos 15"},
   ]},
  {id:5,name:"Roberto Fuentes",handle:"@robermanejo",service:"Clases de manejo",cat:"trans",mode:"presencial",
   lat:-33.5200,lng:-70.7000,mobilFee:0,
   schedule:{days:["sa","do","lu","ma"],from:"09:00",to:"17:00"},
   avatar:"https://i.pravatar.cc/150?img=55",
   cover:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
   bio:"Instructor de manejo particular. A tu ritmo, en tu barrio. Auto propio con doble mando.",
   verified:true,rating:4.7,reviews:145,jobs:145,price:20000,color:"#14B8A6",
   extras:[],
   posts:[
     {id:"p1",src:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",likes:134,caption:"Clase practica Providencia"},
   ]},
  {id:6,name:"Sofia Reyes",handle:"@sofiacosturas",service:"Costuras y arreglos",cat:"hogar",mode:"presencial",
   lat:-33.4700,lng:-70.6200,mobilFee:2000,
   schedule:{days:["lu","ma","mi","ju","vi"],from:"10:00",to:"16:00"},
   avatar:"https://i.pravatar.cc/150?img=41",
   cover:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
   bio:"Arreglos, costuras y confeccion a medida. Entrego a domicilio. Rapida y prolija.",
   verified:false,rating:4.6,reviews:67,jobs:67,price:5000,color:"#8B5CF6",
   extras:[{id:"e1",name:"Confeccion a medida",price:20000}],
   posts:[
     {id:"p1",src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",likes:45,caption:"Arreglo vestido de novia"},
   ]},
];

// Enrich with distance
const USER_LAT = -33.4350;
const USER_LNG = -70.6093;
WORKERS.forEach(w => {
  if (!w.lat) { w.distKm = null; w.distLabel = "Remoto"; return; }
  const R = 6371;
  const dLat = (w.lat - USER_LAT) * Math.PI / 180;
  const dLng = (w.lng - USER_LNG) * Math.PI / 180;
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(USER_LAT*Math.PI/180)*Math.cos(w.lat*Math.PI/180)*Math.sin(dLng/2)*Math.sin(dLng/2);
  const dist = +(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1);
  w.distKm = dist;
  w.distLabel = dist < 1 ? "menos de 1 km" : dist + " km";
});

// -- SMALL COMPONENTS -----------------------------------------
function Img({ src, style={}, fallback="#eee" }) {
  const [err, setErr] = useState(false);
  if (err || !src) return (<div style={{...style, background:fallback}}/>);
  return (
    <img src={src} alt="" crossOrigin="anonymous" referrerPolicy="no-referrer"
      style={{...style, objectFit:"cover"}} onError={()=>setErr(true)}/>
  );
}

function Avatar({ src, size=40, color="#ccc" }) {
  return (
    <div style={{width:size,height:size,borderRadius:size/2,overflow:"hidden",background:color,flexShrink:0}}>
      <Img src={src} style={{width:"100%",height:"100%"}}/>
    </div>
  );
}

function Phone({ children }) {
  return (
    <div style={{width:390,height:844,background:T.white,borderRadius:54,overflow:"hidden",position:"relative",boxShadow:"0 40px 100px rgba(0,0,0,0.3)",border:"8px solid #1C1C1E",fontFamily:"'Inter',-apple-system,sans-serif"}}>
      <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:120,height:34,background:T.dark,borderRadius:20,zIndex:100}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:50,display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 28px 8px",zIndex:50,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(10px)"}}>
        <span style={{fontSize:15,fontWeight:700,color:T.black}}>9:41</span>
        <div style={{display:"flex",gap:6,alignItems:"center",color:T.black,fontSize:12}}>*** WiFi 🔋</div>
      </div>
      {children}
    </div>
  );
}

function RoleSwitch({ role, setRole }) {
  const isWorker = role === "worker";
  return (
    <div onClick={()=>setRole(isWorker?"employer":"worker")}
      style={{display:"flex",alignItems:"center",background:T.gray5,borderRadius:20,padding:3,cursor:"pointer",border:"1px solid "+T.border}}>
      <div style={{background:!isWorker?T.black:"transparent",borderRadius:18,padding:"4px 10px",display:"flex",alignItems:"center",gap:4}}>
        <span style={{fontSize:11}}>👤</span>
        <span style={{fontSize:11,fontWeight:700,color:!isWorker?T.white:T.gray3}}>Empleo</span>
      </div>
      <div style={{background:isWorker?T.lime:"transparent",borderRadius:18,padding:"4px 10px",display:"flex",alignItems:"center",gap:4}}>
        <span style={{fontSize:11}}>🔧</span>
        <span style={{fontSize:11,fontWeight:700,color:isWorker?T.green:T.gray3}}>Trabajo</span>
      </div>
    </div>
  );
}

function BottomNav({ active, go, role }) {
  const tabs = role === "worker"
    ? [{id:"feed",icon:"💼",label:"Ofertas"},{id:"search",icon:"🗺",label:"Explorar"},{id:"post",icon:"＋",label:"Publicar"},{id:"agenda",icon:"📅",label:"Agenda"},{id:"profile",icon:"👤",label:"Perfil"}]
    : [{id:"feed",icon:"🏠",label:"Inicio"},{id:"search",icon:"🗺",label:"Explorar"},{id:"post",icon:"＋",label:"Publicar"},{id:"agenda",icon:"📅",label:"Agenda"},{id:"profile",icon:"👤",label:"Perfil"}];
  return (
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:78,background:role==="worker"?"rgba(240,253,244,0.97)":"rgba(10,22,40,0.97)",backdropFilter:"blur(20px)",borderTop:"0.5px solid "+(role==="worker"?T.limeD:"rgba(255,255,255,0.1)"),display:"flex",alignItems:"flex-start",justifyContent:"space-around",paddingTop:10,zIndex:50}}>
      {tabs.map(t=>(
        <div key={t.id} onClick={()=>go(t.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"4px 8px"}}>
          <div style={{width:42,height:42,borderRadius:t.id==="post"?21:12,background:t.id==="post"?T.lime:active===t.id?(role==="worker"?T.limeL:"rgba(168,212,41,0.15)"):"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:t.id==="post"?22:20}}>
            <span style={{opacity:active===t.id||t.id==="post"?1:role==="worker"?0.45:0.35}}>{t.icon}</span>
          </div>
          <span style={{fontSize:9,fontWeight:700,color:active===t.id?T.limeD:role==="worker"?T.gray2:"rgba(255,255,255,0.4)"}}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// -- SPLASH ---------------------------------------------------
function SplashScreen({ onDone }) {
  useEffect(()=>{ const t=setTimeout(()=>onDone(),2200); return()=>clearTimeout(t); },[]);
  return (
    <div style={{position:"absolute",inset:0,background:T.green,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:80,height:80,borderRadius:24,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,marginBottom:16}}>
        ⚡
      </div>
      <div style={{fontSize:38,fontWeight:900,color:T.lime,letterSpacing:-1}}>chamba</div>
      <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginTop:8}}>La red social del trabajo</div>
    </div>
  );
}

// -- LOGIN ----------------------------------------------------
function LoginScreen({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(null);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [showDrop, setShowDrop] = useState(false);
  const isReg = tab === "register";
  function go(m){ setLoading(m); setTimeout(()=>{ setLoading(null); onLogin(); },1600); }
  return (
    <div style={{position:"absolute",inset:0,background:T.white,display:"flex",flexDirection:"column"}}>
      <div style={{background:T.green,padding:"44px 24px 24px",textAlign:"center",position:"relative"}}>
        <div style={{fontSize:32,fontWeight:900,color:T.lime,marginBottom:4}}>⚡ chamba</div>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:12,margin:"0 0 16px"}}>La red social del trabajo</p>
        <div onClick={()=>setShowDrop(d=>!d)} style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:24,padding:"7px 16px",cursor:"pointer"}}>
          <span style={{fontSize:16}}>{country.flag}</span>
          <span style={{color:"#fff",fontSize:13,fontWeight:600}}>{country.name}</span>
          <span style={{color:"rgba(255,255,255,0.45)",fontSize:12}}>{country.dial}</span>
          <span style={{color:T.lime,fontSize:10}}>{showDrop?"^":"v"}</span>
        </div>
        {showDrop && (
          <div style={{position:"absolute",top:"100%",left:16,right:16,background:"#fff",borderRadius:14,boxShadow:"0 12px 40px rgba(0,0,0,0.15)",zIndex:50,overflow:"hidden",maxHeight:220,overflowY:"auto"}}>
            {COUNTRIES.map(co=>(
              <div key={co.code} onClick={()=>{setCountry(co);setShowDrop(false);}} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 16px",cursor:"pointer",background:co.code===country.code?T.limeL:"#fff",borderBottom:"0.5px solid "+T.border}}>
                <span style={{fontSize:20}}>{co.flag}</span>
                <span style={{flex:1,fontWeight:600,fontSize:13}}>{co.name}</span>
                <span style={{color:T.gray3,fontSize:12}}>{co.dial}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{display:"flex",borderBottom:"1px solid "+T.border}}>
        {[["login","Iniciar sesion"],["register","Registrarse"]].map(([k,l])=>(
          <div key={k} onClick={()=>setTab(k)} style={{flex:1,textAlign:"center",padding:"13px",cursor:"pointer",fontSize:14,fontWeight:700,color:tab===k?T.green:T.gray3,borderBottom:tab===k?"2.5px solid "+T.lime:"2.5px solid transparent"}}>
            {l}
          </div>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 18px 28px"}}>
        {isReg && (
          <div style={{marginBottom:14}}>
            <label style={{fontSize:11,fontWeight:700,color:T.gray3,display:"block",marginBottom:6,textTransform:"uppercase"}}>Tu nombre</label>
            <input placeholder="Ej: Julia Morales" style={{width:"100%",padding:"13px 14px",border:"1.5px solid "+T.border,borderRadius:12,fontSize:15,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
          </div>
        )}
        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,fontWeight:700,color:T.gray3,display:"block",marginBottom:6,textTransform:"uppercase"}}>Telefono</label>
          <div style={{display:"flex",border:"1.5px solid "+(phone?T.black:T.border),borderRadius:12,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,padding:"13px 12px",background:T.gray5,borderRight:"1px solid "+T.border,cursor:"pointer"}} onClick={()=>setShowDrop(d=>!d)}>
              <span style={{fontSize:16}}>{country.flag}</span>
              <span style={{fontWeight:700,fontSize:14}}>{country.dial}</span>
            </div>
            <input value={phone} onChange={e=>setPhone(e.target.value.replace(/[^0-9]/g,""))} placeholder="9 1234 5678" type="tel" style={{flex:1,padding:"13px 14px",border:"none",outline:"none",fontSize:15,fontFamily:"inherit"}}/>
          </div>
        </div>
        <button onClick={()=>go("phone")} disabled={phone.length < 8 || !!loading} style={{width:"100%",background:phone.length >= 8 && !loading?T.lime:T.gray5,border:"none",borderRadius:12,padding:"15px",fontSize:15,fontWeight:800,marginBottom:20,color:phone.length >= 8 && !loading?T.green:T.gray3,cursor:"pointer"}}>
          {loading==="phone"?"Enviando...":isReg?"Crear cuenta":"Enviar codigo SMS"}
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{flex:1,height:1,background:T.border}}/>
          <span style={{color:T.gray3,fontSize:12}}>o continua con</span>
          <div style={{flex:1,height:1,background:T.border}}/>
        </div>
        {[{id:"google",bg:"#fff",border:"1.5px solid "+T.border,tc:T.black,icon:"G",label:isReg?"Registrarse con Google":"Continuar con Google"},
          {id:"apple",bg:"#111",border:"none",tc:"#fff",icon:"🍎",label:isReg?"Registrarse con Apple":"Continuar con Apple"},
          {id:"whatsapp",bg:"#25D366",border:"none",tc:"#fff",icon:"💬",label:isReg?"Registrarse con WhatsApp":"Continuar con WhatsApp"}
        ].map(s=>(
          <button key={s.id} onClick={()=>go(s.id)} disabled={!!loading} style={{display:"flex",alignItems:"center",gap:12,background:s.bg,border:s.border,borderRadius:12,padding:"13px 16px",cursor:"pointer",width:"100%",marginBottom:10,fontSize:14,fontWeight:600,color:s.tc,opacity:loading&&loading!==s.id?0.5:1}}>
            <span style={{fontSize:16,width:20,textAlign:"center"}}>{s.icon}</span>
            <span style={{flex:1,textAlign:"left"}}>{loading===s.id?"Conectando...":s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// -- WORKER FEED CARD -----------------------------------------
function WorkerFeedCard({ w, setWorker, setMatched, setS, liked, onLike }) {
  const now = 10 * 60;
  const avail = w.schedule && timeToMins(w.schedule.from) <= now && timeToMins(w.schedule.to) >= now;
  return (
    <div style={{marginBottom:1,background:"#fff",borderBottom:"0.5px solid "+T.border}}>
      <div style={{display:"flex",alignItems:"center",padding:"10px 14px",gap:10}}>
        <div style={{cursor:"pointer"}} onClick={()=>{setWorker(w);setS("worker");}}>
          <div style={{width:38,height:38,borderRadius:19,overflow:"hidden",border:"2px solid "+w.color}}>
            <Img src={w.avatar} style={{width:"100%",height:"100%"}}/>
          </div>
        </div>
        <div style={{flex:1,minWidth:0,cursor:"pointer"}} onClick={()=>{setWorker(w);setS("worker");}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:14,fontWeight:700}}>{w.name}</span>
            {w.verified && <span style={{fontSize:11}}>✅</span>}
          </div>
          <span style={{fontSize:12,color:T.gray3}}>{w.service}{w.distKm!=null?"  -  📍 "+w.distLabel:""}</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5,flexShrink:0}}>
          <button onClick={()=>{setMatched(w);setS("configure");}} style={{background:T.lime,border:"none",borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:700,color:T.green,cursor:"pointer"}}>Contratar</button>
          <button onClick={()=>{setMatched(w);setS("chat");}} style={{background:T.gray5,border:"1px solid "+T.border,borderRadius:20,padding:"5px 0",fontSize:12,color:T.gray2,cursor:"pointer",textAlign:"center"}}>💬 Chat</button>
        </div>
      </div>
      <div style={{position:"relative",width:"100%",paddingBottom:"75%",background:w.color,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0}}>
          <Img src={w.cover} style={{width:"100%",height:"100%"}} fallback={w.color}/>
        </div>
        <div style={{position:"absolute",inset:0,background:IMG_OVERLAY}}/>
        {/* Top row: rating left, verified right */}
        <div style={{position:"absolute",top:10,left:10,right:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)",borderRadius:20,padding:"5px 10px",display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:12}}>⭐</span>
            <span style={{color:"#fff",fontWeight:800,fontSize:13}}>{w.rating}</span>
            <span style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>({w.reviews})</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
            {w.verified && (
              <div style={{background:T.lime,borderRadius:20,padding:"4px 10px"}}>
                <span style={{color:T.green,fontSize:11,fontWeight:700}}>✅ Verificado</span>
              </div>
            )}
            {avail && (
              <div style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(8px)",borderRadius:20,padding:"4px 10px",display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:7,height:7,borderRadius:4,background:"#4ADE80"}}/>
                <span style={{color:"#fff",fontSize:11,fontWeight:600}}>Disponible ahora</span>
              </div>
            )}
          </div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div>
            <p style={{color:"#fff",fontWeight:800,fontSize:16,margin:"0 0 4px",textShadow:"0 1px 4px rgba(0,0,0,0.5)"}}>{w.service}</p>
            <span style={{background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:11,borderRadius:10,padding:"2px 8px"}}>{w.mode==="presencial"?"📍 Presencial":"💻 Remoto"}</span>
          </div>
          <div style={{background:"rgba(0,0,0,0.8)",backdropFilter:"blur(8px)",borderRadius:16,padding:"8px 14px",textAlign:"right"}}>
            <p style={{color:T.lime,fontWeight:900,fontSize:18,margin:0,lineHeight:1}}>{fmt(w.price)}</p>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:10,margin:"2px 0 0"}}>/trabajo</p>
          </div>
        </div>
      </div>
      {w.posts && w.posts.length > 0 && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1.5}}>
          {w.posts.slice(0,3).map((p,i)=>(
            <div key={i} style={{position:"relative",paddingBottom:"100%",background:w.color,overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0}}>
                <Img src={p.src} style={{width:"100%",height:"100%"}} fallback={w.color}/>
              </div>
              <div style={{position:"absolute",bottom:4,left:5,display:"flex",alignItems:"center",gap:3}}>
                <span style={{fontSize:10}}>❤️</span>
                <span style={{color:"#fff",fontSize:10,fontWeight:700,textShadow:"0 1px 3px rgba(0,0,0,0.8)"}}>{p.likes}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{padding:"10px 14px 14px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div style={{display:"flex",gap:14}}>
            <span onClick={onLike} style={{cursor:"pointer",fontSize:24}}>{liked?"❤":"🤍"}</span>
            <span style={{cursor:"pointer",fontSize:22}}>💬</span>
            <span style={{cursor:"pointer",fontSize:22}}>➤</span>
          </div>
          <span style={{cursor:"pointer",fontSize:22}}>🔖</span>
        </div>
        <p style={{fontSize:13,margin:"0 0 4px",fontWeight:700}}>{w.name} <span style={{fontWeight:400,color:T.dark}}>{(w.bio||"").slice(0,70)}...</span></p>
        {w.schedule && (
          <p style={{fontSize:11,color:T.gray3,margin:0}}>
            🕐 {w.schedule.from}-{w.schedule.to}
            {w.mobilFee > 0 ? "  -  🚗 +" + fmt(w.mobilFee) : ""}
          </p>
        )}
      </div>
    </div>
  );
}

// -- HOME SCREEN -----------------------------------------------
function HomeScreen({ go, setS, setWorker, setMatched, role, setRole, matches }) {
  const [viewMode, setViewMode] = useState("feed");
  const [liked, setLiked] = useState({});
  const ACTIVE = [
    {id:1,worker:"Ana Martinez",service:"Peluquera a domicilio",status:"en_camino",time:"Hoy 15:30",price:15000,avatar:"https://i.pravatar.cc/150?img=47",color:"#BE185D"},
    {id:2,worker:"Carlos Mendez",service:"Jardinero",status:"programado",time:"Vie 31 09:00",price:12000,avatar:"https://i.pravatar.cc/150?img=11",color:"#22C55E"},
  ];
  const STS = {
    en_camino:{l:"En camino 🚗",bg:"#FEF3C7",c:"#92400E"},
    programado:{l:"Programado 📅",bg:"#EFF6FF",c:"#1D4ED8"},
  };
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:78,overflowY:"auto",background:viewMode==="feed"?T.white:T.gray5}}>
      <div style={{position:"sticky",top:0,background:role==="employer"?"rgba(30,58,0,0.97)":"rgba(255,255,255,0.97)",backdropFilter:"blur(10px)",zIndex:20,borderBottom:"0.5px solid "+(role==="employer"?"#2D5A00":T.border),padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20,fontWeight:900,letterSpacing:-0.5,color:role==="employer"?T.lime:T.black}}>chamba</span>
          <RoleSwitch role={role} setRole={setRole}/>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{display:"flex",background:role==="employer"?"rgba(255,255,255,0.1)":T.gray5,borderRadius:20,padding:3,gap:2}}>
            {[{k:"feed",icon:"+"},{k:"dashboard",icon:"-"}].map(({k,icon})=>(
              <div key={k} onClick={()=>setViewMode(k)} style={{background:viewMode===k?T.lime:"transparent",borderRadius:18,padding:"5px 10px",cursor:"pointer"}}>
                <span style={{fontSize:14,color:viewMode===k?T.green:role==="employer"?"rgba(255,255,255,0.5)":T.gray3}}>{icon}</span>
              </div>
            ))}
          </div>
          <span onClick={()=>setS("notif")} style={{fontSize:22,cursor:"pointer",color:role==="employer"?T.lime:T.black}}>🔔</span>
        </div>
      </div>

      {viewMode === "feed" && (
        <div>
          <div style={{background:T.white,borderBottom:"0.5px solid "+T.border,padding:"10px 14px",display:"flex",gap:14,overflowX:"auto"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0}}>
              <div style={{width:62,height:62,borderRadius:31,overflow:"hidden",border:"2.5px solid "+T.lime,position:"relative"}}>
                <Img src={JULIA.avatar} style={{width:"100%",height:"100%"}}/>
                <div style={{position:"absolute",bottom:0,right:0,width:20,height:20,borderRadius:10,background:T.blue,border:"2px solid "+T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:T.white,fontWeight:800}}>+</div>
              </div>
              <span style={{fontSize:10,color:T.black}}>Tu story</span>
            </div>
            {WORKERS.map(w=>(
              <div key={w.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0,cursor:"pointer"}} onClick={()=>{setWorker(w);setS("worker");}}>
                <div style={{width:62,height:62,borderRadius:31,padding:2.5,background:"linear-gradient(135deg,"+w.color+","+w.color+"88)"}}>
                  <div style={{width:"100%",height:"100%",borderRadius:28,overflow:"hidden",border:"2px solid "+T.white}}>
                    <Img src={w.avatar} style={{width:"100%",height:"100%"}}/>
                  </div>
                </div>
                <span style={{fontSize:10,color:T.black,maxWidth:64,textAlign:"center",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{w.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
          {WORKERS.map(w=>(
            <WorkerFeedCard key={w.id} w={w} setWorker={setWorker} setMatched={setMatched} setS={setS} liked={liked[w.id]} onLike={()=>setLiked(p=>({...p,[w.id]:!p[w.id]}))}/>
          ))}
        </div>
      )}

      {viewMode === "dashboard" && (
        <div>
          <div style={{background:T.green,padding:"20px 16px 24px"}}>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:12,margin:"0 0 4px"}}>Buenos dias 👋</p>
            <p style={{color:T.lime,fontSize:22,fontWeight:800,margin:"0 0 16px",letterSpacing:-0.5}}>Julia Morales</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              {[{icon:"🔧",n:(matches||[]).length||2,l:"Activas"},{icon:"⭐",n:"4.9",l:"Rating"},{icon:"💰",n:"$47k",l:"Wallet"}].map((s,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.1)",borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
                  <div style={{fontSize:18,marginBottom:4}}>{s.icon}</div>
                  <div style={{color:T.lime,fontWeight:900,fontSize:18,lineHeight:1}}>{s.n}</div>
                  <div style={{color:"rgba(255,255,255,0.45)",fontSize:10,marginTop:3}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:T.white,margin:"8px 0",padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontWeight:800,fontSize:15}}>💳 Chamba Wallet</span>
              <span style={{background:T.limeL,color:T.limeD,fontSize:11,fontWeight:700,borderRadius:20,padding:"3px 10px"}}>Activa</span>
            </div>
            <div style={{background:"linear-gradient(135deg,"+T.green+",#2D5A00)",borderRadius:16,padding:"16px",marginBottom:12}}>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,margin:"0 0 4px"}}>Saldo disponible</p>
              <p style={{color:T.lime,fontWeight:900,fontSize:30,margin:"0 0 14px",letterSpacing:-1}}>$47.500</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                <div style={{flex:1,marginRight:12}}>
                  <p style={{color:"rgba(255,255,255,0.4)",fontSize:10,margin:"0 0 4px"}}>Presupuesto mensual</p>
                  <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,0.15)",overflow:"hidden"}}>
                    <div style={{width:"63%",height:"100%",borderRadius:3,background:T.lime}}/>
                  </div>
                </div>
                <span style={{color:"rgba(255,255,255,0.7)",fontSize:11,fontWeight:700,flexShrink:0}}>$47.5k / $75k</span>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <button style={{background:T.lime,border:"none",borderRadius:12,padding:"11px",fontSize:13,fontWeight:700,color:T.green,cursor:"pointer"}}>+ Cargar saldo</button>
              <button style={{background:T.gray5,border:"none",borderRadius:12,padding:"11px",fontSize:13,fontWeight:600,color:T.dark,cursor:"pointer"}}>Ver historial</button>
            </div>
            <div style={{background:"#EFF6FF",borderRadius:10,padding:"10px 12px",display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{fontSize:16,flexShrink:0}}>💡</span>
              <p style={{fontSize:11,color:"#3B82F6",margin:0,lineHeight:1.4}}>Limite mensual $75.000 activo para evitar gastos impulsivos. Ajustalo en configuracion.</p>
            </div>
          </div>

          <div style={{background:T.white,margin:"8px 0",padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontWeight:800,fontSize:15}}>📊 Gastos este mes</span>
              <span style={{color:T.gray3,fontSize:12}}>Mayo 2026</span>
            </div>
            {[{cat:"Limpieza",icon:"🧹",spent:35000,total:40000,color:"#15803D"},{cat:"Belleza",icon:"💄",spent:12500,total:20000,color:"#9333EA"},{cat:"Jardin",icon:"🌿",spent:0,total:15000,color:"#166534"}].map((g,i)=>(
              <div key={i} style={{marginBottom:i < 2?12:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:14}}>{g.icon}</span>
                    <span style={{fontSize:13,fontWeight:600}}>{g.cat}</span>
                  </div>
                  <span style={{fontSize:12,color:T.gray3}}>{fmt(g.spent)} / {fmt(g.total)}</span>
                </div>
                <div style={{height:6,borderRadius:3,background:T.gray5,overflow:"hidden"}}>
                  <div style={{width:g.total>0?(g.spent/g.total*100)+"%":"0%",height:"100%",borderRadius:3,background:g.color}}/>
                </div>
              </div>
            ))}
          </div>

          <div style={{background:T.white,margin:"8px 0",padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontWeight:800,fontSize:15}}>🔧 Chambas activas</span>
              <span onClick={()=>go("agenda")} style={{color:T.limeD,fontSize:12,fontWeight:600,cursor:"pointer"}}>Ver agenda</span>
            </div>
            {ACTIVE.map((ch,i)=>(
              <div key={ch.id} style={{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:arr_len_gt(i,ACTIVE.length-1)?"none":"0.5px solid "+T.border}}>
                <div style={{width:46,height:46,borderRadius:23,overflow:"hidden",border:"2px solid "+ch.color+"44",flexShrink:0}}>
                  <Img src={ch.avatar} style={{width:"100%",height:"100%"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontWeight:700,fontSize:14}}>{ch.worker}</span>
                    <span style={{fontWeight:800,color:T.limeD,fontSize:13}}>{fmt(ch.price)}</span>
                  </div>
                  <span style={{color:T.gray3,fontSize:12}}>{ch.service}</span>
                  <div style={{display:"flex",gap:8,marginTop:4}}>
                    <span style={{background:STS[ch.status].bg,color:STS[ch.status].c,fontSize:10,fontWeight:700,borderRadius:10,padding:"2px 8px"}}>{STS[ch.status].l}</span>
                    <span style={{color:T.gray3,fontSize:11}}>{ch.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={()=>go("search")} style={{width:"100%",marginTop:12,background:T.lime,border:"none",borderRadius:12,padding:"11px",fontSize:13,fontWeight:700,color:T.green,cursor:"pointer"}}>
              + Contratar nuevo trabajador
            </button>
          </div>

          <div style={{background:T.white,margin:"8px 0 0",padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontWeight:800,fontSize:15}}>Tu red de trabajadores</span>
              <span style={{color:T.limeD,fontSize:12,fontWeight:600,cursor:"pointer"}}>Ver todos</span>
            </div>
            <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4}}>
              {WORKERS.map(w=>(
                <div key={w.id} onClick={()=>{setWorker(w);setS("worker");}} style={{flexShrink:0,textAlign:"center",cursor:"pointer",width:70}}>
                  <div style={{width:58,height:58,borderRadius:29,overflow:"hidden",border:"2.5px solid "+w.color,margin:"0 auto 4px"}}>
                    <Img src={w.avatar} style={{width:"100%",height:"100%"}}/>
                  </div>
                  <p style={{fontSize:11,fontWeight:600,margin:"0 0 1px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{w.name.split(" ")[0]}</p>
                  <p style={{fontSize:10,color:T.gray3,margin:"0 0 1px"}}>⭐{w.rating}</p>
                  <p style={{fontSize:10,color:T.limeD,fontWeight:700,margin:0}}>{fmt(w.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function arr_len_gt(i, len) { return i >= len; }

// -- EXPLORE SCREEN --------------------------------------------
function ExploreScreen({ setS, setWorker, setMatched, role, setRole }) {
  const [selected, setSelected] = useState(null);
  const [radiusKm, setRadiusKm] = useState(10);
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("map");
  const [liked, setLiked] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [filterMode, setFilterMode] = useState(null);        // "presencial" | "remoto" | null
  const [filterAvail, setFilterAvail] = useState(null);      // "ahora" | "hoy" | "semana" | null
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterMinRating, setFilterMinRating] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(100000);
  const [filterDay, setFilterDay] = useState(null);

  const DAYS_SHORT = ["Lu","Ma","Mi","Ju","Vi","Sa","Do"];
  const DAYS_FULL  = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];

  const activeFilterCount = [filterMode, filterAvail, filterVerified||null, filterMinRating>0||null, filterMaxPrice<100000||null, filterDay].filter(Boolean).length;

  function resetFilters() {
    setFilterMode(null); setFilterAvail(null); setFilterVerified(false);
    setFilterMinRating(0); setFilterMaxPrice(100000); setFilterDay(null);
    setActiveCat(null); setRadiusKm(10);
  }

  function applyFilters(w) {
    if (activeCat && w.cat !== activeCat) return false;
    if (filterMode && w.mode !== filterMode) return false;
    if (filterVerified && !w.verified) return false;
    if (filterMinRating > 0 && w.rating < filterMinRating) return false;
    if (filterMaxPrice < 100000 && w.price > filterMaxPrice) return false;
    if (filterDay && w.schedule) {
      const dayMap = {Lu:"lu",Ma:"ma",Mi:"mi",Ju:"ju",Vi:"vi",Sa:"sa",Do:"do"};
      if (!w.schedule.days.includes(dayMap[filterDay])) return false;
    }
    if (filterAvail === "ahora") {
      const now = 10*60;
      if (!w.schedule || timeToMins(w.schedule.from) > now || timeToMins(w.schedule.to) < now) return false;
    }
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.service.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }

  const PINS = [
    {w:WORKERS[0],x:"28%",y:"40%"},{w:WORKERS[1],x:"62%",y:"22%"},
    {w:WORKERS[2],x:"18%",y:"60%"},{w:WORKERS[3],x:"72%",y:"52%"},
    {w:WORKERS[4],x:"45%",y:"70%"},{w:WORKERS[5],x:"55%",y:"32%"},
  ];

  const nearby   = WORKERS.filter(w => w.distKm!=null && w.distKm<=radiusKm && applyFilters(w));
  const filtered = WORKERS.filter(w => applyFilters(w));

  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:78,display:"flex",flexDirection:"column",background:T.white}}>
      {/* Header */}
      <div style={{background:"rgba(255,255,255,0.97)",backdropFilter:"blur(10px)",zIndex:20,borderBottom:"0.5px solid "+T.border,padding:"10px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:20,fontWeight:900,letterSpacing:-0.5}}>chamba</span>
            <RoleSwitch role={role} setRole={setRole}/>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{display:"flex",background:T.gray5,borderRadius:20,padding:3,gap:2}}>
              {[{k:"map",icon:"🗺"},{k:"feed",icon:"+"}].map(({k,icon})=>(
                <div key={k} onClick={()=>setViewMode(k)} style={{background:viewMode===k?T.black:"transparent",borderRadius:18,padding:"5px 10px",cursor:"pointer"}}>
                  <span style={{fontSize:14,color:viewMode===k?T.white:T.gray3}}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search bar + filter button */}
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{flex:1,display:"flex",alignItems:"center",gap:8,background:T.gray5,borderRadius:12,padding:"10px 14px"}}>
            <span style={{fontSize:15,color:T.gray3}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Buscar servicio o trabajador..."
              style={{flex:1,background:"none",border:"none",outline:"none",fontSize:14}}/>
            {search && <span onClick={()=>setSearch("")} style={{color:T.gray3,cursor:"pointer",fontSize:14}}>x</span>}
          </div>
          <div onClick={()=>setShowFilters(f=>!f)}
            style={{position:"relative",background:showFilters||activeFilterCount>0?T.black:T.gray5,borderRadius:12,padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            <span style={{fontSize:16,color:showFilters||activeFilterCount>0?T.white:T.gray2}}>⚙</span>
            {activeFilterCount > 0 && (
              <div style={{position:"absolute",top:-6,right:-6,width:18,height:18,borderRadius:9,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:10,fontWeight:900,color:T.green}}>{activeFilterCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div style={{background:T.white,borderBottom:"1px solid "+T.border,padding:"14px 16px",zIndex:15,overflowY:"auto",maxHeight:360}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <span style={{fontWeight:800,fontSize:15}}>Filtros</span>
            <div style={{display:"flex",gap:10}}>
              {activeFilterCount > 0 && <span onClick={resetFilters} style={{color:T.red,fontSize:13,fontWeight:600,cursor:"pointer"}}>Limpiar todo</span>}
              <span onClick={()=>setShowFilters(false)} style={{color:T.gray3,fontSize:13,cursor:"pointer"}}>Cerrar</span>
            </div>
          </div>

          {/* Categoria */}
          <p style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",margin:"0 0 8px"}}>Categoria</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
            {[{id:null,label:"Todas",icon:"✦"},
              {id:"limpieza",label:"Limpieza",icon:"🧹"},
              {id:"belleza",label:"Belleza",icon:"💄"},
              {id:"jardin",label:"Jardin",icon:"🌿"},
              {id:"mascotas",label:"Mascotas",icon:"🐾"},
              {id:"edicion",label:"Edicion",icon:"🎬"},
              {id:"eventos",label:"Eventos",icon:"🎉"},
              {id:"trans",label:"Transporte",icon:"🚗"},
              {id:"hogar",label:"Hogar",icon:"🏠"},
            ].map(cat=>(
              <div key={cat.id||"all"} onClick={()=>setActiveCat(activeCat===cat.id?null:cat.id)}
                style={{background:activeCat===cat.id?T.lime:T.gray5,borderRadius:20,padding:"6px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:13}}>{cat.icon}</span>
                <span style={{color:activeCat===cat.id?T.green:T.gray2,fontSize:12,fontWeight:600}}>{cat.label}</span>
              </div>
            ))}
          </div>

          {/* Disponibilidad */}
          <p style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",margin:"0 0 8px"}}>Disponibilidad</p>
          <div style={{display:"flex",gap:6,marginBottom:12}}>
            {[{k:"ahora",label:"Ahora mismo",icon:"🟢"},{k:"hoy",label:"Hoy",icon:"📅"},{k:"semana",label:"Esta semana",icon:"🗓"}].map(a=>(
              <div key={a.k} onClick={()=>setFilterAvail(filterAvail===a.k?null:a.k)}
                style={{flex:1,background:filterAvail===a.k?T.limeL:T.gray5,border:"1.5px solid "+(filterAvail===a.k?T.lime:T.border),borderRadius:10,padding:"8px 6px",cursor:"pointer",textAlign:"center"}}>
                <div style={{fontSize:16,marginBottom:2}}>{a.icon}</div>
                <span style={{fontSize:11,fontWeight:700,color:filterAvail===a.k?T.green:T.gray2}}>{a.label}</span>
              </div>
            ))}
          </div>

          {/* Dia de la semana */}
          <p style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",margin:"0 0 8px"}}>Dia de la semana</p>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {DAYS_SHORT.map((d,i)=>(
              <div key={d} onClick={()=>setFilterDay(filterDay===d?null:d)}
                style={{flex:1,background:filterDay===d?T.black:T.gray5,borderRadius:10,padding:"8px 4px",cursor:"pointer",textAlign:"center"}}>
                <span style={{fontSize:12,fontWeight:700,color:filterDay===d?T.white:T.gray2}}>{d}</span>
              </div>
            ))}
          </div>

          {/* Modo */}
          <p style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",margin:"0 0 8px"}}>Modalidad</p>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            {[{k:"presencial",label:"📍 Presencial"},{k:"remoto",label:"💻 Remoto"}].map(m=>(
              <div key={m.k} onClick={()=>setFilterMode(filterMode===m.k?null:m.k)}
                style={{flex:1,background:filterMode===m.k?T.black:T.gray5,border:"1.5px solid "+(filterMode===m.k?T.black:T.border),borderRadius:12,padding:"10px",cursor:"pointer",textAlign:"center"}}>
                <span style={{fontSize:13,fontWeight:700,color:filterMode===m.k?T.white:T.gray2}}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Precio maximo */}
          <p style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",margin:"0 0 8px"}}>Precio maximo por trabajo</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
            {[15000,25000,40000,60000,100000].map(p=>(
              <div key={p} onClick={()=>setFilterMaxPrice(p)}
                style={{background:filterMaxPrice===p?T.lime:T.gray5,borderRadius:20,padding:"6px 12px",cursor:"pointer"}}>
                <span style={{fontSize:12,fontWeight:700,color:filterMaxPrice===p?T.green:T.gray2}}>{p===100000?"Sin limite":fmt(p)}</span>
              </div>
            ))}
          </div>

          {/* Rating minimo */}
          <p style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",margin:"0 0 8px"}}>Rating minimo</p>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {[0,4.0,4.5,4.8,5.0].map(r=>(
              <div key={r} onClick={()=>setFilterMinRating(r)}
                style={{flex:1,background:filterMinRating===r?T.lime:T.gray5,borderRadius:10,padding:"8px 4px",cursor:"pointer",textAlign:"center"}}>
                <span style={{fontSize:12,fontWeight:700,color:filterMinRating===r?T.green:T.gray2}}>{r===0?"Todos":r+"+"}</span>
              </div>
            ))}
          </div>

          {/* Verificados */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div>
              <p style={{fontWeight:700,fontSize:14,margin:"0 0 2px"}}>Solo verificados ✅</p>
              <p style={{color:T.gray3,fontSize:12,margin:0}}>Identidad confirmada por Chamba</p>
            </div>
            <div onClick={()=>setFilterVerified(v=>!v)}
              style={{width:48,height:28,borderRadius:14,background:filterVerified?T.lime:T.gray4,cursor:"pointer",position:"relative",transition:"all 0.2s"}}>
              <div style={{position:"absolute",top:3,left:filterVerified?24:3,width:22,height:22,borderRadius:11,background:T.white,boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"all 0.2s"}}/>
            </div>
          </div>

          <button onClick={()=>setShowFilters(false)}
            style={{width:"100%",background:T.black,border:"none",borderRadius:14,padding:"14px",fontSize:15,fontWeight:800,color:T.white,cursor:"pointer"}}>
            Ver {filtered.length} trabajadores
          </button>
        </div>
      )}

      {/* Category quick pills (when filters hidden) */}
      {!showFilters && (
        <div style={{background:T.white,borderBottom:"0.5px solid "+T.border,padding:"8px 14px",display:"flex",gap:8,overflowX:"auto"}}>
          {[{id:null,label:"Todo",icon:"✦"},
            {id:"limpieza",label:"Limpieza",icon:"🧹"},
            {id:"belleza",label:"Belleza",icon:"💄"},
            {id:"jardin",label:"Jardin",icon:"🌿"},
            {id:"mascotas",label:"Mascotas",icon:"🐾"},
            {id:"edicion",label:"Edicion",icon:"🎬"},
            {id:"trans",label:"Transporte",icon:"🚗"},
          ].map(cat=>(
            <div key={cat.id||"all"} onClick={()=>setActiveCat(activeCat===cat.id?null:cat.id)}
              style={{flexShrink:0,background:activeCat===cat.id?T.lime:T.gray5,borderRadius:20,padding:"6px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
              <span style={{fontSize:12}}>{cat.icon}</span>
              <span style={{color:activeCat===cat.id?T.green:T.gray2,fontSize:12,fontWeight:600}}>{cat.label}</span>
            </div>
          ))}
        </div>
      )}

      {viewMode === "map" && (
        <div style={{flex:1,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <div style={{flex:1,position:"relative",background:"#E8F0DF",overflow:"hidden"}}>
            {[25,48,68].map(p=>(<div key={p} style={{position:"absolute",top:p+"%",left:0,right:0,height:p===48?3:1.5,background:"rgba(255,255,255,"+(p===48?0.8:0.4)+")"}}/>))}
            {[32,52,72].map(p=>(<div key={p} style={{position:"absolute",left:p+"%",top:0,bottom:0,width:p===52?3:1.5,background:"rgba(255,255,255,"+(p===52?0.8:0.4)+")"}}/>))}
            <div style={{position:"absolute",left:"50%",top:"48%",transform:"translate(-50%,-50%)",zIndex:5}}>
              <div style={{width:16,height:16,borderRadius:8,background:"#3B82F6",border:"3px solid white",boxShadow:"0 2px 8px rgba(0,0,0,0.3)"}}/>
              <div style={{position:"absolute",inset:-14,borderRadius:22,background:"rgba(59,130,246,0.12)"}}/>
            </div>
            {PINS.map(({w,x,y})=>{
              if (activeCat && w.cat !== activeCat) return null;
              const isSel = selected && selected.id === w.id;
              return (
                <div key={w.id} onClick={()=>setSelected(isSel?null:w)} style={{position:"absolute",left:x,top:y,transform:"translate(-50%,-100%)",zIndex:isSel?10:5,cursor:"pointer"}}>
                  <div style={{background:isSel?T.lime:T.white,border:"2px solid "+(isSel?T.limeD:w.color),borderRadius:20,padding:"4px 10px",display:"flex",alignItems:"center",gap:5,boxShadow:"0 2px 10px rgba(0,0,0,0.18)"}}>
                    <div style={{width:20,height:20,borderRadius:10,overflow:"hidden",flexShrink:0}}>
                      <Img src={w.avatar} style={{width:"100%",height:"100%"}}/>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:isSel?T.green:T.dark,whiteSpace:"nowrap"}}>{fmt(w.price)}</span>
                  </div>
                  <div style={{width:7,height:7,background:isSel?T.limeD:w.color,borderRadius:4,margin:"0 auto",marginTop:-2}}/>
                </div>
              );
            })}
            <div style={{position:"absolute",bottom:12,left:12,display:"flex",gap:6}}>
              {[2,5,10,15].map(km=>(
                <div key={km} onClick={()=>setRadiusKm(km)} style={{background:radiusKm===km?T.black:"rgba(255,255,255,0.9)",borderRadius:20,padding:"5px 12px",cursor:"pointer",boxShadow:"0 1px 6px rgba(0,0,0,0.12)"}}>
                  <span style={{fontSize:11,fontWeight:700,color:radiusKm===km?T.white:T.dark}}>{km}km</span>
                </div>
              ))}
            </div>
            <div style={{position:"absolute",top:12,right:12,background:"rgba(255,255,255,0.95)",borderRadius:20,padding:"5px 14px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
              <span style={{fontSize:12,fontWeight:700}}>📍 {nearby.length} cerca</span>
            </div>
          </div>
          {selected && (
            <div style={{background:T.white,borderTop:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:48,height:48,borderRadius:24,overflow:"hidden",border:"2px solid "+selected.color,flexShrink:0}}>
                <Img src={selected.avatar} style={{width:"100%",height:"100%"}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontWeight:700,fontSize:15}}>{selected.name}</span>
                  {selected.verified && <span>✅</span>}
                </div>
                <span style={{color:T.gray3,fontSize:12}}>{selected.service}  -  ⭐{selected.rating}  -  {selected.distLabel}</span>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{setWorker(selected);setS("worker");}} style={{background:T.gray5,border:"none",borderRadius:20,padding:"8px 14px",fontSize:13,fontWeight:600,cursor:"pointer"}}>Ver</button>
                <button onClick={()=>{setMatched(selected);setS("configure");}} style={{background:T.lime,border:"none",borderRadius:20,padding:"8px 14px",fontSize:13,fontWeight:700,color:T.green,cursor:"pointer"}}>Contratar</button>
              </div>
            </div>
          )}
          {!selected && nearby.length > 0 && (
            <div style={{background:T.white,borderTop:"0.5px solid "+T.border,padding:"10px 16px"}}>
              <p style={{fontSize:11,fontWeight:700,color:T.gray3,textTransform:"uppercase",margin:"0 0 8px"}}>{nearby.length} trabajadores en {radiusKm}km</p>
              <div style={{display:"flex",gap:10,overflowX:"auto"}}>
                {nearby.map(w=>(
                  <div key={w.id} onClick={()=>setSelected(w)} style={{flexShrink:0,textAlign:"center",cursor:"pointer",width:64}}>
                    <div style={{width:50,height:50,borderRadius:25,overflow:"hidden",border:"2px solid "+w.color,margin:"0 auto 4px"}}>
                      <Img src={w.avatar} style={{width:"100%",height:"100%"}}/>
                    </div>
                    <p style={{fontSize:10,fontWeight:600,margin:"0 0 1px"}}>{w.name.split(" ")[0]}</p>
                    <p style={{fontSize:10,color:T.limeD,fontWeight:700,margin:0}}>{fmt(w.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {viewMode === "feed" && (
        <div style={{flex:1,overflowY:"auto",background:T.white}}>
          {filtered.length === 0 ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:300,padding:"40px 24px"}}>
              <span style={{fontSize:52,marginBottom:12}}>🔍</span>
              <p style={{fontWeight:700,fontSize:17,margin:"0 0 8px"}}>Sin resultados</p>
              <p style={{color:T.gray3,fontSize:14,textAlign:"center",margin:"0 0 20px"}}>Ningun trabajador coincide con tu busqueda</p>
              <button onClick={()=>setActiveCat(null)} style={{background:T.lime,border:"none",borderRadius:20,padding:"10px 20px",fontSize:13,fontWeight:700,color:T.green,cursor:"pointer"}}>Limpiar filtros</button>
            </div>
          ) : filtered.map(w=>(
            <WorkerFeedCard key={w.id} w={w} setWorker={setWorker} setMatched={setMatched} setS={setS} liked={liked[w.id]} onLike={()=>setLiked(p=>({...p,[w.id]:!p[w.id]}))}/>
          ))}
        </div>
      )}
    </div>
  );
}

// -- WORKER SCREEN ---------------------------------------------
function WorkerScreen({ worker, setS, setMatched }) {
  const w = worker;
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,overflowY:"auto",background:T.white}}>
      <div style={{height:200,position:"relative",background:w.color,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0}}>
          <Img src={w.cover} style={{width:"100%",height:"100%"}} fallback={w.color}/>
        </div>
        <div style={{position:"absolute",inset:0,background:IMG_OVERLAY}}/>
        <button onClick={()=>setS("feed")} style={{position:"absolute",top:14,left:14,background:"rgba(0,0,0,0.5)",border:"none",borderRadius:20,width:36,height:36,color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>x</button>
      </div>
      <div style={{padding:"0 16px 24px",marginTop:-30,position:"relative"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:12}}>
          <div style={{width:72,height:72,borderRadius:36,overflow:"hidden",border:"3px solid "+T.white,background:w.color}}>
            <Img src={w.avatar} style={{width:"100%",height:"100%"}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setMatched(w);setS("chat");}} style={{background:T.white,border:"1.5px solid "+T.border,borderRadius:20,padding:"8px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}}>💬 Chat</button>
            <button onClick={()=>{setMatched(w);setS("configure");}} style={{background:T.lime,border:"none",borderRadius:20,padding:"8px 16px",fontSize:13,fontWeight:700,color:T.green,cursor:"pointer"}}>Contratar</button>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
          <span style={{fontSize:20,fontWeight:800}}>{w.name}</span>
          {w.verified && <span>✅</span>}
        </div>
        <p style={{color:T.gray3,fontSize:13,margin:"0 0 8px"}}>{w.handle}</p>
        <p style={{fontSize:14,color:T.dark,lineHeight:1.5,margin:"0 0 12px"}}>{w.bio}</p>
        <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:8,paddingBottom:2}}>
          {[{bg:CAT_COLORS[w.cat]||CAT_COLORS.default,label:w.cat},{bg:"#EFF6FF",c:"#1D4ED8",label:w.mode==="presencial"?"📍 Presencial":"💻 Remoto"}].map((tag,i)=>(
            <span key={i} style={{background:tag.bg,color:tag.c||(CAT_COLORS[w.cat]||CAT_COLORS.default).c,fontSize:12,fontWeight:700,borderRadius:8,padding:"5px 11px",whiteSpace:"nowrap",flexShrink:0}}>{tag.label}</span>
          ))}
          {w.mobilFee > 0 && <span style={{background:"#FEF3C7",color:"#92400E",fontSize:12,fontWeight:600,borderRadius:8,padding:"5px 11px",whiteSpace:"nowrap",flexShrink:0}}>🚗 +{fmt(w.mobilFee)}</span>}
        </div>
        <p style={{fontSize:11,color:T.gray3,margin:"0 0 16px"}}>
          ⭐ {w.rating} ({w.reviews} resenas)
          {w.schedule ? "  -  🕐 "+w.schedule.from+"-"+w.schedule.to : ""}
        </p>
        <div style={{display:"flex",gap:0,marginBottom:20,borderTop:"0.5px solid "+T.border,borderBottom:"0.5px solid "+T.border,padding:"10px 0"}}>
          {[{v:w.jobs,l:"chambas"},{v:w.rating,l:"rating"}].map((s,i)=>(
            <div key={i} style={{flex:1,textAlign:"center",borderRight:i===0?"0.5px solid "+T.border:"none"}}>
              <div style={{fontSize:17,fontWeight:800}}>{s.v}</div>
              <div style={{color:T.gray3,fontSize:11}}>{s.l}</div>
            </div>
          ))}
        </div>
        {w.extras && w.extras.length > 0 && (
          <div style={{marginBottom:16}}>
            <p style={{fontWeight:700,fontSize:14,margin:"0 0 10px"}}>Servicios adicionales</p>
            {w.extras.map(e=>(
              <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"0.5px solid "+T.border}}>
                <span style={{fontSize:14}}>{e.name}</span>
                <span style={{fontWeight:700,color:T.limeD,fontSize:13}}>{fmt(e.price)}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{background:T.gray5,borderRadius:14,padding:"12px 14px",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:800,fontSize:15}}>Precio base</span>
            <span style={{fontWeight:900,fontSize:22,color:T.limeD}}>{fmt(w.price)}</span>
          </div>
          <p style={{fontSize:12,color:T.gray3,margin:"4px 0 0"}}>/trabajo + 10% comision Chamba</p>
        </div>
        <button onClick={()=>{setMatched(w);setS("configure");}} style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:T.green,cursor:"pointer"}}>
          Contratar a {w.name.split(" ")[0]} - {fmt(w.price)}
        </button>
      </div>
    </div>
  );
}

// -- CONFIGURE SCREEN ------------------------------------------
function ConfigureScreen({ matched, setS }) {
  const w = matched;
  const [step, setStep] = useState(0);

  // Step 0: Cuando
  const [modo, setModo] = useState("ahora");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Step 1: Extras y materiales
  const [mobilAccepted, setMobilAccepted] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState({});
  const [clientMaterials, setClientMaterials] = useState(
    (w && w.extras ? [] : [])
  );

  // Step 2: Recargos y descuentos
  const [expressSurcharge, setExpressSurcharge] = useState(modo==="ahora");
  const [scheduledDiscount, setScheduledDiscount] = useState(false);
  const [repeatDiscount, setRepeatDiscount] = useState(false);

  // Step 3: Tiempo de espera
  const [waitTime, setWaitTime] = useState("30min");
  const [fallback, setFallback] = useState("buscar_otro");

  const DAYS  = ["Lun 27","Mar 28","Mie 29","Jue 30","Vie 31","Sab 1","Dom 2"];
  const TIMES = ["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"];
  const WAIT_OPTIONS = [
    {k:"15min",label:"15 min",desc:"Urgente"},
    {k:"30min",label:"30 min",desc:"Normal"},
    {k:"1h",label:"1 hora",desc:"Flexible"},
    {k:"2h",label:"2 horas",desc:"Sin apuro"},
  ];
  const FALLBACK_OPTIONS = [
    {k:"buscar_otro",label:"Buscarme otro trabajador similar",icon:"🔍"},
    {k:"esperar",label:"Seguir esperando su respuesta",icon:""},
    {k:"cancelar",label:"Cancelar y notificarme",icon:"🔔"},
  ];

  // Calculations
  const base      = w ? w.price : 0;
  const mobilFee  = (mobilAccepted && w && w.mobilFee) ? w.mobilFee : 0;
  const extTotal  = w && w.extras ? w.extras.filter(e=>selectedExtras[e.id]).reduce((s,e)=>s+e.price,0) : 0;
  const subtotal  = base + mobilFee + extTotal;
  const urgPct    = expressSurcharge ? 0.30 : 0;
  const urgAmt    = Math.round(subtotal * urgPct);
  const schedDisc = scheduledDiscount ? Math.round(subtotal * 0.10) : 0;
  const repDisc   = repeatDiscount    ? Math.round(subtotal * 0.05) : 0;
  const gross     = subtotal + urgAmt - schedDisc - repDisc;
  const chambaFee = Math.round(gross * 0.10);
  const total     = gross + chambaFee;
  const workerNet = Math.round(gross * 0.90);

  const canNext = step===0
    ? (modo==="ahora" || (selectedDay && selectedTime))
    : true;

  const steps = ["Cuando","Detalles","Precios","Propuesta"];

  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
      {/* Header */}
      <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>step===0?setS("worker"):setStep(s=>s-1)}
          style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <div style={{flex:1}}>
          <span style={{fontSize:15,fontWeight:700}}>Propuesta para {w?w.name.split(" ")[0]:""}</span>
          <div style={{display:"flex",gap:4,marginTop:4}}>
            {steps.map((s,i)=>(
              <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=step?T.lime:T.gray5,transition:"all 0.3s"}}/>
            ))}
          </div>
        </div>
        <span style={{fontSize:12,color:T.gray3,fontWeight:600}}>{step+1}/{steps.length}</span>
      </div>

      <div style={{flex:1,overflowY:"auto"}}>

        {/* STEP 0: Cuando */}
        {step===0 && (
          <div style={{padding:"20px 16px"}}>
            <p style={{fontWeight:800,fontSize:20,margin:"0 0 6px"}}>Cuando lo necesitas?</p>
            <p style={{color:T.gray3,fontSize:13,margin:"0 0 20px"}}>Esto afecta el precio final</p>
            <div style={{display:"flex",gap:10,marginBottom:20}}>
              {[{k:"ahora",icon:"⚡",label:"Ahora",sub:"Recargo urgencia +30%",color:T.limeD},
                {k:"programar",icon:"📅",label:"Programar",sub:"Reserva anticipada -10%",color:"#1D4ED8"}
              ].map(m=>(
                <div key={m.k} onClick={()=>{setModo(m.k);setExpressSurcharge(m.k==="ahora");}}
                  style={{flex:1,border:"2px solid "+(modo===m.k?T.lime:T.border),borderRadius:16,padding:"16px 12px",textAlign:"center",cursor:"pointer",background:modo===m.k?T.limeL:T.white}}>
                  <div style={{fontSize:30,marginBottom:8}}>{m.icon}</div>
                  <div style={{fontWeight:800,fontSize:15,color:modo===m.k?T.green:T.dark,marginBottom:4}}>{m.label}</div>
                  <div style={{fontSize:11,color:m.color,fontWeight:600}}>{m.sub}</div>
                </div>
              ))}
            </div>

            {modo==="programar" && (
              <div>
                <p style={{fontWeight:700,fontSize:14,margin:"0 0 10px"}}>Dia</p>
                <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16,paddingBottom:2}}>
                  {DAYS.map(d=>(
                    <div key={d} onClick={()=>setSelectedDay(d)}
                      style={{flexShrink:0,background:selectedDay===d?T.black:T.gray5,borderRadius:12,padding:"10px 14px",cursor:"pointer",textAlign:"center"}}>
                      <span style={{fontWeight:700,fontSize:13,color:selectedDay===d?T.white:T.dark}}>{d}</span>
                    </div>
                  ))}
                </div>
                <p style={{fontWeight:700,fontSize:14,margin:"0 0 10px"}}>Hora</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {TIMES.map(t=>(
                    <div key={t} onClick={()=>setSelectedTime(t)}
                      style={{background:selectedTime===t?T.lime:T.gray5,borderRadius:10,padding:"8px 14px",cursor:"pointer"}}>
                      <span style={{fontWeight:700,fontSize:13,color:selectedTime===t?T.green:T.dark}}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {modo==="ahora" && (
              <div style={{background:"#FEF3C7",borderRadius:14,padding:"14px",marginTop:4}}>
                <p style={{fontWeight:700,fontSize:13,color:"#92400E",margin:"0 0 6px"}}>Servicio express</p>
                <p style={{fontSize:12,color:"#92400E",margin:0,lineHeight:1.5}}>Al solicitar ahora mismo se aplica un recargo del 30% sobre el precio base. El trabajador priorizara tu solicitud.</p>
              </div>
            )}
          </div>
        )}

        {/* STEP 1: Extras y materiales */}
        {step===1 && (
          <div style={{padding:"20px 16px"}}>
            <p style={{fontWeight:800,fontSize:20,margin:"0 0 6px"}}>Personaliza el servicio</p>
            <p style={{color:T.gray3,fontSize:13,margin:"0 0 20px"}}>Agrega extras para un servicio mas completo</p>

            {/* Movilizacion */}
            {w && w.mobilFee > 0 && (
              <div style={{border:"1.5px solid "+(mobilAccepted?T.lime:T.border),borderRadius:14,padding:"14px",marginBottom:12,cursor:"pointer"}}
                onClick={()=>setMobilAccepted(b=>!b)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{fontSize:18}}>🚗</span>
                      <span style={{fontWeight:700,fontSize:14}}>Tarifa de movilizacion</span>
                    </div>
                    <p style={{color:T.gray3,fontSize:12,margin:"0 0 4px"}}>{w.name.split(" ")[0]} viene hasta tu domicilio</p>
                    <p style={{fontSize:11,color:"#92400E",fontWeight:600,margin:0}}>Recomendado: sin esto el trabajador puede rechazar la propuesta</p>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0,marginLeft:10}}>
                    <span style={{fontWeight:800,color:T.limeD,fontSize:15}}>{fmt(w.mobilFee)}</span>
                    <div style={{width:24,height:24,borderRadius:12,border:"2px solid "+(mobilAccepted?T.lime:T.gray4),background:mobilAccepted?T.lime:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {mobilAccepted && <span style={{color:T.white,fontSize:14,fontWeight:900}}>✓</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Herramientas propias */}
            {w && w.extras && w.extras.length > 0 && (
              <div style={{marginBottom:12}}>
                <p style={{fontWeight:700,fontSize:14,margin:"0 0 10px"}}>Extras disponibles de {w.name.split(" ")[0]}</p>
                {w.extras.map(e=>(
                  <div key={e.id} onClick={()=>setSelectedExtras(p=>({...p,[e.id]:!p[e.id]}))}
                    style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                      padding:"12px 14px",border:"1.5px solid "+(selectedExtras[e.id]?T.lime:T.border),
                      borderRadius:12,marginBottom:8,cursor:"pointer",background:selectedExtras[e.id]?T.limeL:T.white}}>
                    <div>
                      <span style={{fontWeight:600,fontSize:14}}>{e.name}</span>
                      {e.desc && <p style={{color:T.gray3,fontSize:12,margin:"2px 0 0"}}>{e.desc}</p>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontWeight:700,color:T.limeD,fontSize:14}}>+{fmt(e.price)}</span>
                      <div style={{width:24,height:24,borderRadius:12,border:"2px solid "+(selectedExtras[e.id]?T.lime:T.gray4),background:selectedExtras[e.id]?T.lime:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {selectedExtras[e.id] && <span style={{color:T.white,fontSize:14,fontWeight:900}}>✓</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Materiales del cliente */}
            {w && w.extras && w.extras.some(e=>e.clientMaterial) && (
              <div style={{background:"#FEF3C7",borderRadius:12,padding:"12px 14px"}}>
                <p style={{fontWeight:700,fontSize:13,color:"#92400E",margin:"0 0 8px"}}>📋 Debes tener listo</p>
                {w.extras.filter(e=>e.clientMaterial).map((e,i)=>(
                  <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                    <div style={{width:6,height:6,borderRadius:3,background:"#F59E0B",flexShrink:0}}/>
                    <span style={{fontSize:13,color:"#78350F"}}>{e.clientMaterial}</span>
                  </div>
                ))}
              </div>
            )}

            {extTotal===0 && (!w||!w.mobilFee||w.mobilFee===0) && (
              <div style={{background:T.gray5,borderRadius:14,padding:"20px",textAlign:"center"}}>
                <p style={{fontSize:28,margin:"0 0 8px"}}>✓</p>
                <p style={{fontWeight:700,fontSize:14,margin:"0 0 4px"}}>Servicio basico seleccionado</p>
                <p style={{color:T.gray3,fontSize:13,margin:0}}>{w?w.name.split(" ")[0]:"El trabajador"} no tiene extras disponibles</p>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Recargos y descuentos */}
        {step===2 && (
          <div style={{padding:"20px 16px"}}>
            <p style={{fontWeight:800,fontSize:20,margin:"0 0 6px"}}>Recargos y descuentos</p>
            <p style={{color:T.gray3,fontSize:13,margin:"0 0 20px"}}>Ajusta el precio segun tus condiciones</p>

            {[
              {active:expressSurcharge, set:setExpressSurcharge, disabled:modo!=="ahora",
               icon:"⚡", label:"Recargo urgencia +30%", desc:"Servicio express - el trabajador te prioriza",
               amount:"+"+fmt(Math.round(subtotal*0.30)), color:"#92400E", bg:"#FEF3C7"},
              {active:scheduledDiscount, set:setScheduledDiscount, disabled:modo!=="programar",
               icon:"📅", label:"Reserva anticipada -10%", desc:"El trabajador ofrece este descuento por agendar con anticipacion",
               amount:"-"+fmt(Math.round(subtotal*0.10)), color:"#15803D", bg:"#F0FDF4"},
              {active:repeatDiscount, set:setRepeatDiscount, disabled:false,
               icon:"🔄", label:"Descuento cliente recurrente -5%", desc:"Has contratado a este trabajador antes",
               amount:"-"+fmt(Math.round(subtotal*0.05)), color:"#1D4ED8", bg:"#EFF6FF"},
            ].map((item,i)=>(
              <div key={i}
                style={{border:"1.5px solid "+(item.active?T.lime:T.border),borderRadius:14,padding:"14px",
                  marginBottom:10,background:item.active?T.limeL:item.disabled?"#F8F8F8":T.white,
                  opacity:item.disabled?0.5:1,cursor:item.disabled?"not-allowed":"pointer"}}
                onClick={()=>!item.disabled && item.set(b=>!b)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{fontSize:18}}>{item.icon}</span>
                      <span style={{fontWeight:700,fontSize:14}}>{item.label}</span>
                      {item.disabled && <span style={{background:T.gray5,color:T.gray3,fontSize:10,borderRadius:20,padding:"2px 8px"}}>No aplica</span>}
                    </div>
                    <p style={{color:T.gray3,fontSize:12,margin:0}}>{item.desc}</p>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0,marginLeft:10}}>
                    <span style={{fontWeight:800,fontSize:14,color:item.color,background:item.bg,borderRadius:8,padding:"3px 8px"}}>{item.amount}</span>
                    <div style={{width:44,height:26,borderRadius:13,background:item.active?T.lime:T.gray4,position:"relative",transition:"all 0.2s"}}>
                      <div style={{position:"absolute",top:3,left:item.active?22:3,width:20,height:20,borderRadius:10,background:T.white,boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"all 0.2s"}}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Resumen */}
            <div style={{background:T.white,border:"1.5px solid "+T.border,borderRadius:16,padding:"14px",marginTop:8}}>
              <p style={{fontWeight:700,fontSize:13,margin:"0 0 10px",color:T.gray2}}>Resumen de precio</p>
              {[
                {l:"Precio base",v:fmt(base)},
                mobilFee>0?{l:"Movilizacion",v:"+"+fmt(mobilFee)}:null,
                extTotal>0?{l:"Extras",v:"+"+fmt(extTotal)}:null,
                expressSurcharge?{l:"Urgencia 30%",v:"+"+fmt(urgAmt),c:"#D97706"}:null,
                scheduledDiscount?{l:"Reserva anticipada",v:"-"+fmt(schedDisc),c:"#15803D"}:null,
                repeatDiscount?{l:"Desc. recurrente",v:"-"+fmt(repDisc),c:"#1D4ED8"}:null,
                {l:"Comision Chamba 10%",v:fmt(chambaFee),g:true},
              ].filter(Boolean).map((row,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:13,color:row.g?T.gray3:T.dark}}>{row.l}</span>
                  <span style={{fontSize:13,fontWeight:600,color:row.c||T.dark}}>{row.v}</span>
                </div>
              ))}
              <div style={{borderTop:"2px solid "+T.black,paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <span style={{fontWeight:800,fontSize:15}}>Total</span>
                <span style={{fontWeight:900,fontSize:24,color:T.limeD}}>{fmt(total)}</span>
              </div>
              <div style={{background:T.limeL,borderRadius:10,padding:"8px 12px",marginTop:10,display:"flex",gap:8}}>
                <span>💼</span>
                <span style={{fontSize:12,color:T.green}}>{w?w.name.split(" ")[0]:"El trabajador"} recibira {fmt(workerNet)} al completar el trabajo</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Propuesta final + tiempo de espera */}
        {step===3 && (
          <div style={{padding:"20px 16px"}}>
            <p style={{fontWeight:800,fontSize:20,margin:"0 0 6px"}}>Tiempo de respuesta</p>
            <p style={{color:T.gray3,fontSize:13,margin:"0 0 20px"}}>Cuanto tiempo le das para responder?</p>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
              {WAIT_OPTIONS.map(opt=>(
                <div key={opt.k} onClick={()=>setWaitTime(opt.k)}
                  style={{border:"2px solid "+(waitTime===opt.k?T.lime:T.border),borderRadius:14,padding:"14px",textAlign:"center",cursor:"pointer",background:waitTime===opt.k?T.limeL:T.white}}>
                  <div style={{fontWeight:900,fontSize:20,color:waitTime===opt.k?T.green:T.dark,marginBottom:2}}>{opt.label}</div>
                  <div style={{fontSize:11,color:waitTime===opt.k?T.limeD:T.gray3,fontWeight:600}}>{opt.desc}</div>
                </div>
              ))}
            </div>

            <p style={{fontWeight:700,fontSize:14,margin:"0 0 10px"}}>Si no responde a tiempo...</p>
            {FALLBACK_OPTIONS.map(opt=>(
              <div key={opt.k} onClick={()=>setFallback(opt.k)}
                style={{display:"flex",alignItems:"center",gap:12,padding:"14px",border:"1.5px solid "+(fallback===opt.k?T.lime:T.border),
                  borderRadius:12,marginBottom:8,cursor:"pointer",background:fallback===opt.k?T.limeL:T.white}}>
                <span style={{fontSize:22}}>{opt.icon}</span>
                <span style={{flex:1,fontSize:14,fontWeight:fallback===opt.k?700:400,color:fallback===opt.k?T.green:T.dark}}>{opt.label}</span>
                <div style={{width:22,height:22,borderRadius:11,border:"2px solid "+(fallback===opt.k?T.lime:T.gray4),background:fallback===opt.k?T.lime:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {fallback===opt.k && <span style={{color:T.white,fontSize:12,fontWeight:900}}>✓</span>}
                </div>
              </div>
            ))}

            {/* Resumen final de la propuesta */}
            <div style={{background:T.green,borderRadius:16,padding:"16px",marginTop:12}}>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:11,textTransform:"uppercase",fontWeight:700,margin:"0 0 12px"}}>Tu propuesta</p>
              {[
                {icon:"🧹",l:"Servicio",v:w?w.service:""},
                {icon:"📅",l:"Fecha",v:modo==="ahora"?"Ahora mismo":(selectedDay||"")+" "+(selectedTime||"")},
                {icon:"💰",l:"Total",v:fmt(total)},
                {icon:"",l:"Espera max.",v:WAIT_OPTIONS.find(o=>o.k===waitTime)?.label||""},
              ].map((row,i)=>(
                <div key={i} style={{display:"flex",gap:10,marginBottom:3>i?10:0}}>
                  <span style={{fontSize:15,flexShrink:0}}>{row.icon}</span>
                  <div style={{flex:1,display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>{row.l}</span>
                    <span style={{fontSize:13,fontWeight:700,color:T.lime}}>{row.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{padding:"12px 16px",borderTop:"0.5px solid "+T.border,background:T.white}}>
        {step < 3
          ? <button onClick={()=>{if(canNext)setStep(s=>s+1);}} disabled={!canNext}
              style={{width:"100%",background:canNext?T.lime:T.gray5,border:"none",borderRadius:14,padding:"16px",
                fontSize:16,fontWeight:900,color:canNext?T.green:T.gray3,cursor:canNext?"pointer":"not-allowed"}}>
              Siguiente
            </button>
          : <button onClick={()=>setS("waiting")}
              style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:T.green,cursor:"pointer"}}>
              Enviar propuesta
            </button>
        }
      </div>
    </div>
  );
}


function PaymentScreen({ matched, setS }) {
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const total = matched ? matched.price + Math.round(matched.price * 0.10) : 0;
  function pay() {
    setLoading(true);
    setTimeout(()=>setS("confirm"),2000);
  }
  const METHODS = [
    {id:"webpay",icon:"💳",label:"Webpay / Tarjeta",desc:"Debito o credito"},
    {id:"transfer",icon:"🏦",label:"Transferencia",desc:"Banco directo"},
    {id:"wallet",icon:"📱",label:"Chamba Wallet",desc:"Saldo disponible: $0"},
  ];
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
      <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setS("configure")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <span style={{fontSize:16,fontWeight:700}}>Metodo de pago</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        <div style={{background:T.green,borderRadius:16,padding:"16px",marginBottom:20,textAlign:"center"}}>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:12,margin:"0 0 4px"}}>Total a pagar</p>
          <p style={{color:T.lime,fontWeight:900,fontSize:32,margin:0,letterSpacing:-1}}>{fmt(total)}</p>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,margin:"4px 0 0"}}>Retenido en escrow hasta confirmar</p>
        </div>
        {METHODS.map(m=>(
          <div key={m.id} onClick={()=>setMethod(m.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"16px",border:"1.5px solid "+(method===m.id?T.lime:T.border),borderRadius:14,marginBottom:10,cursor:"pointer",background:method===m.id?T.limeL:T.white}}>
            <span style={{fontSize:28}}>{m.icon}</span>
            <div style={{flex:1}}>
              <p style={{fontWeight:700,fontSize:15,margin:"0 0 2px"}}>{m.label}</p>
              <p style={{color:T.gray3,fontSize:12,margin:0}}>{m.desc}</p>
            </div>
            <div style={{width:22,height:22,borderRadius:11,border:"2px solid "+(method===m.id?T.lime:T.gray4),background:method===m.id?T.lime:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {method===m.id && <span style={{color:T.white,fontSize:12,fontWeight:900}}>✓</span>}
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:"12px 16px",borderTop:"0.5px solid "+T.border}}>
        <button onClick={pay} disabled={!method||loading} style={{width:"100%",background:method&&!loading?T.lime:T.gray5,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:method&&!loading?T.green:T.gray3,cursor:"pointer"}}>
          {loading?"Procesando pago...":"Pagar "+fmt(total)+""}
        </button>
      </div>
    </div>
  );
}

// -- CONFIRM SCREEN --------------------------------------------
function ConfirmScreen({ matched, setS, setMatches }) {
  const price = matched ? matched.price : 15000;
  const comm = Math.round(price * 0.10);
  const total = price + comm;
  const [stage, setStage] = useState("reserved");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [workerRating, setWorkerRating] = useState(0);
  const workerName = matched ? matched.name.split(" ")[0] : "el trabajador";

  if (stage === "rating_employer") {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,overflowY:"auto",background:T.white}}>
        <div style={{background:"linear-gradient(180deg,"+T.limeL+",white)",padding:"32px 24px 20px",textAlign:"center"}}>
          <div style={{width:72,height:72,borderRadius:36,overflow:"hidden",border:"3px solid "+T.lime,margin:"0 auto 14px",boxShadow:"0 0 0 8px "+T.limeL}}>
            <Img src={matched?matched.avatar:"https://i.pravatar.cc/150?img=47"} style={{width:"100%",height:"100%"}}/>
          </div>
          <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 6px"}}>Como resulto la chamba?</h2>
          <p style={{color:T.gray2,fontSize:14,margin:0}}>Califica a {matched?matched.name:""}</p>
        </div>
        <div style={{padding:"20px"}}>
          <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:16}}>
            {[1,2,3,4,5].map(s=>(
              <span key={s} onMouseEnter={()=>setHovered(s)} onMouseLeave={()=>setHovered(0)} onClick={()=>setRating(s)} style={{fontSize:40,cursor:"pointer",opacity:(hovered||rating)>=s?1:0.25,transition:"all 0.1s"}}>⭐</span>
            ))}
          </div>
          {rating > 0 && <p style={{textAlign:"center",fontWeight:700,fontSize:15,color:T.green,marginBottom:16}}>{["","Malo","Regular","Bueno","Muy bueno","Excelente"][rating]}</p>}
          <p style={{fontWeight:700,fontSize:13,color:T.gray2,marginBottom:10}}>Que destacas?</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
            {["Puntual","Profesional","Trabajo impecable","Amable","Confiable","Rapido"].map(tag=>(
              <div key={tag} onClick={()=>setComment(prev=>prev.includes(tag)?prev.replace(tag,"").trim():prev+" "+tag)} style={{background:comment.includes(tag)?T.lime:T.gray5,borderRadius:20,padding:"6px 14px",cursor:"pointer",border:"1.5px solid "+(comment.includes(tag)?T.lime:T.border)}}>
                <span style={{fontSize:12,fontWeight:600,color:comment.includes(tag)?T.green:T.gray2}}>{tag}</span>
              </div>
            ))}
          </div>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={3} placeholder={"Cuentale a la comunidad como resulto la chamba..."} style={{width:"100%",border:"1.5px solid "+T.border,borderRadius:12,padding:"12px",fontSize:14,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"inherit",lineHeight:1.5,marginBottom:16}}/>
          <button onClick={()=>setStage("rating_worker")} disabled={rating===0} style={{width:"100%",background:rating>0?T.black:T.gray5,border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:800,color:rating>0?T.white:T.gray3,cursor:rating>0?"pointer":"not-allowed",marginBottom:10}}>
            Publicar calificacion
          </button>
          <button onClick={()=>setStage("rating_worker")} style={{width:"100%",background:"none",border:"none",color:T.gray3,fontSize:13,cursor:"pointer",padding:"8px"}}>Omitir por ahora</button>
        </div>
      </div>
    );
  }

  if (stage === "rating_worker") {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,overflowY:"auto",background:"#1C1C1E"}}>
        <div style={{background:"linear-gradient(180deg,#2D2D2F,#1C1C1E)",padding:"32px 24px 20px",textAlign:"center"}}>
          <div style={{background:"rgba(255,255,255,0.08)",borderRadius:20,padding:"8px 16px",display:"inline-block",marginBottom:16}}>
            <span style={{color:"rgba(255,255,255,0.5)",fontSize:12,fontWeight:600}}>Vista del trabajador</span>
          </div>
          <div style={{position:"relative",display:"inline-block",marginBottom:14}}>
            <div style={{width:80,height:80,borderRadius:40,overflow:"hidden",border:"3px solid rgba(255,255,255,0.2)",margin:"0 auto"}}>
              <Img src={matched?matched.avatar:""} style={{width:"100%",height:"100%"}}/>
            </div>
            <div style={{position:"absolute",bottom:-4,right:-4,width:28,height:28,borderRadius:14,background:T.lime,border:"2px solid #1C1C1E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>
              ⭐
            </div>
          </div>
          <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 6px",color:T.white}}>
            {matched?matched.name.split(" ")[0]:""} te califica
          </h2>
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,margin:0}}>
            Asi ve el trabajador esta pantalla al finalizar
          </p>
        </div>

        <div style={{padding:"20px"}}>
          <div style={{background:"rgba(255,255,255,0.06)",borderRadius:16,padding:"20px",marginBottom:14,border:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{width:44,height:44,borderRadius:22,overflow:"hidden",border:"2px solid rgba(255,255,255,0.15)"}}>
                <Img src={JULIA.avatar} style={{width:"100%",height:"100%"}}/>
              </div>
              <div>
                <p style={{fontWeight:700,fontSize:15,color:T.white,margin:0}}>Julia Morales</p>
                <p style={{color:"rgba(255,255,255,0.4)",fontSize:12,margin:0}}>Como fue trabajar con ella?</p>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:12}}>
              {[1,2,3,4,5].map(s=>(
                <span key={s} onClick={()=>setWorkerRating(s)}
                  style={{fontSize:38,cursor:"pointer",opacity:workerRating>=s?1:0.2,transition:"transform 0.1s",transform:workerRating===s?"scale(1.2)":"scale(1)"}}>⭐</span>
              ))}
            </div>
            {workerRating > 0 && (
              <p style={{textAlign:"center",fontSize:14,color:T.lime,fontWeight:700,marginBottom:12}}>
                {["","Empleadora dificil","Normal","Buen trato","Muy buena empleadora","Empleadora excelente!"][workerRating]}
              </p>
            )}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
              {["Pagadora puntual","Instrucciones claras","Buen trato","Casa ordenada","Recomendaria"].map(tag=>(
                <div key={tag} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"5px 12px",cursor:"pointer"}}>
                  <span style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:"rgba(168,212,41,0.1)",borderRadius:12,padding:"12px 14px",marginBottom:20,border:"1px solid rgba(168,212,41,0.2)",display:"flex",gap:10}}>
            <span style={{fontSize:18}}>💡</span>
            <div>
              <p style={{fontWeight:700,fontSize:13,color:T.lime,margin:"0 0 3px"}}>Por que calificamos ambos?</p>
              <p style={{fontSize:12,color:"rgba(168,212,41,0.7)",margin:0,lineHeight:1.5}}>
                Los empleadores bien calificados atraen a los mejores trabajadores y consiguen precios mas competitivos.
              </p>
            </div>
          </div>

          <button onClick={()=>setStage("done")} disabled={workerRating===0}
            style={{width:"100%",background:workerRating>0?T.lime:T.gray1,border:"none",borderRadius:14,padding:"16px",
              fontSize:15,fontWeight:800,color:workerRating>0?T.green:"#444",cursor:workerRating>0?"pointer":"not-allowed",marginBottom:10}}>
            {workerRating>0?"Enviar calificacion ✓":"Selecciona una calificacion"}
          </button>
          <button onClick={()=>setStage("done")}
            style={{width:"100%",background:"none",border:"none",color:"rgba(255,255,255,0.3)",fontSize:13,cursor:"pointer",padding:"8px"}}>
            Omitir
          </button>
        </div>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 24px",background:T.white}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"45%",background:"linear-gradient(180deg,"+T.limeL+",white)"}}/>
        <div style={{position:"relative",zIndex:1,width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:90,height:90,borderRadius:45,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,marginBottom:16,boxShadow:"0 0 0 12px "+T.limeL}}>✅</div>
          <h2 style={{fontSize:26,fontWeight:900,margin:"0 0 6px"}}>Chamba completada!</h2>
          <p style={{color:T.gray2,textAlign:"center",fontSize:14,margin:"0 0 20px",lineHeight:1.5}}>Pago liberado - Calificaciones publicadas</p>
          <div style={{width:"100%",background:T.gray5,borderRadius:16,padding:"16px",marginBottom:20}}>
            {[
              {icon:"💰",l:"Pago liberado a "+workerName,v:fmt(Math.round(price*0.9))},
              {icon:"⭐",l:"Tu calificacion publicada",v:rating+"/5 estrellas"},
              {icon:"📄",l:"Boleta emitida al SII",v:"Automatico"},
            ].map((s,i,arr)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:arr.length-1>i?12:0}}>
                <div style={{width:34,height:34,borderRadius:17,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>✅</div>
                <div style={{flex:1}}>
                  <p style={{fontSize:13,fontWeight:600,margin:0}}>{s.l}</p>
                  <p style={{fontSize:11,color:T.gray3,margin:0}}>{s.v}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=>{setMatches(m=>[...m,matched]);setS("feed");}} style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",color:T.green,fontSize:15,fontWeight:800,cursor:"pointer",marginBottom:10}}>
            Volver al inicio
          </button>
          <button onClick={()=>setS("configure")} style={{width:"100%",background:T.white,border:"1.5px solid "+T.border,borderRadius:14,padding:"12px",color:T.gray2,fontSize:13,cursor:"pointer"}}>
            Contratar a {workerName} otra vez
          </button>
        </div>
      </div>
    );
  }

  if (stage === "release") {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,overflowY:"auto",background:T.white}}>
        <div style={{background:"linear-gradient(180deg,#FEF3C7,white)",padding:"32px 24px 20px",textAlign:"center"}}>
          <div style={{fontSize:52,marginBottom:12}}>🔓</div>
          <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 6px"}}>El trabajo quedo bien?</h2>
          <p style={{color:T.gray2,fontSize:14,margin:0,lineHeight:1.5}}>Al confirmar se libera <strong style={{color:T.limeD}}>{fmt(total)}</strong> a {matched?matched.name:""}</p>
        </div>
        <div style={{padding:"20px"}}>
          <div style={{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:16,padding:"14px",marginBottom:16}}>
            <p style={{fontWeight:700,fontSize:14,color:"#92400E",margin:"0 0 8px"}}>Antes de liberar, verifica:</p>
            {["El trabajo fue realizado correctamente","Quedaste satisfecho con el resultado","No tienes reclamos pendientes"].map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:i < 2?6:0}}>
                <span style={{fontSize:14}}>✓</span>
                <span style={{fontSize:13,color:"#78350F"}}>{item}</span>
              </div>
            ))}
          </div>
          <button onClick={()=>setStage("rating_employer")} style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"17px",fontSize:16,fontWeight:900,color:T.green,cursor:"pointer",marginBottom:10}}>
            Confirmar y liberar pago
          </button>
          <button onClick={()=>setStage("reserved")} style={{width:"100%",background:"#FEE2E2",border:"none",borderRadius:14,padding:"13px",fontSize:14,fontWeight:700,color:"#DC2626",cursor:"pointer",marginBottom:8}}>
            Tengo un problema con el trabajo
          </button>
          <button onClick={()=>setS("chat")} style={{width:"100%",background:"none",border:"1px solid "+T.border,borderRadius:14,padding:"12px",color:T.gray2,fontSize:13,cursor:"pointer"}}>
            Hablar con {workerName} primero
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,overflowY:"auto",background:T.white}}>
      <div style={{background:"linear-gradient(180deg,"+T.limeL+",white)",padding:"32px 24px 0",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:80,height:80,borderRadius:40,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,marginBottom:14,boxShadow:"0 0 0 10px "+T.limeL}}>✅</div>
        <h2 style={{fontSize:26,fontWeight:900,margin:"0 0 4px",textAlign:"center"}}>Chamba reservada!</h2>
        <p style={{color:T.gray2,textAlign:"center",margin:"0 0 20px",fontSize:14,lineHeight:1.5}}>Pago protegido - {matched?matched.name:""} fue notificado</p>
      </div>
      <div style={{padding:"0 20px 32px"}}>
        <div style={{background:T.white,border:"1.5px solid "+T.lime,borderRadius:18,padding:"16px",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14,paddingBottom:14,borderBottom:"0.5px solid "+T.border}}>
            <div style={{width:50,height:50,borderRadius:25,overflow:"hidden",border:"2px solid "+T.lime}}>
              <Img src={matched?matched.avatar:"https://i.pravatar.cc/150?img=47"} style={{width:"100%",height:"100%"}}/>
            </div>
            <div style={{flex:1}}>
              <p style={{fontWeight:800,fontSize:15,margin:"0 0 2px"}}>{matched?matched.name:""}</p>
              <p style={{color:T.gray3,fontSize:12,margin:0}}>⭐ {matched?matched.rating:""} - {matched?matched.jobs:""}  trabajos</p>
            </div>
          </div>
          {[{icon:"🧹",label:"Servicio",value:matched?matched.service:"Servicio"},{icon:"📅",label:"Fecha",value:"Sab 25 Mayo 2026"},{icon:"🕐",label:"Horario",value:"09:00 - 12:00"}].map((row,i,arr)=>(
            <div key={i} style={{display:"flex",gap:10,paddingBottom:arr.length-1>i?10:0,marginBottom:arr.length-1>i?10:0,borderBottom:arr.length-1>i?"0.5px solid "+T.border:"none"}}>
              <span style={{fontSize:16,flexShrink:0,marginTop:1}}>{row.icon}</span>
              <div>
                <p style={{color:T.gray3,fontSize:11,fontWeight:700,textTransform:"uppercase",margin:"0 0 1px"}}>{row.label}</p>
                <p style={{fontWeight:600,fontSize:13,color:T.dark,margin:0}}>{row.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:T.gray5,borderRadius:14,padding:"12px 14px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:13,color:T.gray2}}>Subtotal</span>
            <span style={{fontSize:13,fontWeight:600}}>{fmt(price)}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:13,color:T.gray3}}>Comision Chamba 10%</span>
            <span style={{fontSize:13,color:T.gray3}}>{fmt(comm)}</span>
          </div>
          <div style={{borderTop:"2px solid "+T.black,paddingTop:8,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontWeight:800,fontSize:14}}>Total en escrow</span>
            <span style={{fontWeight:900,fontSize:18,color:T.limeD}}>{fmt(total)}</span>
          </div>
          <div style={{background:T.limeL,borderRadius:10,padding:"8px 12px",marginTop:10,display:"flex",gap:8}}>
            <span>🔒</span>
            <span style={{fontSize:12,color:T.green}}>Se libera cuando confirmes que el trabajo quedo bien</span>
          </div>
        </div>
        <button onClick={()=>setStage("release")} style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"17px",fontSize:16,fontWeight:900,color:T.green,cursor:"pointer",marginBottom:10}}>
          El trabajo termino - Liberar pago
        </button>
        <button onClick={()=>setS("chat")} style={{width:"100%",background:T.white,border:"1.5px solid "+T.border,borderRadius:14,padding:"13px",color:T.dark,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <span>💬</span> Chat con {workerName}
        </button>
      </div>
    </div>
  );
}

// -- CHAT SCREEN -----------------------------------------------

function ChatRulesInfo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{borderBottom:"0.5px solid "+T.lime}}>
      <div onClick={()=>setOpen(o=>!o)} style={{background:T.limeL,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
        <span style={{fontSize:15}}>💬</span>
        <span style={{flex:1,fontSize:12,color:T.green,fontWeight:600}}>Coordina los detalles antes de pagar</span>
        <div style={{width:22,height:22,borderRadius:11,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:12,fontWeight:800,color:T.green}}>i</span>
        </div>
        <span style={{color:T.limeD,fontSize:13}}>{open?"^":">"}</span>
      </div>
      {open && (
        <div style={{background:"#F0FDF4",padding:"14px 16px",borderTop:"0.5px solid "+T.lime}}>
          <p style={{fontWeight:800,fontSize:13,color:T.green,margin:"0 0 10px"}}>Reglas del chat de Chamba</p>
          {[
            {icon:"✅",t:"Coordina libremente",d:"Ajusta horario, direccion y detalles antes de pagar."},
            {icon:"🔒",t:"Pago seguro en escrow",d:"El dinero queda retenido hasta que confirmes el trabajo."},
            {icon:"🚫",t:"Sin contacto directo",d:"No compartas telefonos. Los numeros se censuran automaticamente."},
            {icon:"⚠",t:"Pago solo por Chamba",d:"Acordar pagos fuera anula la proteccion escrow."},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",gap:10,marginBottom:3>i?10:0}}>
              <span style={{fontSize:16,flexShrink:0}}>{r.icon}</span>
              <div>
                <p style={{fontWeight:700,fontSize:13,color:T.green,margin:"0 0 2px"}}>{r.t}</p>
                <p style={{fontSize:12,color:T.limeD,margin:0,lineHeight:1.5}}>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatScreen({ matched, setS }) {
  const workerName = matched ? matched.name.split(" ")[0] : "Valentina";
  const workerAvatar = matched ? matched.avatar : "https://i.pravatar.cc/150?img=44";
  const [stage, setStage] = useState("chat");
  const [input, setInput] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const DAYS = ["Sab 25 Mayo","Dom 26 Mayo","Lun 27 Mayo","Mar 28 Mayo"];
  const TIMES = ["09:00","10:00","11:00","12:00","14:00","15:00"];
  const svc = matched ? matched.service : "el servicio";
  const price = matched ? matched.price : 15000;
  const [msgs, setMsgs] = useState([
    {id:1,from:"worker",text:"Hola! Vi tu solicitud para "+svc+". Me interesa, tienes preferencia de horario?",time:"17:32"},
    {id:2,from:"user",  text:"Hola! Me acomoda el sabado por la manana, entre las 9 y las 12.",time:"17:33"},
    {id:3,from:"worker",text:"Perfecto, el sabado a las 9:00 me viene bien. Llego con todos mis materiales. La direccion es en Providencia?",time:"17:34"},
    {id:4,from:"user",  text:"Si, Av. Providencia 1234, piso 5. Hay estacionamiento de visitas.",time:"17:35"},
    {id:5,from:"worker",text:"Excelente! Todo claro. Cuando quieras enviame la propuesta formal para confirmar.",time:"17:36"},
  ]);

  function send() {
    if (!input.trim()) return;
    const txt = input; setInput("");
    setMsgs(m=>[...m,{id:Date.now(),from:"user",text:txt,time:"ahora"}]);
    setTimeout(()=>{
      setMsgs(m=>[...m,{id:Date.now()+1,from:"worker",text:"Anotado, gracias. Algo mas que coordinar?",time:"ahora"}]);
    },1100);
  }

  function sendProposal() {
    if (!selectedDay||!selectedTime){ setShowSchedule(true); return; }
    setStage("proposed");
    setMsgs(m=>[...m,{id:Date.now(),from:"user",text:"Te envio la propuesta formal",time:"ahora"}]);
    setTimeout(()=>{
      setMsgs(m=>[...m,{id:Date.now()+1,from:"worker",type:"accepted",
        text:"Propuesta aceptada! Confirmo para el "+selectedDay+" a las "+selectedTime+". Estare puntual con todo el equipo.",time:"ahora"}]);
      setStage("accepted");
    },2200);
  }

  if (stage==="match") {
    return (
      <div style={{position:"absolute",inset:0,top:50,overflowY:"auto",background:T.white}}>
        <div style={{background:"linear-gradient(180deg,"+T.limeL+",white)",padding:"40px 24px 0",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{position:"relative",marginBottom:16}}>
            <div style={{width:92,height:92,borderRadius:46,overflow:"hidden",border:"4px solid "+T.lime,boxShadow:"0 0 0 8px "+T.limeL}}>
              <img src={workerAvatar} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div style={{position:"absolute",bottom:-2,right:-2,width:32,height:32,borderRadius:16,background:T.lime,border:"3px solid white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✓</div>
          </div>
          <h2 style={{fontSize:32,fontWeight:900,margin:"0 0 4px",letterSpacing:-1}}>Match!</h2>
          <p style={{color:T.gray2,textAlign:"center",fontSize:14,margin:"0 0 8px",lineHeight:1.5}}>
            <strong style={{color:T.black}}>{matched ? matched.name : ""}</strong> ha aceptado tu propuesta
          </p>
          <div style={{background:T.lime,borderRadius:20,padding:"5px 16px",marginBottom:24}}>
            <span style={{color:T.green,fontSize:13,fontWeight:800}}>📅 {selectedDay} - {selectedTime}</span>
          </div>
        </div>
        <div style={{padding:"0 20px 32px"}}>
          <div style={{background:T.gray5,borderRadius:18,padding:"16px",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <div style={{width:44,height:44,borderRadius:22,overflow:"hidden"}}>
                <img src={workerAvatar} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontWeight:700,fontSize:15,margin:0}}>{matched ? matched.name : ""}</p>
                <p style={{color:T.gray3,fontSize:12,margin:0}}>⭐ {matched ? matched.rating : ""} - {svc}</p>
              </div>
              <div style={{textAlign:"right"}}>
                <p style={{fontWeight:900,fontSize:20,color:T.limeD,margin:0}}>{fmt(price)}</p>
                <p style={{color:T.gray3,fontSize:11,margin:0}}>/trabajo</p>
              </div>
            </div>
            <div style={{background:T.white,borderRadius:12,padding:"10px 12px",display:"flex",gap:8,alignItems:"center"}}>
              <span>🔒</span>
              <span style={{fontSize:13,color:T.gray2,lineHeight:1.4}}>Pago retenido en escrow. Se libera cuando confirmes que el trabajo quedo bien.</span>
            </div>
          </div>
          <button onClick={()=>setS("payment")} style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"17px",color:T.green,fontSize:16,fontWeight:900,cursor:"pointer",marginBottom:10}}>
            💳 Pagar y confirmar chamba
          </button>
          <button onClick={()=>setStage("accepted")} style={{width:"100%",background:"none",border:"1px solid "+T.border,borderRadius:14,padding:"12px",color:T.gray2,fontSize:13,cursor:"pointer"}}>
            Volver al chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:"absolute",inset:0,top:50,display:"flex",flexDirection:"column",background:T.white}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:"0.5px solid "+T.border}}>
        <button onClick={()=>setS("feed")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <div style={{width:42,height:42,borderRadius:21,overflow:"hidden",border:"2px solid "+(stage==="accepted"?T.lime:T.border)}}>
          <img src={workerAvatar} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        </div>
        <div style={{flex:1}}>
          <p style={{fontWeight:700,fontSize:15,margin:0}}>{matched ? matched.name : ""}</p>
          <p style={{fontSize:12,margin:0,color:stage==="accepted"?T.limeD:stage==="proposed"?"#F59E0B":"#22C55E",fontWeight:stage==="accepted"?700:400}}>
            {stage==="accepted"?"✅ Propuesta aceptada - Listo para pagar":stage==="proposed"?"Esperando respuesta...":"En linea"}
          </p>
        </div>
        {stage==="accepted" && (
          <button onClick={()=>setStage("match")} style={{background:T.lime,border:"none",borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:800,color:T.green,cursor:"pointer"}}>
            Match!
          </button>
        )}
      </div>
      <ChatRulesInfo/>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map(msg=>(
          <div key={msg.id} style={{display:"flex",justifyContent:msg.from==="user"?"flex-end":"flex-start"}}>
            {msg.from==="worker" && (
              <div style={{width:30,height:30,borderRadius:15,overflow:"hidden",marginRight:8,flexShrink:0,alignSelf:"flex-end"}}>
                <img src={workerAvatar} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
            )}
            <div style={{maxWidth:"74%"}}>
              <div style={{background:msg.type==="accepted"?T.limeL:msg.from==="user"?T.black:T.gray5,
                border:msg.type==="accepted"?"1.5px solid "+T.lime:"none",
                borderRadius:msg.from==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"10px 14px"}}>
                <p style={{color:msg.type==="accepted"?T.green:msg.from==="user"?T.white:T.dark,fontSize:14,margin:0,lineHeight:1.5}}>{msg.text}</p>
              </div>
              <p style={{color:T.gray3,fontSize:11,margin:"3px 0 0",textAlign:msg.from==="user"?"right":"left"}}>{msg.time}</p>
            </div>
          </div>
        ))}
        {(stage==="proposed"||stage==="accepted") && (
          <div style={{background:stage==="accepted"?T.limeL:"#F0F9FF",border:"1.5px solid "+(stage==="accepted"?T.lime:"#BAE6FD"),borderRadius:16,padding:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:18}}>{stage==="accepted"?"✅":"📋"}</span>
              <p style={{fontWeight:800,fontSize:14,color:stage==="accepted"?T.green:"#0369A1",margin:0}}>
                {stage==="accepted"?"Propuesta aceptada!":"Propuesta enviada - Esperando confirmacion"}
              </p>
            </div>
            {[["Servicio",svc],["Fecha",selectedDay],["Hora",selectedTime],["Total",fmt(price)]].map(([l,v],i,arr)=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,
                color:stage==="accepted"?T.green:"#0369A1",
                fontWeight:arr.length-1===i?800:400,
                borderTop:arr.length-1===i?"1px solid "+(stage==="accepted"?T.lime:"#BAE6FD"):"none",
                paddingTop:arr.length-1===i?8:0,marginBottom:arr.length-1>i?4:0}}>
                <span>{l}</span><span style={{fontWeight:700}}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {showSchedule && stage==="chat" && (
        <div style={{background:T.gray5,borderTop:"0.5px solid "+T.border,padding:"12px 16px"}}>
          <p style={{fontWeight:700,fontSize:13,margin:"0 0 8px"}}>📅 Elige fecha y hora disponible</p>
          <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:8,paddingBottom:2}}>
            {DAYS.map(d=>(
              <div key={d} onClick={()=>setSelectedDay(d)}
                style={{flexShrink:0,background:selectedDay===d?T.black:T.white,border:"1.5px solid "+(selectedDay===d?T.black:T.border),borderRadius:20,padding:"6px 12px",cursor:"pointer"}}>
                <span style={{fontSize:12,fontWeight:700,color:selectedDay===d?T.white:T.dark}}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {TIMES.map(t=>(
              <div key={t} onClick={()=>setSelectedTime(t)}
                style={{background:selectedTime===t?T.lime:T.white,border:"1.5px solid "+(selectedTime===t?T.lime:T.border),borderRadius:20,padding:"6px 14px",cursor:"pointer"}}>
                <span style={{fontSize:12,fontWeight:700,color:selectedTime===t?T.green:T.dark}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{borderTop:"0.5px solid "+T.border,padding:"10px 16px 14px",background:T.white}}>
        {stage==="chat" && (
          <button onClick={sendProposal}
            style={{width:"100%",background:selectedDay&&selectedTime?T.black:T.gray5,border:"none",borderRadius:12,padding:"11px",fontSize:13,fontWeight:700,
              color:selectedDay&&selectedTime?T.white:T.gray3,cursor:"pointer",marginBottom:8}}>
            {selectedDay&&selectedTime?"📋 Enviar propuesta - "+selectedDay+" "+selectedTime:"📋 Enviar propuesta de fecha y precio"}
          </button>
        )}
        {stage==="accepted" && (
          <button onClick={()=>setStage("match")}
            style={{width:"100%",background:T.lime,border:"none",borderRadius:12,padding:"13px",fontSize:15,fontWeight:900,color:T.green,cursor:"pointer",marginBottom:8}}>
            Ir al pago
          </button>
        )}
        {stage==="proposed" && (
          <div style={{background:T.gray5,borderRadius:12,padding:"11px",textAlign:"center",marginBottom:8}}>
            <span style={{color:T.gray3,fontSize:13}}>Esperando que {workerName} confirme...</span>
          </div>
        )}
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1,display:"flex",alignItems:"center",background:T.gray5,borderRadius:24,padding:"10px 16px",gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}}
              placeholder="Escribe un mensaje..." style={{flex:1,background:"none",border:"none",outline:"none",fontSize:14}}/>
          </div>
          <button onClick={send} disabled={!input}
            style={{width:44,height:44,borderRadius:22,background:input?T.black:T.gray5,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:input?"pointer":"default",fontSize:18,flexShrink:0}}>
            <span style={{color:input?T.white:T.gray3}}>^</span>
          </button>
        </div>
      </div>
    </div>
  );
}


function AgendaScreen({ go, role, setS, setMatched, setWorker }) {
  const [selDay, setSelDay] = useState(2);
  const [tab, setTab] = useState("agenda");
  const [showHorario, setShowHorario] = useState(false);
  const [horario, setHorario] = useState({
    lu:{on:true,from:"09:00",to:"18:00"},
    ma:{on:true,from:"09:00",to:"18:00"},
    mi:{on:true,from:"09:00",to:"18:00"},
    ju:{on:true,from:"09:00",to:"18:00"},
    vi:{on:true,from:"09:00",to:"18:00"},
    sa:{on:false,from:"09:00",to:"14:00"},
    do:{on:false,from:"09:00",to:"14:00"},
  });
  const [mobilEnabled, setMobilEnabled] = useState(true);
  const [mobilFee, setMobilFee] = useState(4000);

  const DAYS_SHORT = ["Lu","Ma","Mi","Ju","Vi","Sa","Do"];
  const DAYS_KEYS  = ["lu","ma","mi","ju","vi","sa","do"];
  const HOURS = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];

  const JOBS_WORKER = [
    {id:1,employer:"Maria Gonzalez",service:"Aseo profundo 3 ambientes",date:"Mar 28 Mayo",time:"09:00",duration:"3h",price:35000,status:"confirmado",avatar:"https://i.pravatar.cc/150?img=32",address:"Las Condes"},
    {id:2,employer:"Pedro Soto",service:"Aseo general + ventanas",date:"Jue 30 Mayo",time:"10:00",duration:"4h",price:42000,status:"pendiente",avatar:"https://i.pravatar.cc/150?img=14",address:"Providencia"},
    {id:3,employer:"Laura Munoz",service:"Aseo post fiesta",date:"Dom 2 Jun",time:"11:00",duration:"5h",price:60000,status:"confirmado",avatar:"https://i.pravatar.cc/150?img=48",address:"Nunoa"},
  ];

  const JOBS_EMPLOYER = [
    {id:1,worker:"Ana Martinez",service:"Peluquera a domicilio",date:"Mar 28",time:"10:00",price:15000,avatar:"https://i.pravatar.cc/150?img=47",color:"#BE185D",status:"confirmado"},
    {id:2,worker:"Carlos Mendez",service:"Jardinero",date:"Vie 31",time:"09:00",price:12000,avatar:"https://i.pravatar.cc/150?img=11",color:"#22C55E",status:"pendiente"},
    {id:3,worker:"Valentina Cruz",service:"Iluminacion evento",date:"Sab 1 Jun",time:"18:00",price:80000,avatar:"https://i.pravatar.cc/150?img=44",color:"#F97316",status:"confirmado"},
  ];

  const STS = {
    confirmado:{l:"Confirmado",bg:T.limeL,c:T.limeD},
    pendiente:{l:"Pendiente",bg:"#FEF3C7",c:"#92400E"},
  };

  const isWorker = role === "worker";
  const JOBS = isWorker ? JOBS_WORKER : JOBS_EMPLOYER;

  // Earnings summary for worker
  const totalEarnings = JOBS_WORKER.filter(j=>j.status==="confirmado").reduce((s,j)=>s+j.price,0);

  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:78,display:"flex",flexDirection:"column",background:T.gray5}}>

      {/* Header */}
      <div style={{background:T.white,borderBottom:"0.5px solid "+T.border,padding:"12px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <p style={{fontWeight:800,fontSize:18,margin:0}}>Mi agenda</p>
          {isWorker && (
            <button onClick={()=>setShowHorario(h=>!h)}
              style={{background:showHorario?T.black:T.gray5,border:"none",borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:700,color:showHorario?T.white:T.gray2,cursor:"pointer"}}>
              Configurar horario
            </button>
          )}
        </div>

        {/* Week strip */}
        <div style={{display:"flex",gap:4}}>
          {DAYS_SHORT.map((d,i)=>{
            const key = DAYS_KEYS[i];
            const hasJob = JOBS.some((j,_)=>j.date&&j.date.startsWith(d));
            const available = isWorker ? horario[key]?.on : true;
            return (
              <div key={i} onClick={()=>setSelDay(i)}
                style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer"}}>
                <span style={{fontSize:10,color:T.gray3,fontWeight:600}}>{d}</span>
                <div style={{width:34,height:34,borderRadius:17,
                  background:selDay===i?T.lime:!available&&isWorker?"#F3F3F3":"transparent",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  border:selDay===i?"none":"1.5px solid "+(available?"transparent":T.border)}}>
                  <span style={{fontSize:13,fontWeight:700,color:selDay===i?T.green:!available&&isWorker?T.gray4:T.dark}}>{25+i}</span>
                </div>
                <div style={{display:"flex",gap:2}}>
                  {hasJob && <div style={{width:5,height:5,borderRadius:3,background:selDay===i?T.white:T.lime}}/>}
                  {!available && isWorker && <div style={{width:5,height:5,borderRadius:3,background:T.gray4}}/>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horario config panel */}
      {showHorario && isWorker && (
        <div style={{background:T.white,borderBottom:"0.5px solid "+T.border,padding:"16px",overflowY:"auto",maxHeight:340}}>
          <p style={{fontWeight:800,fontSize:15,margin:"0 0 14px"}}>Mi disponibilidad semanal</p>
          {DAYS_KEYS.map((key,i)=>(
            <div key={key} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <span style={{fontSize:13,fontWeight:700,color:horario[key].on?T.dark:T.gray4,width:24}}>{DAYS_SHORT[i]}</span>
              <div onClick={()=>setHorario(h=>({...h,[key]:{...h[key],on:!h[key].on}}))}
                style={{width:44,height:26,borderRadius:13,background:horario[key].on?T.lime:T.gray4,cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0}}>
                <div style={{position:"absolute",top:3,left:horario[key].on?22:3,width:20,height:20,borderRadius:10,background:T.white,boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"all 0.2s"}}/>
              </div>
              {horario[key].on ? (
                <div style={{display:"flex",gap:6,flex:1,alignItems:"center"}}>
                  <select value={horario[key].from} onChange={e=>setHorario(h=>({...h,[key]:{...h[key],from:e.target.value}}))}
                    style={{flex:1,border:"1.5px solid "+T.border,borderRadius:8,padding:"5px 8px",fontSize:13,outline:"none",fontFamily:"inherit"}}>
                    {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
                  </select>
                  <span style={{color:T.gray3,fontSize:12}}>a</span>
                  <select value={horario[key].to} onChange={e=>setHorario(h=>({...h,[key]:{...h[key],to:e.target.value}}))}
                    style={{flex:1,border:"1.5px solid "+T.border,borderRadius:8,padding:"5px 8px",fontSize:13,outline:"none",fontFamily:"inherit"}}>
                    {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ) : (
                <span style={{color:T.gray4,fontSize:13,flex:1}}>No disponible</span>
              )}
            </div>
          ))}

          <div style={{borderTop:"0.5px solid "+T.border,paddingTop:14,marginTop:4}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div>
                <p style={{fontWeight:700,fontSize:14,margin:"0 0 2px"}}>Cobro de movilizacion</p>
                <p style={{color:T.gray3,fontSize:12,margin:0}}>Cargo extra cuando el empleador esta lejos</p>
              </div>
              <div onClick={()=>setMobilEnabled(b=>!b)}
                style={{width:44,height:26,borderRadius:13,background:mobilEnabled?T.lime:T.gray4,cursor:"pointer",position:"relative",transition:"all 0.2s"}}>
                <div style={{position:"absolute",top:3,left:mobilEnabled?22:3,width:20,height:20,borderRadius:10,background:T.white,transition:"all 0.2s"}}/>
              </div>
            </div>
            {mobilEnabled && (
              <div style={{display:"flex",alignItems:"center",border:"1.5px solid "+T.black,borderRadius:10,overflow:"hidden"}}>
                <span style={{padding:"10px 12px",background:T.gray5,fontWeight:700,borderRight:"1px solid "+T.border}}>$</span>
                <input type="number" value={mobilFee} onChange={e=>setMobilFee(parseInt(e.target.value)||0)}
                  style={{flex:1,padding:"10px",border:"none",outline:"none",fontSize:15,fontFamily:"inherit",fontWeight:700}}/>
                <span style={{padding:"10px 12px",color:T.gray3,fontSize:13}}>por viaje</span>
              </div>
            )}
          </div>
          <button onClick={()=>setShowHorario(false)}
            style={{width:"100%",background:T.lime,border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:700,color:T.green,cursor:"pointer",marginTop:14}}>
            Guardar horario
          </button>
        </div>
      )}

      {/* Earnings banner (worker only) */}
      {isWorker && !showHorario && (
        <div style={{background:T.green,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,margin:"0 0 2px"}}>Ingresos confirmados esta semana</p>
            <p style={{color:T.lime,fontWeight:900,fontSize:22,margin:0,letterSpacing:-0.5}}>{fmt(totalEarnings)}</p>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,margin:"0 0 2px"}}>Proximos trabajos</p>
            <p style={{color:T.white,fontWeight:800,fontSize:18,margin:0}}>{JOBS_WORKER.length}</p>
          </div>
        </div>
      )}

      {/* Job list */}
      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{background:T.white,padding:"14px 16px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{fontWeight:800,fontSize:15}}>
              {isWorker?"Mis trabajos programados":"Chambas contratadas"}
            </span>
            <span style={{color:T.gray3,fontSize:12}}>{JOBS.length} esta semana</span>
          </div>
          {JOBS.length === 0 ? (
            <div style={{textAlign:"center",padding:"30px 0"}}>
              <span style={{fontSize:40}}>📅</span>
              <p style={{fontWeight:700,fontSize:15,margin:"10px 0 4px"}}>Sin chambas esta semana</p>
              <p style={{color:T.gray3,fontSize:13,margin:0}}>Los trabajos confirmados apareceran aqui</p>
            </div>
          ) : JOBS.map((job,i)=>(
            <div key={job.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:JOBS.length-1>i?"0.5px solid "+T.border:"none",alignItems:"flex-start"}}>
              <div style={{width:48,height:48,borderRadius:24,overflow:"hidden",border:"2px solid "+(job.color||T.lime)+"44",flexShrink:0}}>
                <Img src={job.avatar} style={{width:"100%",height:"100%"}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1,paddingRight:8}}>
                    <p style={{fontWeight:700,fontSize:14,margin:"0 0 2px"}}>{isWorker?job.employer:job.worker}</p>
                    <p style={{color:T.gray3,fontSize:12,margin:"0 0 6px"}}>{job.service}</p>
                  </div>
                  <span style={{fontWeight:800,color:T.limeD,fontSize:14,flexShrink:0}}>{fmt(job.price)}</span>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                  <span style={{background:STS[job.status].bg,color:STS[job.status].c,fontSize:10,fontWeight:700,borderRadius:10,padding:"2px 8px"}}>{STS[job.status].l}</span>
                  <span style={{color:T.gray3,fontSize:11}}>📅 {job.date}</span>
                  <span style={{color:T.gray3,fontSize:11}}>🕐 {job.time}</span>
                  {isWorker && job.duration && <span style={{color:T.gray3,fontSize:11}}>{job.duration}</span>}
                  {isWorker && job.address && <span style={{color:T.gray3,fontSize:11}}>📍 {job.address}</span>}
                </div>
                {isWorker && (
                  <div style={{display:"flex",gap:8,marginTop:8}}>
                    <button style={{flex:1,background:T.gray5,border:"none",borderRadius:10,padding:"8px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Ver detalles</button>
                    <button style={{flex:1,background:T.limeL,border:"none",borderRadius:10,padding:"8px",fontSize:12,fontWeight:700,color:T.limeD,cursor:"pointer"}}>Chat empleador</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Worker: hours summary */}
        {isWorker && !showHorario && (
          <div style={{background:T.white,padding:"14px 16px"}}>
            <p style={{fontWeight:800,fontSize:15,margin:"0 0 12px"}}>Mi horario activo</p>
            <div style={{display:"flex",gap:4}}>
              {DAYS_KEYS.map((key,i)=>(
                <div key={key} style={{flex:1,textAlign:"center"}}>
                  <div style={{background:horario[key].on?T.limeL:T.gray5,borderRadius:8,padding:"8px 2px",marginBottom:4}}>
                    <span style={{fontSize:10,fontWeight:700,color:horario[key].on?T.limeD:T.gray4}}>{DAYS_SHORT[i]}</span>
                  </div>
                  {horario[key].on ? (
                    <div>
                      <p style={{fontSize:9,color:T.gray3,margin:"2px 0 0",fontWeight:600}}>{horario[key].from}</p>
                      <p style={{fontSize:9,color:T.gray3,margin:0,fontWeight:600}}>{horario[key].to}</p>
                    </div>
                  ) : (
                    <p style={{fontSize:9,color:T.gray4,margin:"2px 0 0"}}>libre</p>
                  )}
                </div>
              ))}
            </div>
            <button onClick={()=>setShowHorario(true)}
              style={{width:"100%",background:T.gray5,border:"none",borderRadius:12,padding:"11px",fontSize:13,fontWeight:600,color:T.gray2,cursor:"pointer",marginTop:12}}>
              Editar disponibilidad
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsScreen({ setS }) {
  const [notifs, setNotifs] = useState([
    {id:1,type:"match",read:false,time:"hace 2 min",icon:"🎉",title:"Nuevo match!",body:"Ana Martinez acepto tu propuesta",action:"configure"},
    {id:2,type:"payment",read:false,time:"hace 1 hora",icon:"💰",title:"Pago recibido",body:"Recibiste $31.500 por el aseo del lunes",action:"insignias"},
    {id:3,type:"review",read:false,time:"hace 3 horas",icon:"⭐",title:"Nueva calificacion",body:"Carlos te dejo 5 estrellas",action:"profile"},
    {id:4,type:"chat",read:true,time:"ayer",icon:"💬",title:"Mensaje de Valentina",body:"Confirmas para el sabado a las 10?",action:"chat"},
    {id:5,type:"reminder",read:true,time:"ayer",icon:"📅",title:"Recordatorio manana",body:"Tienes aseo programado con Laura Munoz",action:"agenda"},
  ]);
  const unread = notifs.filter(n=>!n.read).length;
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:78,display:"flex",flexDirection:"column",background:T.gray5}}>
      <div style={{background:T.white,borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setS("feed")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
          <div>
            <p style={{fontWeight:800,fontSize:16,margin:0}}>Notificaciones</p>
            {unread > 0 && <p style={{color:T.limeD,fontSize:12,margin:0,fontWeight:600}}>{unread} sin leer</p>}
          </div>
        </div>
        {unread > 0 && <button onClick={()=>setNotifs(ns=>ns.map(n=>({...n,read:true})))} style={{background:"none",border:"none",color:T.limeD,fontSize:13,fontWeight:600,cursor:"pointer"}}>Marcar todo leido</button>}
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        {notifs.map(n=>(
          <div key={n.id} onClick={()=>setS(n.action)} style={{background:n.read?T.white:"#F0FDF4",borderBottom:"0.5px solid "+T.border,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer",opacity:n.read?0.75:1}}>
            <div style={{width:44,height:44,borderRadius:22,background:n.read?T.gray5:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
              {n.icon}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <p style={{fontWeight:n.read?600:800,fontSize:14,margin:"0 0 2px"}}>{n.title}</p>
                <span style={{color:T.gray3,fontSize:11,flexShrink:0,marginLeft:8}}>{n.time}</span>
              </div>
              <p style={{color:T.dark,fontSize:13,margin:0,lineHeight:1.4}}>{n.body}</p>
            </div>
            {!n.read && <div style={{width:8,height:8,borderRadius:4,background:T.lime,flexShrink:0,marginTop:6}}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// -- PROFILE SCREEN --------------------------------------------
function EmployerProfile({ setS, setRole, matches }) {
  const BG_EMP = "#1A1A2E";
  const HIRED = [
    {id:1,worker:"Ana Martinez",service:"Peluquera a domicilio",date:"Vie 24 Mayo",price:15000,rating:5,avatar:"https://i.pravatar.cc/150?img=47",color:"#BE185D"},
    {id:2,worker:"Carlos Mendez",service:"Jardinero",date:"Mie 22 Mayo",price:12000,rating:5,avatar:"https://i.pravatar.cc/150?img=11",color:"#22C55E"},
    {id:3,worker:"Valentina Cruz",service:"Iluminacion evento",date:"Sab 18 Mayo",price:80000,rating:5,avatar:"https://i.pravatar.cc/150?img=44",color:"#F97316"},
  ];
  const FAVORITES = [
    {id:1,name:"Ana",avatar:"https://i.pravatar.cc/150?img=47",color:"#BE185D",service:"Peluquera",rating:4.9,jobs:3},
    {id:2,name:"Carlos",avatar:"https://i.pravatar.cc/150?img=11",color:"#22C55E",service:"Jardinero",rating:4.8,jobs:2},
    {id:3,name:"Valentina",avatar:"https://i.pravatar.cc/150?img=44",color:"#F97316",service:"Eventos",rating:5.0,jobs:1},
    {id:4,name:"Diego",avatar:"https://i.pravatar.cc/150?img=60",color:"#06B6D4",service:"Editor",rating:4.8,jobs:1},
  ];
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:78,overflowY:"auto",background:"#F5F7FA"}}>

      {/* Header */}
      <div style={{background:T.green,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:16,fontWeight:700,color:T.lime}}>@juliamorales</span>
        <button onClick={()=>setRole("worker")} style={{background:"rgba(168,212,41,0.15)",border:"1px solid "+T.lime,borderRadius:20,padding:"7px 16px",color:T.lime,fontSize:12,fontWeight:700,cursor:"pointer"}}>
          🔧 Modo Trabajadora
        </button>
      </div>

      {/* Cover + avatar + info */}
      <div style={{background:"#F8FAF5",marginBottom:8,borderBottom:"0.5px solid #D4E6C3"}}>
        <div style={{height:100,background:"linear-gradient(135deg,"+T.green+",#2D5A00)",position:"relative"}}>
          <div style={{position:"absolute",bottom:-28,left:16}}>
            <div style={{width:64,height:64,borderRadius:32,overflow:"hidden",border:"3px solid "+T.white,background:T.gray4}}>
              <Img src={JULIA.avatar} style={{width:"100%",height:"100%"}}/>
            </div>
          </div>
          <div style={{position:"absolute",bottom:10,right:16}}>
            <button style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:20,padding:"6px 14px",color:T.white,fontSize:12,fontWeight:600,cursor:"pointer"}}>
              Editar perfil
            </button>
          </div>
        </div>
        <div style={{padding:"36px 16px 16px"}}>
          <p style={{fontSize:20,fontWeight:800,margin:"0 0 2px"}}>Julia Morales</p>
          <p style={{color:T.gray3,fontSize:13,margin:"0 0 12px"}}>📍 Providencia  -  Empleadora desde 2024</p>

          {/* Employer rating */}
          <div style={{background:T.limeL,borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
            <div style={{textAlign:"center"}}>
              <p style={{fontWeight:900,fontSize:22,color:T.green,margin:0,lineHeight:1}}>4.8</p>
              <p style={{fontSize:10,color:T.limeD,margin:"2px 0 0",fontWeight:600}}>tu rating</p>
            </div>
            <div style={{width:1,height:36,background:T.lime}}/>
            <div style={{flex:1}}>
              <p style={{fontWeight:700,fontSize:13,color:T.green,margin:"0 0 3px"}}>Empleadora bien calificada ✅</p>
              <p style={{fontSize:11,color:T.limeD,margin:0,lineHeight:1.4}}>Los trabajadores te califican tras cada chamba. Un buen rating atrae mejores profesionales.</p>
            </div>
          </div>

          {/* Stats */}
          <div style={{display:"flex",gap:0,borderTop:"0.5px solid rgba(255,255,255,0.1)",paddingTop:12}}>
            {[
              {v:(matches||[]).length||4,l:"chambas"},
              {v:"$107k",l:"gastado"},
              {v:"4",l:"favoritos"},
            ].map((s,i,arr)=>(
              <div key={i} style={{flex:1,textAlign:"center",borderRight:arr.length-1>i?"0.5px solid "+T.border:"none"}}>
                <div style={{fontSize:18,fontWeight:800}}>{s.v}</div>
                <div style={{color:T.gray3,fontSize:11}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chamba Wallet */}
      <div style={{background:"#111827",marginBottom:2,padding:"14px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontWeight:800,fontSize:15,color:T.white}}>💳 Chamba Wallet</span>
          <span style={{background:T.limeL,color:T.limeD,fontSize:11,fontWeight:700,borderRadius:20,padding:"3px 10px"}}>Activa</span>
        </div>
        <div style={{background:"linear-gradient(135deg,"+T.green+",#2D5A00)",borderRadius:16,padding:"16px",marginBottom:12}}>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,margin:"0 0 4px"}}>Saldo disponible</p>
          <p style={{color:T.lime,fontWeight:900,fontSize:28,margin:"0 0 12px",letterSpacing:-1}}>$47.500</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{flex:1,marginRight:12}}>
              <p style={{color:"rgba(255,255,255,0.4)",fontSize:10,margin:"0 0 4px"}}>Limite mensual</p>
              <div style={{height:5,borderRadius:3,background:"rgba(255,255,255,0.15)",overflow:"hidden"}}>
                <div style={{width:"63%",height:"100%",borderRadius:3,background:T.lime}}/>
              </div>
            </div>
            <span style={{color:"rgba(255,255,255,0.7)",fontSize:11,fontWeight:700,flexShrink:0}}>$47.5k / $75k</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <button style={{background:T.lime,border:"none",borderRadius:12,padding:"11px",fontSize:13,fontWeight:700,color:T.green,cursor:"pointer"}}>+ Cargar saldo</button>
          <button style={{background:T.gray5,border:"none",borderRadius:12,padding:"11px",fontSize:13,fontWeight:600,color:T.dark,cursor:"pointer"}}>Ver historial</button>
        </div>
      </div>

      {/* Trabajadores favoritos */}
      <div style={{background:"#111827",marginBottom:2,padding:"14px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontWeight:800,fontSize:15,color:T.white}}>❤️ Mis favoritos</span>
          <span onClick={()=>setS("search")} style={{color:T.limeD,fontSize:12,fontWeight:600,cursor:"pointer"}}>Buscar mas</span>
        </div>
        <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4}}>
          {FAVORITES.map(w=>(
            <div key={w.id} style={{flexShrink:0,textAlign:"center",width:72}}>
              <div style={{width:56,height:56,borderRadius:28,overflow:"hidden",border:"2.5px solid "+w.color,margin:"0 auto 5px"}}>
                <Img src={w.avatar} style={{width:"100%",height:"100%"}}/>
              </div>
              <p style={{fontSize:12,fontWeight:700,margin:"0 0 1px"}}>{w.name}</p>
              <p style={{fontSize:10,color:T.gray3,margin:"0 0 1px"}}>{w.service}</p>
              <p style={{fontSize:10,color:T.limeD,fontWeight:700,margin:"0 0 3px"}}>⭐{w.rating}</p>
              <span style={{background:T.gray5,color:T.gray3,fontSize:9,borderRadius:10,padding:"1px 6px"}}>{w.jobs} veces</span>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de chambas */}
      <div style={{background:"#111827",marginBottom:2,padding:"14px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontWeight:800,fontSize:15,color:T.white}}>Chambas contratadas</span>
          <span style={{color:T.gray3,fontSize:12}}>{HIRED.length} este mes</span>
        </div>
        {HIRED.map((h,i)=>(
          <div key={h.id} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:HIRED.length-1>i?"0.5px solid "+T.border:"none"}}>
            <div style={{width:48,height:48,borderRadius:24,overflow:"hidden",border:"2px solid "+h.color+"33",flexShrink:0}}>
              <Img src={h.avatar} style={{width:"100%",height:"100%"}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontWeight:700,fontSize:14}}>{h.worker}</span>
                <span style={{fontWeight:800,fontSize:14,color:T.limeD}}>{fmt(h.price)}</span>
              </div>
              <span style={{color:T.gray2,fontSize:12}}>{h.service}</span>
              <div style={{display:"flex",gap:8,marginTop:4,alignItems:"center"}}>
                <span style={{color:T.gray3,fontSize:11}}>📅 {h.date}</span>
                <span style={{background:"#DCFCE7",color:"#15803D",fontSize:10,fontWeight:700,borderRadius:10,padding:"2px 8px"}}>completado</span>
                <span style={{fontSize:11}}>{"⭐".repeat(h.rating)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen del mes */}
      <div style={{background:"#111827",padding:"14px 16px"}}>
        <p style={{fontWeight:800,fontSize:15,margin:"0 0 12px",color:T.white}}>Resumen del mes</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[
            {icon:"💰",label:"Gastado",value:"$107.000",bg:T.limeL,color:T.green},
            {icon:"🔧",label:"Chambas",value:"3 trabajos",bg:T.gray5,color:T.black},
            {icon:"⭐",label:"Rating como empleadora",value:"4.8 / 5.0",bg:"#FEF3C7",color:"#92400E"},
            {icon:"🔒",label:"Protegido escrow",value:"100%",bg:"#EFF6FF",color:"#1D4ED8"},
          ].map((s,i)=>(
            <div key={i} style={{background:s.bg,borderRadius:12,padding:"12px"}}>
              <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
              <div style={{color:T.gray3,fontSize:11,marginBottom:2}}>{s.label}</div>
              <div style={{fontWeight:800,fontSize:15,color:s.color}}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryViewer({ highlight, onClose }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const story = highlight.stories[idx];
  const total = highlight.stories.length;

  useEffect(()=>{
    setProgress(0);
    if (paused) return;
    const interval = setInterval(()=>{
      setProgress(p=>{
        if (p >= 100) {
          if (idx < total-1) { setIdx(i=>i+1); return 0; }
          else { onClose(); return 100; }
        }
        return p + 2;
      });
    }, 60);
    return ()=>clearInterval(interval);
  },[idx, paused]);

  return (
    <div style={{position:"absolute",inset:0,background:"#000",zIndex:200,display:"flex",flexDirection:"column"}}
      onClick={()=>setPaused(p=>!p)}>
      {/* Progress bars */}
      <div style={{display:"flex",gap:3,padding:"52px 10px 8px",zIndex:10}}>
        {highlight.stories.map((_,i)=>(
          <div key={i} style={{flex:1,height:2.5,borderRadius:2,background:"rgba(255,255,255,0.3)",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:2,background:"#fff",
              width: i < idx ? "100%" : i===idx ? progress+"%" : "0%",transition:i===idx?"none":"none"}}/>
          </div>
        ))}
      </div>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 14px 10px",zIndex:10}}>
        <div style={{width:36,height:36,borderRadius:18,overflow:"hidden",border:"2px solid #fff"}}>
          <Img src={JULIA.avatar} style={{width:"100%",height:"100%"}}/>
        </div>
        <div>
          <p style={{color:"#fff",fontWeight:700,fontSize:14,margin:0}}>{JULIA.name}</p>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:11,margin:0}}>{highlight.name}</p>
        </div>
        <button onClick={e=>{e.stopPropagation();onClose();}}
          style={{marginLeft:"auto",background:"none",border:"none",color:"#fff",fontSize:24,cursor:"pointer"}}>x</button>
      </div>
      {/* Image */}
      <div style={{flex:1,position:"relative",overflow:"hidden"}}>
        <Img src={story.src} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.7))"}}/>
        {story.caption && (
          <div style={{position:"absolute",bottom:20,left:16,right:16}}>
            <p style={{color:"#fff",fontSize:15,fontWeight:600,margin:0,textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>{story.caption}</p>
          </div>
        )}
        {paused && (
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:60,height:60,borderRadius:30,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>
              II
            </div>
          </div>
        )}
      </div>
      {/* Nav */}
      <div style={{position:"absolute",top:"15%",bottom:"15%",left:0,width:"40%"}}
        onClick={e=>{e.stopPropagation();if(idx>0)setIdx(i=>i-1);else onClose();}}/>
      <div style={{position:"absolute",top:"15%",bottom:"15%",right:0,width:"40%"}}
        onClick={e=>{e.stopPropagation();if(total-1>idx)setIdx(i=>i+1);else onClose();}}/>
    </div>
  );
}


const JULIA_POSTS = [
  {id:"p1",src:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",likes:234,caption:"Aseo profundo depto Providencia 🧹✨"},
  {id:"p2",src:"https://images.unsplash.com/photo-1527515637462-cff94edd0e52?w=600&q=80",likes:189,caption:"Antes y despues - cocina como nueva"},
  {id:"p3",src:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",likes:445,caption:"Pinta caritas fiesta de cumpleanos 🎨"},
  {id:"p4",src:"https://images.unsplash.com/photo-1560066984-138daaa7d285?w=600&q=80",likes:312,caption:"Maquillaje para evento corporativo 💄"},
  {id:"p5",src:"https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80",likes:167,caption:"Colorimetria - descubre tus colores"},
  {id:"p6",src:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",likes:89,caption:"Cuidando a Max y Luna hoy 🐾"},
  {id:"p7",src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",likes:201,caption:"Aseo fin de semana - lista para empezar"},
  {id:"p8",src:"https://images.unsplash.com/photo-1583394293214-0b7264b27c80?w=600&q=80",likes:156,caption:"Maquillaje de novia - dia especial"},
  {id:"p9",src:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",likes:78,caption:"Jardin de cliente en Las Condes"},
];


function WorkerProfileScreen({ setS, setRole, setSelectedService }) {
  const [activeStory, setActiveStory] = useState(null);
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:78,overflowY:"auto",background:"#F7FBF0"}}>
      <div style={{background:T.lime,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:16,fontWeight:800,color:T.green}}>juliamorales</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setRole("employer")} style={{background:T.green,border:"none",borderRadius:20,padding:"6px 14px",color:T.lime,fontSize:12,fontWeight:700,cursor:"pointer"}}>👤 Modo Empleador</button>
          <span style={{fontSize:20,cursor:"pointer",color:T.green}}>☰</span>
        </div>
      </div>
      <div style={{background:T.white,marginBottom:8}}>
        <div style={{height:120,background:T.green,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0}}>
            <Img src={JULIA.cover} style={{width:"100%",height:"100%"}}/>
          </div>
        </div>
        <div style={{padding:"0 16px 16px",marginTop:-28}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:10}}>
            <div style={{width:68,height:68,borderRadius:34,overflow:"hidden",border:"3px solid "+T.white}}>
              <Img src={JULIA.avatar} style={{width:"100%",height:"100%"}}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={{background:T.gray5,border:"none",borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>Editar</button>
              <button style={{background:T.black,border:"none",borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:700,color:T.white,cursor:"pointer"}}>Compartir</button>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
            <span style={{fontSize:20,fontWeight:800}}>{JULIA.name}</span>
            <span>✅</span>
          </div>
          <p style={{color:T.gray3,fontSize:13,margin:"0 0 8px"}}>📍 Providencia - @juliamorales</p>
          <p style={{fontSize:14,color:T.dark,lineHeight:1.5,margin:"0 0 12px"}}>{JULIA.bio}</p>
          <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:8}}>
            {["🧹 Limpieza","🎨 Caritas","💄 Maquillaje","🐾 Mascotas","🎨 Colorimetria"].map((tag,i)=>(
              <span key={i} style={{background:T.limeL,color:T.limeD,fontSize:12,fontWeight:700,borderRadius:8,padding:"5px 11px",whiteSpace:"nowrap",flexShrink:0}}>{tag}</span>
            ))}
          </div>
          <p style={{fontSize:11,color:T.gray3,margin:"0 0 12px"}}>✅ Verificada  -  📍 Presencial  -  🕐 09:00-18:00 Lu-Vi  -  🚗 +$4.000</p>
          <div style={{display:"flex",gap:0,borderTop:"0.5px solid "+T.border,paddingTop:12}}>
            {[{v:JULIA.jobs,l:"chambas"},{v:JULIA.followers,l:"seguidores"},{v:JULIA.following,l:"siguiendo"}].map((s,i,arr)=>(
              <div key={i} style={{flex:1,textAlign:"center",borderRight:arr.length-1>i?"0.5px solid "+T.border:"none"}}>
                <div style={{fontSize:17,fontWeight:800}}>{s.v}</div>
                <div style={{color:T.gray3,fontSize:11}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Historias destacadas */}
      <div style={{background:T.white,marginBottom:8,padding:"14px 0 14px 16px"}}>
        <div style={{display:"flex",gap:14,overflowX:"auto",paddingRight:16}}>
          {JULIA.highlights.map(hl=>(
            <div key={hl.id} onClick={()=>setActiveStory(hl)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0,cursor:"pointer"}}>
              <div style={{width:68,height:68,borderRadius:34,padding:2.5,background:"linear-gradient(135deg,"+hl.color+","+hl.color+"88)"}}>
                <div style={{width:"100%",height:"100%",borderRadius:30,overflow:"hidden",border:"2.5px solid "+T.white,background:T.gray5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>
                  {hl.icon}
                </div>
              </div>
              <span style={{fontSize:11,fontWeight:600,color:T.dark,maxWidth:70,textAlign:"center",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{hl.name}</span>
            </div>
          ))}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flexShrink:0,cursor:"pointer"}}>
            <div style={{width:68,height:68,borderRadius:34,border:"2px dashed "+T.border,display:"flex",alignItems:"center",justifyContent:"center",background:T.gray5}}>
              <span style={{fontSize:24,color:T.gray3}}>+</span>
            </div>
            <span style={{fontSize:11,color:T.gray3}}>Agregar</span>
          </div>
        </div>
      </div>

      {/* Video curriculum */}
      <div style={{background:T.white,marginBottom:8,padding:"14px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontWeight:800,fontSize:15}}>Video curriculum</span>
          <span style={{background:T.limeL,color:T.limeD,fontSize:11,fontWeight:700,borderRadius:20,padding:"3px 10px"}}>Nuevo</span>
        </div>
        <div style={{position:"relative",borderRadius:14,overflow:"hidden",background:T.green,paddingBottom:"56.25%"}}>
          <div style={{position:"absolute",inset:0}}>
            <Img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" style={{width:"100%",height:"100%"}} fallback={T.green}/>
          </div>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.4)"}}/>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:56,height:56,borderRadius:28,background:"rgba(255,255,255,0.9)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
              <div style={{width:0,height:0,borderTop:"12px solid transparent",borderBottom:"12px solid transparent",borderLeft:"20px solid "+T.green,marginLeft:6}}/>
            </div>
            <p style={{color:"#fff",fontWeight:700,fontSize:14,margin:"0 0 4px",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Hola soy Julia</p>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:12,margin:0}}>1:32 min</p>
          </div>
          <div style={{position:"absolute",bottom:10,right:10,background:"rgba(0,0,0,0.6)",borderRadius:20,padding:"3px 10px"}}>
            <span style={{color:"#fff",fontSize:11,fontWeight:600}}>Video CV</span>
          </div>
        </div>
        <p style={{color:T.gray3,fontSize:12,margin:"8px 0 0",lineHeight:1.5}}>Soy Julia, limpiadora profesional con 5 anos de experiencia. Trabajo con mis propios materiales y garantizo resultados.</p>
      </div>

      {/* Publicaciones - grid */}
      <div style={{background:T.white,marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px 10px"}}>
          <span style={{fontWeight:800,fontSize:15}}>Publicaciones</span>
          <span style={{color:T.gray3,fontSize:12}}>{JULIA_POSTS.length} fotos</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1.5}}>
          {JULIA_POSTS.map((post,i)=>(
            <div key={post.id} style={{position:"relative",paddingBottom:"100%",background:T.gray5,overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0}}>
                <Img src={post.src} style={{width:"100%",height:"100%"}} fallback={T.gray4}/>
              </div>
              <div style={{position:"absolute",bottom:4,left:5,display:"flex",alignItems:"center",gap:3}}>
                <span style={{fontSize:9}}>❤️</span>
                <span style={{color:"#fff",fontSize:9,fontWeight:700,textShadow:"0 1px 3px rgba(0,0,0,0.8)"}}>{post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div onClick={()=>setS("verify")} style={{background:"linear-gradient(135deg,"+T.green+",#2D5A00)",margin:"0 0 8px",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
        <div style={{width:44,height:44,borderRadius:22,background:"rgba(168,212,41,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>✅</div>
        <div style={{flex:1}}>
          <p style={{color:T.lime,fontWeight:800,fontSize:14,margin:"0 0 2px"}}>Identidad verificada</p>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:12,margin:0}}>Toca para ver tu certificado o re-verificar</p>
        </div>
        <span style={{color:T.lime,fontSize:14,fontWeight:700}}>ver</span>
      </div>
      <div style={{background:T.white,padding:"14px 16px"}}>
        <p style={{fontWeight:800,fontSize:15,margin:"0 0 12px"}}>Resumen de pagos</p>
        <div style={{background:T.limeL,border:"1.5px solid "+T.lime,borderRadius:14,padding:"14px"}}>
          <p style={{fontWeight:700,fontSize:12,color:T.green,textTransform:"uppercase",margin:"0 0 8px"}}>Pago del lunes</p>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:13,color:T.green}}>Total bruto</span>
            <span style={{fontSize:13,fontWeight:600,color:T.green}}>$122.000</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:13,color:T.green}}>Retencion SII 10.75%</span>
            <span style={{fontSize:13,fontWeight:600,color:"#92400E"}}>-$13.115</span>
          </div>
          <div style={{borderTop:"1.5px solid "+T.lime,paddingTop:8,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontWeight:800,fontSize:14,color:T.green}}>Recibes</span>
            <span style={{fontWeight:900,fontSize:22,color:T.green}}>$108.885</span>
          </div>
          <p style={{fontSize:11,color:T.green,margin:"8px 0 0"}}>Boleta emitida al SII automaticamente</p>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ setS, role, setRole, matches, setSelectedService }) {
  if (role !== "worker") {
    return (<EmployerProfile setS={setS} setRole={setRole} matches={matches}/>);
  }
  return (<WorkerProfileScreen setS={setS} setRole={setRole} setSelectedService={setSelectedService}/>);
}

// -- SIMPLE STUB SCREENS ---------------------------------------
function VerifyScreen({ setS }) {
  const [step, setStep] = useState(0);
  const [frontal, setFrontal] = useState(false);
  const [reverso, setReverso] = useState(false);
  const [selfie, setSelfie] = useState(false);
  const [antecedentes, setAntecedentes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(null); // null | "reviewing" | "approved"

  function handleSubmit() {
    setSubmitted(true);
    setStatus("reviewing");
    setTimeout(()=>setStatus("approved"), 4000);
  }

  if (status === "approved") {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:T.white,padding:"0 24px"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"50%",background:"linear-gradient(180deg,"+T.limeL+",white)"}}/>
        <div style={{position:"relative",zIndex:1,width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:100,height:100,borderRadius:50,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,marginBottom:16,boxShadow:"0 0 0 14px "+T.limeL}}>
            ✅
          </div>
          <h1 style={{fontSize:28,fontWeight:900,margin:"0 0 8px",textAlign:"center"}}>Perfil verificado!</h1>
          <p style={{color:T.gray2,textAlign:"center",fontSize:14,margin:"0 0 24px",lineHeight:1.5}}>
            Tu identidad fue confirmada. Ahora apareces con el badge ✅ en tu perfil y tienes mayor visibilidad.
          </p>
          <div style={{width:"100%",background:T.gray5,borderRadius:18,padding:"16px",marginBottom:20}}>
            {[
              {icon:"✅",l:"Identidad verificada",v:"Carnet de identidad"},
              {icon:"🛡",l:"Antecedentes",v:antecedentes?"Sin antecedentes":"No solicitado"},
              {icon:"⭐",l:"Badge en tu perfil",v:"Activo ahora"},
              {icon:"📈",l:"Visibilidad",v:"+40% mas solicitudes"},
            ].map((row,i,arr)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"center",paddingBottom:arr.length-1>i?12:0,marginBottom:arr.length-1>i?12:0,borderBottom:arr.length-1>i?"0.5px solid "+T.border:"none"}}>
                <div style={{width:36,height:36,borderRadius:18,background:T.limeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                  {row.icon}
                </div>
                <div style={{flex:1,display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:13,color:T.gray2}}>{row.l}</span>
                  <span style={{fontSize:13,fontWeight:700,color:T.green}}>{row.v}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=>setS("profile")}
            style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:800,color:T.green,cursor:"pointer"}}>
            Ver mi perfil verificado
          </button>
        </div>
      </div>
    );
  }

  if (status === "reviewing") {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:T.white,padding:"0 24px"}}>
        <div style={{fontSize:52,marginBottom:16}}>🔍</div>
        <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 8px",textAlign:"center"}}>En revision</h2>
        <p style={{color:T.gray2,textAlign:"center",margin:"0 0 24px",lineHeight:1.5}}>
          Estamos verificando tu identidad. Esto puede tomar entre 5 y 30 minutos.
        </p>
        <div style={{width:"100%",background:T.gray5,borderRadius:16,padding:"16px",marginBottom:20}}>
          {[
            {icon:"✅",l:"Documentos recibidos",done:true},
            {icon:"🔍",l:"Verificando identidad",done:false},
            {icon:"🛡",l:"Revision de antecedentes",done:false},
            {icon:"✅",l:"Activar badge verificado",done:false},
          ].map((row,i)=>(
            <div key={i} style={{display:"flex",gap:12,alignItems:"center",marginBottom:3>i?0:12}}>
              <div style={{width:32,height:32,borderRadius:16,background:row.done?T.lime:T.gray5,border:"1.5px solid "+(row.done?T.lime:T.border),display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                {row.done?"✓":""}
              </div>
              <span style={{fontSize:14,fontWeight:row.done?700:400,color:row.done?T.green:T.gray3}}>{row.l}</span>
            </div>
          ))}
        </div>
        <p style={{color:T.gray3,fontSize:12,textAlign:"center"}}>Te notificaremos cuando este listo</p>
      </div>
    );
  }

  // Step 0: Intro
  if (step === 0) {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
        <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setS("profile")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
          <span style={{fontWeight:700,fontSize:15}}>Verificar identidad</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"24px 20px"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{width:80,height:80,borderRadius:40,background:T.limeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 16px"}}>
              🛡
            </div>
            <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 8px"}}>Verifica tu identidad</h2>
            <p style={{color:T.gray2,fontSize:14,margin:0,lineHeight:1.6}}>
              Los perfiles verificados generan mas confianza y reciben hasta 40% mas solicitudes de trabajo.
            </p>
          </div>

          <div style={{marginBottom:24}}>
            {[
              {icon:"🪪",title:"Carnet de identidad",desc:"Foto frontal y reverso de tu cedula de identidad vigente"},
              {icon:"🤳",title:"Selfie con carnet",desc:"Una foto tuya sosteniendo el carnet para confirmar que eres tu"},
              {icon:"🛡",title:"Antecedentes penales",desc:"Opcional - aumenta la confianza de los empleadores"},
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:2>i?"0.5px solid "+T.border:"none"}}>
                <div style={{width:44,height:44,borderRadius:22,background:T.limeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                  {item.icon}
                </div>
                <div>
                  <p style={{fontWeight:700,fontSize:14,margin:"0 0 3px"}}>{item.title}</p>
                  <p style={{color:T.gray3,fontSize:12,margin:0,lineHeight:1.4}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{background:"#EFF6FF",borderRadius:14,padding:"14px",marginBottom:24,display:"flex",gap:10}}>
            <span style={{fontSize:20,flexShrink:0}}>🔒</span>
            <div>
              <p style={{fontWeight:700,fontSize:13,color:"#1D4ED8",margin:"0 0 3px"}}>Tus datos estan seguros</p>
              <p style={{fontSize:12,color:"#3B82F6",margin:0,lineHeight:1.5}}>
                Usamos cifrado de nivel bancario. Tus documentos solo se usan para verificacion y se eliminan despues.
              </p>
            </div>
          </div>
        </div>
        <div style={{padding:"12px 20px 24px",borderTop:"0.5px solid "+T.border}}>
          <button onClick={()=>setStep(1)}
            style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:T.green,cursor:"pointer",marginBottom:10}}>
            Comenzar verificacion
          </button>
          <button onClick={()=>setS("profile")}
            style={{width:"100%",background:"none",border:"none",color:T.gray3,fontSize:13,cursor:"pointer",padding:"8px"}}>
            Hacerlo despues
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Carnet frontal
  if (step === 1) {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
        <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setStep(0)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
          <div style={{flex:1}}>
            <span style={{fontWeight:700,fontSize:15}}>Carnet de identidad</span>
            <div style={{display:"flex",gap:4,marginTop:4}}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{flex:1,height:3,borderRadius:2,background:1>i?T.lime:T.gray5}}/>
              ))}
            </div>
          </div>
          <span style={{fontSize:12,color:T.gray3}}>1/4</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"24px 20px"}}>
          <p style={{fontWeight:800,fontSize:18,margin:"0 0 6px"}}>Foto frontal del carnet</p>
          <p style={{color:T.gray3,fontSize:13,margin:"0 0 24px",lineHeight:1.5}}>
            Asegurate de que el carnet este bien iluminado y todos los datos sean legibles.
          </p>

          <div onClick={()=>setFrontal(true)}
            style={{border:"2px dashed "+(frontal?T.lime:T.border),borderRadius:20,padding:"32px 20px",textAlign:"center",cursor:"pointer",background:frontal?T.limeL:T.gray5,marginBottom:20,transition:"all 0.2s"}}>
            {frontal ? (
              <div>
                <div style={{fontSize:48,marginBottom:8}}>🪪</div>
                <p style={{fontWeight:700,fontSize:15,color:T.green,margin:"0 0 4px"}}>Foto cargada</p>
                <p style={{fontSize:12,color:T.limeD,margin:0}}>Toca para cambiar</p>
              </div>
            ) : (
              <div>
                <div style={{fontSize:48,marginBottom:12}}>📷</div>
                <p style={{fontWeight:700,fontSize:15,margin:"0 0 6px"}}>Toca para tomar foto</p>
                <p style={{color:T.gray3,fontSize:12,margin:0}}>o subir desde tu galeria</p>
              </div>
            )}
          </div>

          <div style={{background:T.gray5,borderRadius:14,padding:"14px"}}>
            <p style={{fontWeight:700,fontSize:13,margin:"0 0 10px"}}>La foto debe mostrar:</p>
            {["Nombres y apellidos completos","Numero de RUT","Fecha de nacimiento","Foto de rostro clara","Sin reflejos ni sombras"].map((tip,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:4>i?0:6}}>
                <div style={{width:6,height:6,borderRadius:3,background:T.lime,flexShrink:0}}/>
                <span style={{fontSize:12,color:T.gray2}}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:"12px 20px 24px",borderTop:"0.5px solid "+T.border}}>
          <button onClick={()=>{ if(frontal) setStep(2); else setFrontal(true); }}
            style={{width:"100%",background:frontal?T.lime:T.black,border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:800,color:frontal?T.green:T.white,cursor:"pointer"}}>
            {frontal?"Continuar con reverso":"Tomar foto frontal"}
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Carnet reverso
  if (step === 2) {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
        <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setStep(1)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
          <div style={{flex:1}}>
            <span style={{fontWeight:700,fontSize:15}}>Carnet de identidad</span>
            <div style={{display:"flex",gap:4,marginTop:4}}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{flex:1,height:3,borderRadius:2,background:2>i?T.lime:T.gray5}}/>
              ))}
            </div>
          </div>
          <span style={{fontSize:12,color:T.gray3}}>2/4</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"24px 20px"}}>
          <p style={{fontWeight:800,fontSize:18,margin:"0 0 6px"}}>Foto del reverso</p>
          <p style={{color:T.gray3,fontSize:13,margin:"0 0 24px"}}>La parte de atras del carnet con el codigo de barras.</p>

          <div onClick={()=>setReverso(true)}
            style={{border:"2px dashed "+(reverso?T.lime:T.border),borderRadius:20,padding:"32px 20px",textAlign:"center",cursor:"pointer",background:reverso?T.limeL:T.gray5,marginBottom:20}}>
            {reverso ? (
              <div>
                <div style={{fontSize:48,marginBottom:8}}>🪪</div>
                <p style={{fontWeight:700,fontSize:15,color:T.green,margin:"0 0 4px"}}>Foto cargada</p>
                <p style={{fontSize:12,color:T.limeD,margin:0}}>Toca para cambiar</p>
              </div>
            ) : (
              <div>
                <div style={{fontSize:48,marginBottom:12}}>📷</div>
                <p style={{fontWeight:700,fontSize:15,margin:"0 0 6px"}}>Toca para tomar foto</p>
                <p style={{color:T.gray3,fontSize:12,margin:0}}>o subir desde tu galeria</p>
              </div>
            )}
          </div>
        </div>
        <div style={{padding:"12px 20px 24px",borderTop:"0.5px solid "+T.border}}>
          <button onClick={()=>{ if(reverso) setStep(3); else setReverso(true); }}
            style={{width:"100%",background:reverso?T.lime:T.black,border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:800,color:reverso?T.green:T.white,cursor:"pointer"}}>
            {reverso?"Continuar con selfie":"Tomar foto reverso"}
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Selfie
  if (step === 3) {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
        <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setStep(2)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
          <div style={{flex:1}}>
            <span style={{fontWeight:700,fontSize:15}}>Selfie con carnet</span>
            <div style={{display:"flex",gap:4,marginTop:4}}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{flex:1,height:3,borderRadius:2,background:3>i?T.lime:T.gray5}}/>
              ))}
            </div>
          </div>
          <span style={{fontSize:12,color:T.gray3}}>3/4</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"24px 20px"}}>
          <p style={{fontWeight:800,fontSize:18,margin:"0 0 6px"}}>Selfie sosteniendo tu carnet</p>
          <p style={{color:T.gray3,fontSize:13,margin:"0 0 24px",lineHeight:1.5}}>
            Sostien el carnet junto a tu cara para confirmar que eres la misma persona del documento.
          </p>

          <div onClick={()=>setSelfie(true)}
            style={{border:"2px dashed "+(selfie?T.lime:T.border),borderRadius:20,padding:"32px 20px",textAlign:"center",cursor:"pointer",background:selfie?T.limeL:T.gray5,marginBottom:20}}>
            {selfie ? (
              <div>
                <div style={{fontSize:48,marginBottom:8}}>🤳</div>
                <p style={{fontWeight:700,fontSize:15,color:T.green,margin:"0 0 4px"}}>Selfie lista</p>
                <p style={{fontSize:12,color:T.limeD,margin:0}}>Toca para cambiar</p>
              </div>
            ) : (
              <div>
                <div style={{fontSize:48,marginBottom:12}}>🤳</div>
                <p style={{fontWeight:700,fontSize:15,margin:"0 0 6px"}}>Tomar selfie con carnet</p>
                <p style={{color:T.gray3,fontSize:12,margin:0}}>Camara frontal recomendada</p>
              </div>
            )}
          </div>

          <div style={{background:"#FEF3C7",borderRadius:14,padding:"14px",marginBottom:16}}>
            <p style={{fontWeight:700,fontSize:13,color:"#92400E",margin:"0 0 8px"}}>Consejos para una buena selfie</p>
            {["Buena iluminacion en tu cara","Carnet visible y legible","Sin lentes de sol ni gorros","Fondo simple y claro"].map((tip,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:4>i?0:5}}>
                <span style={{fontSize:14}}>💡</span>
                <span style={{fontSize:12,color:"#92400E"}}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:"12px 20px 24px",borderTop:"0.5px solid "+T.border}}>
          <button onClick={()=>{ if(selfie) setStep(4); else setSelfie(true); }}
            style={{width:"100%",background:selfie?T.lime:T.black,border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:800,color:selfie?T.green:T.white,cursor:"pointer",marginBottom:10}}>
            {selfie?"Continuar":"Tomar selfie"}
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Antecedentes + enviar
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
      <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setStep(3)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <div style={{flex:1}}>
          <span style={{fontWeight:700,fontSize:15}}>Ultimo paso</span>
          <div style={{display:"flex",gap:4,marginTop:4}}>
            {[0,1,2,3].map(i=>(
              <div key={i} style={{flex:1,height:3,borderRadius:2,background:T.lime}}/>
            ))}
          </div>
        </div>
        <span style={{fontSize:12,color:T.gray3}}>4/4</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"24px 20px"}}>
        <p style={{fontWeight:800,fontSize:18,margin:"0 0 6px"}}>Revision de antecedentes</p>
        <p style={{color:T.gray3,fontSize:13,margin:"0 0 24px",lineHeight:1.5}}>
          Opcional pero muy recomendado. Los trabajadores con antecedentes limpios certificados reciben 60% mas solicitudes.
        </p>

        <div onClick={()=>setAntecedentes(a=>!a)}
          style={{border:"1.5px solid "+(antecedentes?T.lime:T.border),borderRadius:16,padding:"18px",cursor:"pointer",background:antecedentes?T.limeL:T.white,marginBottom:16,transition:"all 0.2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <span style={{fontSize:26}}>🛡</span>
                <div>
                  <p style={{fontWeight:800,fontSize:15,margin:0,color:antecedentes?T.green:T.dark}}>Verificar antecedentes</p>
                  <p style={{fontSize:11,color:antecedentes?T.limeD:T.gray3,margin:0,fontWeight:600}}>Gratis - Resultado en 24h</p>
                </div>
              </div>
              <p style={{fontSize:12,color:T.gray3,margin:0,lineHeight:1.5}}>
                Chamba consulta el Registro Civil y muestra "Sin antecedentes" en tu perfil si el resultado es limpio.
              </p>
            </div>
            <div style={{width:44,height:26,borderRadius:13,background:antecedentes?T.lime:T.gray4,cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0,marginLeft:14}}>
              <div style={{position:"absolute",top:3,left:antecedentes?22:3,width:20,height:20,borderRadius:10,background:T.white,boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"all 0.2s"}}/>
            </div>
          </div>
        </div>

        <div style={{background:T.gray5,borderRadius:14,padding:"16px",marginBottom:20}}>
          <p style={{fontWeight:700,fontSize:13,margin:"0 0 12px"}}>Resumen de tu verificacion</p>
          {[
            {icon:"🪪",l:"Carnet frontal",done:frontal},
            {icon:"🪪",l:"Carnet reverso",done:reverso},
            {icon:"🤳",l:"Selfie con carnet",done:selfie},
            {icon:"🛡",l:"Antecedentes penales",done:antecedentes,optional:true},
          ].map((row,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"center",marginBottom:3>i?10:0}}>
              <div style={{width:32,height:32,borderRadius:16,background:row.done?T.lime:T.white,border:"1.5px solid "+(row.done?T.lime:T.border),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:row.done?14:16}}>{row.done?"✓":row.icon}</span>
              </div>
              <div style={{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,fontWeight:row.done?700:400,color:row.done?T.green:T.dark}}>{row.l}</span>
                <span style={{fontSize:11,color:row.done?T.limeD:row.optional?T.gray3:T.red,fontWeight:600}}>
                  {row.done?"Listo":row.optional?"Opcional":"Requerido"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"12px 20px 24px",borderTop:"0.5px solid "+T.border}}>
        <button onClick={handleSubmit}
          style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:T.green,cursor:"pointer",marginBottom:10}}>
          Enviar para verificacion
        </button>
        <p style={{textAlign:"center",color:T.gray3,fontSize:11,margin:0,lineHeight:1.5}}>
          Al enviar aceptas que Chamba consulte el Registro Civil con tus datos
        </p>
      </div>
    </div>
  );
}

function InsigniasScreen({ setS }) {
  const BADGES = [
    {icon:"✅",name:"Verificado",desc:"Identidad confirmada",earned:true},
    {icon:"⭐",name:"Top Rated",desc:"Rating sobre 4.8",earned:true},
    {icon:"🔥",name:"10 chambas",desc:"Completaste 10 trabajos",earned:true},
    {icon:"💯",name:"50 chambas",desc:"Completaste 50 trabajos",earned:true},
    {icon:"🏆",name:"100 chambas",desc:"Completaste 100 trabajos",earned:false},
    {icon:"💎",name:"Premium",desc:"Perfil destacado",earned:false},
  ];
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,overflowY:"auto",background:T.white}}>
      <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setS("profile")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <span style={{fontSize:16,fontWeight:700}}>Metas e insignias</span>
      </div>
      <div style={{padding:"16px"}}>
        <div style={{background:T.green,borderRadius:16,padding:"16px",marginBottom:20,textAlign:"center"}}>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:12,margin:"0 0 4px"}}>Progreso anual SII</p>
          <p style={{color:T.lime,fontWeight:900,fontSize:28,margin:"0 0 4px"}}>$122.000</p>
          <p style={{color:"rgba(255,255,255,0.5)",fontSize:11,margin:0}}>de $8.700.000 limite anual</p>
          <div style={{background:"rgba(255,255,255,0.1)",borderRadius:6,height:8,marginTop:10,overflow:"hidden"}}>
            <div style={{width:"1.4%",height:"100%",background:T.lime,borderRadius:6}}/>
          </div>
        </div>
        <p style={{fontWeight:800,fontSize:16,margin:"0 0 12px"}}>Tus insignias</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {BADGES.map((b,i)=>(
            <div key={i} style={{background:b.earned?T.limeL:T.gray5,borderRadius:16,padding:"16px 12px",textAlign:"center",opacity:b.earned?1:0.5}}>
              <div style={{fontSize:28,marginBottom:8}}>{b.icon}</div>
              <p style={{fontWeight:700,fontSize:12,margin:"0 0 2px",color:b.earned?T.green:T.gray2}}>{b.name}</p>
              <p style={{fontSize:10,color:T.gray3,margin:0,lineHeight:1.3}}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceDetailScreen({ service, setS }) {
  const [editing, setEditing] = useState(false);
  const [svc, setSvc] = useState(service);
  const [saved, setSaved] = useState(false);
  const [newMat, setNewMat] = useState("");
  const [newClientMat, setNewClientMat] = useState("");

  if (!svc) return null;

  function handleSave() {
    setSaved(true);
    setTimeout(()=>{ setSaved(false); setEditing(false); }, 1200);
  }

  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,overflowY:"auto",background:T.gray5}}>
      <div style={{background:T.white,borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
        <button onClick={()=>setS("profile")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <span style={{fontWeight:700,fontSize:15}}>{svc.name}</span>
        <button onClick={()=>setEditing(e=>!e)} style={{background:editing?T.black:T.lime,border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:700,color:editing?T.white:T.green,cursor:"pointer"}}>
          {editing?"x Cancelar":"Editar"}
        </button>
      </div>

      <div style={{background:T.white,marginBottom:8}}>
        <div style={{padding:"20px 16px 16px",display:"flex",gap:14,alignItems:"center"}}>
          <div style={{width:60,height:60,borderRadius:16,background:T.limeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{svc.icon}</div>
          <div style={{flex:1}}>
            {editing
              ? <input value={svc.name} onChange={e=>setSvc(s=>({...s,name:e.target.value}))} style={{width:"100%",border:"1.5px solid "+T.black,borderRadius:10,padding:"8px 12px",fontSize:15,fontWeight:700,outline:"none",boxSizing:"border-box"}}/>
              : <p style={{fontWeight:800,fontSize:16,margin:"0 0 4px"}}>{svc.name}</p>
            }
            <div style={{display:"flex",gap:6,marginTop:4}}>
              <span style={{background:T.gray5,color:T.gray2,fontSize:12,borderRadius:10,padding:"3px 10px"}}> {svc.hours}h estimadas</span>
              <span style={{background:T.limeL,color:T.limeD,fontSize:12,fontWeight:700,borderRadius:10,padding:"3px 10px"}}>{fmt(svc.price)}</span>
            </div>
          </div>
        </div>

        {editing && (
          <div style={{padding:"0 16px 16px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <p style={{fontSize:11,fontWeight:700,color:T.gray3,margin:"0 0 6px",textTransform:"uppercase"}}>Precio (CLP)</p>
              <div style={{display:"flex",alignItems:"center",border:"1.5px solid "+T.black,borderRadius:10,overflow:"hidden"}}>
                <span style={{padding:"10px 10px",fontWeight:700,background:T.white,borderRight:"1px solid "+T.border}}>$</span>
                <input type="number" value={svc.price} onChange={e=>setSvc(s=>({...s,price:parseInt(e.target.value)||0}))} style={{flex:1,background:"transparent",border:"none",outline:"none",padding:"10px",fontSize:15,fontWeight:700}}/>
              </div>
            </div>
            <div>
              <p style={{fontSize:11,fontWeight:700,color:T.gray3,margin:"0 0 6px",textTransform:"uppercase"}}>Horas estimadas</p>
              <div style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid "+T.black,borderRadius:10,padding:"6px 10px"}}>
                <button onClick={()=>setSvc(s=>({...s,hours:Math.max(0.5,s.hours-0.5)}))} style={{background:T.white,border:"1px solid "+T.border,borderRadius:8,width:28,height:28,fontSize:16,cursor:"pointer"}}>-</button>
                <span style={{flex:1,textAlign:"center",fontWeight:800,fontSize:15}}>{svc.hours}h</span>
                <button onClick={()=>setSvc(s=>({...s,hours:Math.min(12,s.hours+0.5)}))} style={{background:T.lime,border:"none",borderRadius:8,width:28,height:28,fontSize:16,fontWeight:800,color:T.green,cursor:"pointer"}}>+</button>
              </div>
            </div>
          </div>
        )}

        {!editing && (
          <div style={{margin:"0 16px 16px",background:T.limeL,borderRadius:12,padding:"12px 14px"}}>
            <p style={{fontSize:12,fontWeight:700,color:T.green,margin:"0 0 8px"}}>💰 Desglose del pago</p>
            {[["Precio bruto",fmt(svc.price)],["Comision Chamba (10%)","-"+fmt(Math.round(svc.price*0.1))],["Tu recibes",fmt(Math.round(svc.price*0.9))]].map(([l,v],i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:T.green,fontWeight:i===2?800:400,borderTop:i===2?"1px solid "+T.lime:undefined,paddingTop:i===2?6:0,marginBottom:i < 2?4:0}}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{background:T.white,marginBottom:8,padding:"16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:svc.earlyDiscount?.enabled?12:0}}>
          <div style={{flex:1}}>
            <p style={{fontWeight:700,fontSize:14,margin:"0 0 3px"}}>Descuento por reserva anticipada</p>
            <p style={{color:T.gray3,fontSize:12,margin:0}}>El empleador obtiene descuento si agenda con anticipacion</p>
          </div>
          <div onClick={()=>setSvc(s=>({...s,earlyDiscount:{...s.earlyDiscount,enabled:!s.earlyDiscount?.enabled}}))}
            style={{width:44,height:26,borderRadius:13,background:svc.earlyDiscount?.enabled?T.lime:T.gray4,cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0,marginLeft:12}}>
            <div style={{position:"absolute",top:3,left:svc.earlyDiscount?.enabled?22:3,width:20,height:20,borderRadius:10,background:T.white,boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"all 0.2s"}}/>
          </div>
        </div>
        {svc.earlyDiscount?.enabled && (
          <div style={{background:T.limeL,borderRadius:12,padding:"12px 14px"}}>
            <div style={{marginBottom:12}}>
              <p style={{fontSize:12,fontWeight:700,color:T.gray2,margin:"0 0 8px",textTransform:"uppercase"}}>Porcentaje de descuento</p>
              <div style={{display:"flex",gap:6}}>
                {[5,10,15,20].map(pct=>(
                  <div key={pct} onClick={()=>setSvc(s=>({...s,earlyDiscount:{...s.earlyDiscount,pct}}))}
                    style={{flex:1,background:svc.earlyDiscount?.pct===pct?T.lime:T.white,border:"1.5px solid "+(svc.earlyDiscount?.pct===pct?T.lime:T.border),borderRadius:10,padding:"8px 4px",textAlign:"center",cursor:"pointer"}}>
                    <span style={{fontSize:13,fontWeight:700,color:svc.earlyDiscount?.pct===pct?T.green:T.gray2}}>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{fontSize:12,fontWeight:700,color:T.gray2,margin:"0 0 8px",textTransform:"uppercase"}}>Minimo de dias de anticipacion</p>
              <div style={{display:"flex",gap:6}}>
                {[{v:1,l:"1 dia"},{v:2,l:"2 dias"},{v:3,l:"3 dias"},{v:7,l:"1 semana"}].map(opt=>(
                  <div key={opt.v} onClick={()=>setSvc(s=>({...s,earlyDiscount:{...s.earlyDiscount,minDays:opt.v}}))}
                    style={{flex:1,background:svc.earlyDiscount?.minDays===opt.v?T.black:T.white,border:"1.5px solid "+(svc.earlyDiscount?.minDays===opt.v?T.black:T.border),borderRadius:10,padding:"8px 4px",textAlign:"center",cursor:"pointer"}}>
                    <span style={{fontSize:11,fontWeight:700,color:svc.earlyDiscount?.minDays===opt.v?T.white:T.gray2}}>{opt.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:T.white,borderRadius:10,padding:"10px 12px",marginTop:10,display:"flex",gap:8}}>
              <span>💡</span>
              <p style={{fontSize:11,color:T.green,margin:0,lineHeight:1.5}}>
                Si el empleador agenda con {svc.earlyDiscount?.minDays} dia{svc.earlyDiscount?.minDays>1?"s":""} o mas de anticipacion, recibe {svc.earlyDiscount?.pct}% de descuento sobre el precio base. Tu decides activarlo o no.
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={{background:T.white,marginBottom:8,padding:"16px"}}>
        <p style={{fontSize:13,fontWeight:700,color:T.gray2,margin:"0 0 8px",textTransform:"uppercase"}}>Descripcion</p>
        {editing
          ? <textarea value={svc.desc} onChange={e=>setSvc(s=>({...s,desc:e.target.value}))} rows={4} style={{width:"100%",border:"1.5px solid "+T.black,borderRadius:10,padding:"10px 12px",fontSize:14,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"inherit",lineHeight:1.5}}/>
          : <p style={{fontSize:14,color:T.dark,margin:0,lineHeight:1.6}}>{svc.desc}</p>
        }
      </div>

      <div style={{background:T.white,marginBottom:8,padding:"16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <p style={{fontSize:13,fontWeight:700,color:T.gray2,margin:0,textTransform:"uppercase"}}>🧰 Yo traigo (incluido en tarifa)</p>
          {svc.myMaterials.length > 0 && <span style={{background:T.limeL,color:T.limeD,fontSize:11,fontWeight:700,borderRadius:20,padding:"2px 8px"}}>{svc.myMaterials.length} items</span>}
        </div>
        {svc.myMaterials.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"0.5px solid "+T.border}}>
            <div style={{width:8,height:8,borderRadius:4,background:T.lime,flexShrink:0}}/>
            {editing
              ? <input value={m} onChange={e=>{const a=[...svc.myMaterials];a[i]=e.target.value;setSvc(s=>({...s,myMaterials:a}));}} style={{flex:1,border:"1px solid "+T.border,borderRadius:8,padding:"6px 10px",fontSize:13,outline:"none"}}/>
              : <span style={{flex:1,fontSize:13,color:T.dark}}>{m}</span>
            }
            {editing && <button onClick={()=>setSvc(s=>({...s,myMaterials:s.myMaterials.filter((_,j)=>j!==i)}))} style={{background:"#FEE2E2",border:"none",borderRadius:8,padding:"4px 10px",color:T.red,cursor:"pointer"}}>x</button>}
          </div>
        ))}
        {svc.myMaterials.length===0 && !editing && <p style={{color:T.gray3,fontSize:13}}>Sin materiales propios para este servicio</p>}
        {editing && (
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <input value={newMat} onChange={e=>setNewMat(e.target.value)} placeholder="Agregar material..." onKeyDown={e=>{if(e.key==="Enter"&&newMat){setSvc(s=>({...s,myMaterials:[...s.myMaterials,newMat]}));setNewMat("");}}} style={{flex:1,border:"1.5px dashed "+T.lime,borderRadius:10,padding:"8px 12px",fontSize:13,outline:"none"}}/>
            <button onClick={()=>{if(newMat){setSvc(s=>({...s,myMaterials:[...s.myMaterials,newMat]}));setNewMat("");}}} style={{background:T.lime,border:"none",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:700,color:T.green,cursor:"pointer"}}>+</button>
          </div>
        )}
      </div>

      {(svc.clientMaterials.length > 0 || editing) && (
        <div style={{background:T.white,marginBottom:8,padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <p style={{fontSize:13,fontWeight:700,color:"#92400E",margin:0,textTransform:"uppercase"}}>📋 El cliente debe tener</p>
            {svc.clientMaterials.length > 0 && <span style={{background:"#FEF3C7",color:"#92400E",fontSize:11,fontWeight:700,borderRadius:20,padding:"2px 8px"}}>Requerido</span>}
          </div>
          {svc.clientMaterials.map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"0.5px solid "+T.border}}>
              <div style={{width:8,height:8,borderRadius:4,background:"#F59E0B",flexShrink:0}}/>
              {editing
                ? <input value={m} onChange={e=>{const a=[...svc.clientMaterials];a[i]=e.target.value;setSvc(s=>({...s,clientMaterials:a}));}} style={{flex:1,border:"1px solid "+T.border,borderRadius:8,padding:"6px 10px",fontSize:13,outline:"none"}}/>
                : <span style={{flex:1,fontSize:13,color:T.dark}}>{m}</span>
              }
              {editing && <button onClick={()=>setSvc(s=>({...s,clientMaterials:s.clientMaterials.filter((_,j)=>j!==i)}))} style={{background:"#FEE2E2",border:"none",borderRadius:8,padding:"4px 10px",color:T.red,cursor:"pointer"}}>x</button>}
            </div>
          ))}
          {editing && (
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <input value={newClientMat} onChange={e=>setNewClientMat(e.target.value)} placeholder="Agregar requerimiento..." onKeyDown={e=>{if(e.key==="Enter"&&newClientMat){setSvc(s=>({...s,clientMaterials:[...s.clientMaterials,newClientMat]}));setNewClientMat("");}}} style={{flex:1,border:"1.5px dashed #FCD34D",borderRadius:10,padding:"8px 12px",fontSize:13,outline:"none"}}/>
              <button onClick={()=>{if(newClientMat){setSvc(s=>({...s,clientMaterials:[...s.clientMaterials,newClientMat]}));setNewClientMat("");}}} style={{background:"#FEF3C7",border:"none",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:700,color:"#92400E",cursor:"pointer"}}>+</button>
            </div>
          )}
        </div>
      )}

      {!editing && (
        <div style={{background:T.white,marginBottom:8,padding:"16px"}}>
          <p style={{fontSize:13,fontWeight:700,color:T.gray2,margin:"0 0 12px",textTransform:"uppercase"}}>📊 Estadisticas</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {[["12","Reservas\neste mes"],["4.9","Rating\npromedio"],["$420k","Ganado\neste mes"]].map(([v,l],i)=>(
              <div key={i} style={{background:T.gray5,borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:800,color:i===2?T.limeD:T.black}}>{v}</div>
                <div style={{color:T.gray3,fontSize:10,marginTop:2,lineHeight:1.3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{padding:"12px 16px 32px",display:"flex",gap:10}}>
        {editing
          ? <button onClick={handleSave} style={{flex:1,background:saved?T.green:T.lime,border:"none",borderRadius:14,padding:"15px",fontSize:15,fontWeight:800,color:saved?T.white:T.green,cursor:"pointer",transition:"all 0.3s"}}>
              {saved?"✓ Guardado!":"Guardar cambios"}
            </button>
          : <>
              <button onClick={()=>setEditing(true)} style={{flex:2,background:T.black,border:"none",borderRadius:14,padding:"15px",fontSize:15,fontWeight:700,color:T.white,cursor:"pointer"}}>
                Editar servicio
              </button>
              <button style={{flex:1,background:"#FEE2E2",border:"none",borderRadius:14,padding:"15px",fontSize:14,fontWeight:700,color:T.red,cursor:"pointer"}}>
                Eliminar
              </button>
            </>
        }
      </div>
    </div>
  );
}

function AddServiceScreen({ setS, setSelectedService }) {
  const [view, setView] = useState("list"); // "list" | "add"
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const canNext = step === 0 ? name.trim().length > 0 : step === 1 ? price.length > 0 : true;

  if (view === "list") {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:78,overflowY:"auto",background:T.gray5}}>
        <div style={{background:T.lime,borderBottom:"none",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
          <span style={{fontWeight:800,fontSize:17,color:T.green}}>Mis servicios</span>
          <button onClick={()=>setView("add")} style={{background:T.green,border:"none",borderRadius:20,padding:"7px 16px",fontSize:13,fontWeight:700,color:T.green,cursor:"pointer"}}>+ Nuevo</button>
        </div>
        <div style={{background:T.white,marginBottom:8,padding:"14px 16px"}}>
          <div style={{background:T.limeL,borderRadius:12,padding:"12px 14px",marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
            <span style={{fontSize:22}}>💡</span>
            <div>
              <p style={{fontWeight:700,fontSize:13,color:T.green,margin:"0 0 2px"}}>Gestiona tus servicios</p>
              <p style={{fontSize:12,color:T.limeD,margin:0,lineHeight:1.4}}>Toca un servicio para editar precio, materiales y descuentos. Usa + Nuevo para agregar.</p>
            </div>
          </div>
          {JULIA.services.map((svc,i)=>(
            <div key={svc.id} style={{display:"flex",gap:12,alignItems:"center",padding:"13px 0",borderBottom:JULIA.services.length-1>i?"0.5px solid "+T.border:"none"}}>
              <div onClick={()=>{if(setSelectedService){setSelectedService(svc);}setS("servicedetail");}}
                style={{width:50,height:50,borderRadius:14,background:svc.active?T.limeL:T.gray5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,cursor:"pointer",opacity:svc.active?1:0.5}}>
                {svc.icon}
              </div>
              <div style={{flex:1,cursor:"pointer"}} onClick={()=>{if(setSelectedService){setSelectedService(svc);}setS("servicedetail");}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <span style={{fontWeight:700,fontSize:15,color:svc.active?T.dark:T.gray3}}>{svc.name}</span>
                  <span style={{fontWeight:800,color:svc.active?T.limeD:T.gray3,fontSize:15}}>{fmt(svc.price)}</span>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <span style={{background:T.gray5,color:T.gray2,fontSize:11,borderRadius:10,padding:"2px 8px"}}> {svc.hours}h</span>
                  {svc.myMaterials.length > 0 && <span style={{background:T.limeL,color:T.limeD,fontSize:11,fontWeight:600,borderRadius:10,padding:"2px 8px"}}>🧰 Incluido</span>}
                  {svc.earlyDiscount?.enabled && <span style={{background:"#F0FDF4",color:"#15803D",fontSize:11,fontWeight:600,borderRadius:10,padding:"2px 8px"}}>-{svc.earlyDiscount.pct}% anticipado</span>}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0}}>
                <div style={{width:44,height:26,borderRadius:13,background:svc.active?T.lime:T.gray4,cursor:"pointer",position:"relative"}}>
                  <div style={{position:"absolute",top:3,left:svc.active?22:3,width:20,height:20,borderRadius:10,background:T.white,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
                </div>
                <span style={{fontSize:10,fontWeight:700,color:svc.active?T.limeD:T.gray3}}>{svc.active?"Publicado":"Inactivo"}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:T.white,padding:"14px 16px"}}>
          <p style={{fontWeight:800,fontSize:15,margin:"0 0 12px"}}>Resumen del mes</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{icon:"💰",label:"Ingresos",value:"$122.000",bg:T.limeL,color:T.green},
              {icon:"🔧",label:"Servicios activos",value:"5",bg:T.gray5,color:T.black},
              {icon:"⭐",label:"Rating promedio",value:"4.9",bg:"#FEF3C7",color:"#92400E"},
              {icon:"📅",label:"Chambas este mes",value:"12",bg:"#EFF6FF",color:"#1D4ED8"}
            ].map((s,i)=>(
              <div key={i} style={{background:s.bg,borderRadius:12,padding:"12px"}}>
                <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
                <div style={{color:T.gray3,fontSize:11,marginBottom:2}}>{s.label}</div>
                <div style={{fontWeight:800,fontSize:16,color:s.color}}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
      <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>step===0?setView("list"):setStep(s=>s-1)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <span style={{fontSize:16,fontWeight:700}}>Agregar servicio</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px"}}>
        {step === 0 && (
          <div>
            <p style={{fontWeight:800,fontSize:18,margin:"0 0 16px"}}>Nombre del servicio</p>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ej: Aseo de hogar, Peluqueria a domicilio..." style={{width:"100%",padding:"13px 14px",border:"1.5px solid "+(name?T.black:T.border),borderRadius:12,fontSize:15,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:16}}/>
            <div>
              <p style={{fontWeight:700,fontSize:14,margin:"0 0 10px"}}>Categoria</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[{k:"limpieza",icon:"🧹",l:"Limpieza"},{k:"belleza",icon:"✂",l:"Belleza"},{k:"jardin",icon:"🌿",l:"Jardin"},{k:"mascotas",icon:"🐾",l:"Mascotas"},{k:"edicion",icon:"🎬",l:"Edicion"},{k:"eventos",icon:"🎉",l:"Eventos"}].map(c=>(
                  <div key={c.k} style={{background:T.gray5,borderRadius:12,padding:"12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:20}}>{c.icon}</span>
                    <span style={{fontWeight:600,fontSize:13}}>{c.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <p style={{fontWeight:800,fontSize:18,margin:"0 0 16px"}}>Precio base</p>
            <div style={{display:"flex",border:"1.5px solid "+(price?T.black:T.border),borderRadius:12,overflow:"hidden"}}>
              <span style={{padding:"13px 12px",background:T.gray5,borderRight:"1px solid "+T.border,fontWeight:700}}>$</span>
              <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="15.000" style={{flex:1,padding:"13px 14px",border:"none",outline:"none",fontSize:15,fontFamily:"inherit"}}/>
            </div>
            <p style={{color:T.gray3,fontSize:12,marginTop:8}}>Precio por trabajo. Puedes agregar extras opcionales despues.</p>
          </div>
        )}
        {step === 2 && (
          <div>
            <p style={{fontWeight:800,fontSize:18,margin:"0 0 16px"}}>Descripcion</p>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={5} placeholder="Describe tu servicio: que incluye, cuanto tiempo toma, que traes, etc..." style={{width:"100%",padding:"13px 14px",border:"1.5px solid "+(desc?T.black:T.border),borderRadius:12,fontSize:14,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"inherit",lineHeight:1.5,marginBottom:16}}/>
          </div>
        )}
      </div>
      <div style={{padding:"12px 16px",borderTop:"0.5px solid "+T.border}}>
        <button onClick={()=>{ if(step < 2) setStep(s=>s+1); else setS("profile"); }} disabled={!canNext} style={{width:"100%",background:canNext?T.lime:T.gray5,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:canNext?T.green:T.gray3,cursor:canNext?"pointer":"not-allowed"}}>
          {step < 2 ? "Siguiente" : "Publicar servicio"}
        </button>
      </div>
    </div>
  );
}

function WaitingForWorker({ matched, setS }) {
  const [accepted, setAccepted] = useState(false);
  const w = matched;
  useEffect(()=>{
    const t = setTimeout(()=>setAccepted(true), 3000);
    return ()=>clearTimeout(t);
  },[]);
  if (accepted) {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:T.white,padding:"0 24px"}}>
        <div style={{width:90,height:90,borderRadius:45,overflow:"hidden",border:"4px solid "+T.lime,marginBottom:16,boxShadow:"0 0 0 12px "+T.limeL}}>
          <Img src={w?w.avatar:""} style={{width:"100%",height:"100%"}}/>
        </div>
        <h2 style={{fontSize:24,fontWeight:900,margin:"0 0 8px",textAlign:"center"}}>Match!</h2>
        <p style={{color:T.gray2,textAlign:"center",margin:"0 0 24px",lineHeight:1.5}}>{w?w.name:""} acepto tu propuesta</p>
        <button onClick={()=>setS("payment")} style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:T.green,cursor:"pointer"}}>
          Proceder al pago
        </button>
      </div>
    );
  }
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:T.white,padding:"0 24px"}}>
      <div style={{width:80,height:80,borderRadius:40,overflow:"hidden",border:"3px solid "+T.lime,marginBottom:16}}>
        <Img src={w?w.avatar:""} style={{width:"100%",height:"100%"}}/>
      </div>
      <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 8px",textAlign:"center"}}>Esperando respuesta...</h2>
      <p style={{color:T.gray2,textAlign:"center",margin:"0 0 24px"}}>{w?w.name:""} esta revisando tu propuesta</p>
      <div style={{display:"flex",gap:8}}>
        {[0,1,2].map(i=>(<div key={i} style={{width:10,height:10,borderRadius:5,background:T.lime,animation:"pulse 1.4s ease-in-out "+i*0.3+"s infinite"}}/>))}
      </div>
    </div>
  );
}

// -- APP -------------------------------------------------------
function CreateOfferScreen({ setS, role }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState(null);
  const [cuando, setCuando] = useState("flexible");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState("");
  const [budgetType, setBudgetType] = useState("fijo");
  const [budget, setBudget] = useState("");
  const [desc, setDesc] = useState("");
  const [reqs, setReqs] = useState([]);
  const [newReq, setNewReq] = useState("");
  const [published, setPublished] = useState(false);

  const CATS = [
    {id:"limpieza",icon:"🧹",l:"Limpieza"},
    {id:"belleza",icon:"💄",l:"Belleza"},
    {id:"jardin",icon:"🌿",l:"Jardin"},
    {id:"mascotas",icon:"🐾",l:"Mascotas"},
    {id:"edicion",icon:"🎬",l:"Edicion"},
    {id:"eventos",icon:"🎉",l:"Eventos"},
    {id:"trans",icon:"🚗",l:"Transporte"},
    {id:"hogar",icon:"🏠",l:"Hogar"},
    {id:"cuidado",icon:"❤",l:"Cuidado"},
  ];

  const DAYS = ["Hoy","Manana","Lun 27","Mar 28","Mie 29","Jue 30","Vie 31","Sab 1"];
  const TIMES = ["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"];

  const canNext = [
    title.trim().length > 0 && cat !== null,
    true,
    address.trim().length > 0,
    true,
  ][step];

  const steps = ["Que necesitas","Cuando","Donde","Presupuesto"];

  if (published) {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:T.white,padding:"0 24px"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"45%",background:"linear-gradient(180deg,"+T.limeL+",white)"}}/>
        <div style={{position:"relative",zIndex:1,width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:90,height:90,borderRadius:45,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,marginBottom:16,boxShadow:"0 0 0 12px "+T.limeL}}>
            📢
          </div>
          <h2 style={{fontSize:26,fontWeight:900,margin:"0 0 8px",textAlign:"center"}}>Oferta publicada!</h2>
          <p style={{color:T.gray2,textAlign:"center",fontSize:14,margin:"0 0 24px",lineHeight:1.5}}>
            Los trabajadores de la categoria <strong>{CATS.find(c=>c.id===cat)?.l}</strong> ya pueden ver tu oferta y postular.
          </p>
          <div style={{width:"100%",background:T.gray5,borderRadius:16,padding:"16px",marginBottom:20}}>
            <p style={{fontWeight:700,fontSize:14,margin:"0 0 12px"}}>{title}</p>
            {[
              {icon:"📍",l:address},
              {icon:"📅",l:cuando==="flexible"?"Horario flexible":cuando==="ahora"?"Lo antes posible":(selectedDay||"")+" "+(selectedTime||"")},
              {icon:"💰",l:budgetType==="abierto"?"Abierto a propuestas":"Presupuesto: "+fmt(parseInt(budget)||0)},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:2>i?8:0}}>
                <span style={{fontSize:14}}>{r.icon}</span>
                <span style={{fontSize:13,color:T.gray2}}>{r.l}</span>
              </div>
            ))}
          </div>
          <div style={{background:"#EFF6FF",borderRadius:12,padding:"12px 14px",marginBottom:20,width:"100%",display:"flex",gap:10}}>
            <span style={{fontSize:18}}>💡</span>
            <p style={{fontSize:12,color:"#1D4ED8",margin:0,lineHeight:1.5}}>
              Recibiras notificaciones cuando trabajadores postulen. Podras ver sus perfiles y elegir al mejor.
            </p>
          </div>
          <button onClick={()=>setS("feed")}
            style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:800,color:T.green,cursor:"pointer",marginBottom:10}}>
            Ver mi feed
          </button>
          <button onClick={()=>{setPublished(false);setStep(0);setTitle("");setCat(null);}}
            style={{width:"100%",background:"none",border:"1px solid "+T.border,borderRadius:14,padding:"12px",color:T.gray2,fontSize:13,cursor:"pointer"}}>
            Publicar otra oferta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
      <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>step===0?setS("feed"):setStep(s=>s-1)}
          style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <div style={{flex:1}}>
          <span style={{fontSize:15,fontWeight:700}}>Publicar oferta de trabajo</span>
          <div style={{display:"flex",gap:4,marginTop:4}}>
            {steps.map((s,i)=>(
              <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=step?T.lime:T.gray5}}/>
            ))}
          </div>
        </div>
        <span style={{fontSize:12,color:T.gray3}}>{step+1}/{steps.length}</span>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"20px 16px"}}>

        {step===0 && (
          <div>
            <p style={{fontWeight:800,fontSize:20,margin:"0 0 6px"}}>Que necesitas?</p>
            <p style={{color:T.gray3,fontSize:13,margin:"0 0 20px"}}>Se claro y especifico para atraer a los mejores trabajadores</p>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",display:"block",marginBottom:6}}>Titulo de la oferta</label>
              <input value={title} onChange={e=>setTitle(e.target.value)}
                placeholder="Ej: Necesito aseo profundo depto 2 ambientes"
                style={{width:"100%",padding:"13px 14px",border:"1.5px solid "+(title?T.black:T.border),borderRadius:12,fontSize:15,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",display:"block",marginBottom:10}}>Categoria</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {CATS.map(c=>(
                  <div key={c.id} onClick={()=>setCat(c.id)}
                    style={{border:"1.5px solid "+(cat===c.id?T.lime:T.border),borderRadius:12,padding:"12px 8px",textAlign:"center",cursor:"pointer",background:cat===c.id?T.limeL:T.white}}>
                    <div style={{fontSize:22,marginBottom:4}}>{c.icon}</div>
                    <span style={{fontSize:12,fontWeight:700,color:cat===c.id?T.green:T.gray2}}>{c.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step===1 && (
          <div>
            <p style={{fontWeight:800,fontSize:20,margin:"0 0 6px"}}>Cuando lo necesitas?</p>
            <p style={{color:T.gray3,fontSize:13,margin:"0 0 20px"}}>Los trabajadores veran tu disponibilidad</p>
            <div style={{display:"flex",gap:8,marginBottom:20}}>
              {[{k:"ahora",icon:"⚡",l:"Lo antes posible"},{k:"programar",icon:"📅",l:"Fecha especifica"},{k:"flexible",icon:"🗓",l:"Soy flexible"}].map(op=>(
                <div key={op.k} onClick={()=>setCuando(op.k)}
                  style={{flex:1,border:"2px solid "+(cuando===op.k?T.lime:T.border),borderRadius:14,padding:"14px 8px",textAlign:"center",cursor:"pointer",background:cuando===op.k?T.limeL:T.white}}>
                  <div style={{fontSize:24,marginBottom:6}}>{op.icon}</div>
                  <span style={{fontSize:12,fontWeight:700,color:cuando===op.k?T.green:T.dark}}>{op.l}</span>
                </div>
              ))}
            </div>
            {cuando==="programar" && (
              <div>
                <p style={{fontWeight:700,fontSize:14,margin:"0 0 10px"}}>Dia</p>
                <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16,paddingBottom:2}}>
                  {DAYS.map(d=>(
                    <div key={d} onClick={()=>setSelectedDay(d)}
                      style={{flexShrink:0,background:selectedDay===d?T.black:T.gray5,borderRadius:12,padding:"10px 14px",cursor:"pointer"}}>
                      <span style={{fontWeight:700,fontSize:13,color:selectedDay===d?T.white:T.dark}}>{d}</span>
                    </div>
                  ))}
                </div>
                <p style={{fontWeight:700,fontSize:14,margin:"0 0 10px"}}>Hora aproximada</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {TIMES.map(t=>(
                    <div key={t} onClick={()=>setSelectedTime(t)}
                      style={{background:selectedTime===t?T.lime:T.gray5,borderRadius:10,padding:"8px 14px",cursor:"pointer"}}>
                      <span style={{fontWeight:700,fontSize:13,color:selectedTime===t?T.green:T.dark}}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cuando==="ahora" && (
              <div style={{background:"#FEF3C7",borderRadius:14,padding:"14px"}}>
                <p style={{fontWeight:700,fontSize:13,color:"#92400E",margin:"0 0 4px"}}>Servicio urgente</p>
                <p style={{fontSize:12,color:"#92400E",margin:0,lineHeight:1.5}}>Los trabajadores que esten disponibles ahora recibiran tu solicitud. Puede aplicar recargo de urgencia.</p>
              </div>
            )}
          </div>
        )}

        {step===2 && (
          <div>
            <p style={{fontWeight:800,fontSize:20,margin:"0 0 6px"}}>Donde?</p>
            <p style={{color:T.gray3,fontSize:13,margin:"0 0 20px"}}>Los trabajadores cercanos veran tu oferta primero</p>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",display:"block",marginBottom:6}}>Direccion</label>
              <input value={address} onChange={e=>setAddress(e.target.value)}
                placeholder="Ej: Av. Providencia 1234, Providencia"
                style={{width:"100%",padding:"13px 14px",border:"1.5px solid "+(address?T.black:T.border),borderRadius:12,fontSize:15,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:10}}/>
              <div style={{display:"flex",gap:8}}>
                {["Mi casa","Mi trabajo","Otra direccion"].map((opt,i)=>(
                  <div key={i} onClick={()=>setAddress(opt==="Mi casa"?"Av. Providencia 1234, Providencia":opt==="Mi trabajo"?"Av. Apoquindo 5678, Las Condes":"")}
                    style={{flex:1,background:T.gray5,borderRadius:10,padding:"8px",textAlign:"center",cursor:"pointer"}}>
                    <span style={{fontSize:12,fontWeight:600,color:T.gray2}}>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",display:"block",marginBottom:6}}>Descripcion del trabajo</label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4}
                placeholder="Describe con detalle lo que necesitas. Ej: Aseo completo de depto 2 ambientes, 65m2, incluye 1 bano y cocina americana..."
                style={{width:"100%",padding:"13px 14px",border:"1.5px solid "+(desc?T.black:T.border),borderRadius:12,fontSize:14,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"inherit",lineHeight:1.5}}/>
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",display:"block",marginBottom:6}}>Requisitos (opcional)</label>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <input value={newReq} onChange={e=>setNewReq(e.target.value)}
                  placeholder="Ej: Traer aspiradora propia"
                  onKeyDown={e=>{if(e.key==="Enter"&&newReq){setReqs(r=>[...r,newReq]);setNewReq("");}}}
                  style={{flex:1,padding:"11px 14px",border:"1.5px dashed "+T.border,borderRadius:10,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
                <button onClick={()=>{if(newReq){setReqs(r=>[...r,newReq]);setNewReq("");}}}
                  style={{background:T.lime,border:"none",borderRadius:10,padding:"11px 16px",fontSize:14,fontWeight:700,color:T.green,cursor:"pointer"}}>+</button>
              </div>
              {reqs.map((req,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:T.gray5,borderRadius:10,marginBottom:6}}>
                  <div style={{width:6,height:6,borderRadius:3,background:T.lime,flexShrink:0}}/>
                  <span style={{flex:1,fontSize:13}}>{req}</span>
                  <button onClick={()=>setReqs(r=>r.filter((_,j)=>j!==i))}
                    style={{background:"none",border:"none",color:T.gray3,cursor:"pointer",fontSize:16}}>x</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step===3 && (
          <div>
            <p style={{fontWeight:800,fontSize:20,margin:"0 0 6px"}}>Presupuesto</p>
            <p style={{color:T.gray3,fontSize:13,margin:"0 0 20px"}}>Define cuanto estas dispuesto a pagar</p>
            <div style={{display:"flex",gap:10,marginBottom:20}}>
              {[{k:"fijo",icon:"💰",l:"Precio fijo",sub:"Tu defines el monto"},{k:"abierto",icon:"🤝",l:"Abierto a propuestas",sub:"Los trabajadores ofertan"}].map(op=>(
                <div key={op.k} onClick={()=>setBudgetType(op.k)}
                  style={{flex:1,border:"2px solid "+(budgetType===op.k?T.lime:T.border),borderRadius:14,padding:"16px 12px",textAlign:"center",cursor:"pointer",background:budgetType===op.k?T.limeL:T.white}}>
                  <div style={{fontSize:28,marginBottom:8}}>{op.icon}</div>
                  <div style={{fontWeight:700,fontSize:14,color:budgetType===op.k?T.green:T.dark,marginBottom:4}}>{op.l}</div>
                  <div style={{fontSize:11,color:T.gray3}}>{op.sub}</div>
                </div>
              ))}
            </div>
            {budgetType==="fijo" && (
              <div style={{marginBottom:20}}>
                <label style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",display:"block",marginBottom:6}}>Monto</label>
                <div style={{display:"flex",border:"1.5px solid "+(budget?T.black:T.border),borderRadius:12,overflow:"hidden"}}>
                  <span style={{padding:"13px 12px",background:T.gray5,borderRight:"1px solid "+T.border,fontWeight:700}}>$</span>
                  <input type="number" value={budget} onChange={e=>setBudget(e.target.value)}
                    placeholder="15.000"
                    style={{flex:1,padding:"13px 14px",border:"none",outline:"none",fontSize:15,fontFamily:"inherit"}}/>
                </div>
                <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                  {[10000,15000,25000,35000,50000].map(p=>(
                    <div key={p} onClick={()=>setBudget(String(p))}
                      style={{background:budget===String(p)?T.lime:T.gray5,borderRadius:20,padding:"6px 12px",cursor:"pointer"}}>
                      <span style={{fontSize:12,fontWeight:700,color:budget===String(p)?T.green:T.gray2}}>{fmt(p)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {budgetType==="abierto" && (
              <div style={{background:"#EFF6FF",borderRadius:14,padding:"14px",marginBottom:20}}>
                <p style={{fontWeight:700,fontSize:13,color:"#1D4ED8",margin:"0 0 6px"}}>Como funciona</p>
                <p style={{fontSize:12,color:"#3B82F6",margin:0,lineHeight:1.5}}>Los trabajadores interesados enviaran su precio. Tu eliges la mejor oferta segun precio, rating y experiencia.</p>
              </div>
            )}
            <div style={{background:T.green,borderRadius:16,padding:"16px"}}>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:11,textTransform:"uppercase",fontWeight:700,margin:"0 0 12px"}}>Resumen de tu oferta</p>
              {[
                {icon:CATS.find(c=>c.id===cat)?.icon||"🔧",l:"Servicio",v:title||"Sin titulo"},
                {icon:"📍",l:"Lugar",v:address||"Sin definir"},
                {icon:"📅",l:"Cuando",v:cuando==="flexible"?"Flexible":cuando==="ahora"?"Lo antes posible":(selectedDay||"")+" "+(selectedTime||"")},
                {icon:"💰",l:"Presupuesto",v:budgetType==="abierto"?"Abierto a propuestas":fmt(parseInt(budget)||0)},
              ].map((row,i)=>(
                <div key={i} style={{display:"flex",gap:10,marginBottom:3>i?10:0}}>
                  <span style={{fontSize:15,flexShrink:0}}>{row.icon}</span>
                  <div style={{flex:1,display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>{row.l}</span>
                    <span style={{fontSize:13,fontWeight:700,color:T.lime,textAlign:"right",maxWidth:"60%"}}>{row.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{padding:"12px 16px",borderTop:"0.5px solid "+T.border}}>
        {step < 3
          ? <button onClick={()=>canNext&&setStep(s=>s+1)} disabled={!canNext}
              style={{width:"100%",background:canNext?T.lime:T.gray5,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:canNext?T.green:T.gray3,cursor:canNext?"pointer":"not-allowed"}}>
              Siguiente
            </button>
          : <button onClick={()=>setPublished(true)}
              style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:T.green,cursor:"pointer"}}>
              Publicar oferta
            </button>
        }
      </div>
    </div>
  );
}

function PostularScreen({ job, setS, onBack }) {
  const [stage, setStage] = useState("detail");
  const [precio, setPrecio] = useState(job ? String(job.pay) : "");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  if (!job) return null;

  const cc = CAT_COLORS[job.cat] || CAT_COLORS.default;

  if (sent) {
    return (
      <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:T.white,padding:"0 24px"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"45%",background:"linear-gradient(180deg,"+T.limeL+",white)"}}/>
        <div style={{position:"relative",zIndex:1,width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:90,height:90,borderRadius:45,background:T.lime,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,marginBottom:16,boxShadow:"0 0 0 12px "+T.limeL}}>
            📨
          </div>
          <h2 style={{fontSize:24,fontWeight:900,margin:"0 0 8px",textAlign:"center"}}>Postulacion enviada!</h2>
          <p style={{color:T.gray2,textAlign:"center",fontSize:14,margin:"0 0 24px",lineHeight:1.5}}>
            <strong>{job.employer}</strong> recibio tu postulacion. Te avisaremos si te seleccionan.
          </p>
          <div style={{width:"100%",background:T.gray5,borderRadius:16,padding:"16px",marginBottom:20}}>
            {[
              {icon:"💼",l:"Oferta",v:job.title},
              {icon:"💰",l:"Tu precio ofertado",v:fmt(parseInt(precio)||0)},
              {icon:"📅",l:"Disponibilidad",v:job.time},
            ].map((row,i,arr)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"center",paddingBottom:arr.length-1>i?10:0,marginBottom:arr.length-1>i?10:0,borderBottom:arr.length-1>i?"0.5px solid "+T.border:"none"}}>
                <span style={{fontSize:16,flexShrink:0}}>{row.icon}</span>
                <div style={{flex:1,display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:13,color:T.gray3}}>{row.l}</span>
                  <span style={{fontSize:13,fontWeight:700,color:T.dark,textAlign:"right",maxWidth:"60%"}}>{row.v}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={onBack}
            style={{width:"100%",background:T.lime,border:"none",borderRadius:14,padding:"16px",fontSize:15,fontWeight:800,color:T.green,cursor:"pointer",marginBottom:10}}>
            Ver mas ofertas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:0,display:"flex",flexDirection:"column",background:T.white}}>
      <div style={{borderBottom:"0.5px solid "+T.border,padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>Atras</button>
        <span style={{fontWeight:700,fontSize:15}}>Postular a oferta</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>

        {/* Job detail card */}
        <div style={{background:T.white,border:"1.5px solid "+T.border,borderRadius:16,padding:"16px",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div style={{flex:1,paddingRight:10}}>
              <p style={{fontWeight:800,fontSize:16,margin:"0 0 4px"}}>{job.title}</p>
              <p style={{color:T.gray3,fontSize:13,margin:0}}>👤 {job.employer} - 📍 {job.zone}</p>
            </div>
            <span style={{fontWeight:900,fontSize:18,color:T.limeD,flexShrink:0}}>{fmt(job.pay)}</span>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <span style={{background:cc.bg,color:cc.c,fontSize:11,fontWeight:700,borderRadius:8,padding:"3px 10px"}}>{job.cat}</span>
            {job.urgent && <span style={{background:"#FEF3C7",color:"#92400E",fontSize:11,fontWeight:700,borderRadius:8,padding:"3px 10px"}}>Urgente +30%</span>}
            <span style={{background:T.gray5,color:T.gray3,fontSize:11,borderRadius:8,padding:"3px 10px"}}>📅 {job.time}</span>
          </div>
        </div>

        {/* Tu perfil como trabajadora */}
        <div style={{background:T.limeL,borderRadius:14,padding:"14px",marginBottom:16,display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:48,height:48,borderRadius:24,overflow:"hidden",border:"2px solid "+T.lime,flexShrink:0}}>
            <Img src={JULIA.avatar} style={{width:"100%",height:"100%"}}/>
          </div>
          <div style={{flex:1}}>
            <p style={{fontWeight:700,fontSize:14,color:T.green,margin:"0 0 2px"}}>{JULIA.name} ✅</p>
            <p style={{color:T.limeD,fontSize:12,margin:0}}>⭐ {JULIA.rating} - {JULIA.jobs} chambas completadas</p>
          </div>
        </div>

        {/* Tu precio */}
        <div style={{marginBottom:16}}>
          <label style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",display:"block",marginBottom:6}}>
            Tu precio por este trabajo
          </label>
          <div style={{display:"flex",border:"1.5px solid "+(precio?T.black:T.border),borderRadius:12,overflow:"hidden",marginBottom:8}}>
            <span style={{padding:"13px 12px",background:T.gray5,borderRight:"1px solid "+T.border,fontWeight:700,fontSize:15}}>$</span>
            <input type="number" value={precio} onChange={e=>setPrecio(e.target.value)}
              placeholder={String(job.pay)}
              style={{flex:1,padding:"13px 14px",border:"none",outline:"none",fontSize:15,fontFamily:"inherit",fontWeight:700}}/>
          </div>
          <div style={{display:"flex",gap:6}}>
            {[job.pay-2000, job.pay, job.pay+2000, job.pay+5000].filter(p=>p>0).map(p=>(
              <div key={p} onClick={()=>setPrecio(String(p))}
                style={{flex:1,background:precio===String(p)?T.lime:T.gray5,borderRadius:10,padding:"7px 4px",textAlign:"center",cursor:"pointer"}}>
                <span style={{fontSize:11,fontWeight:700,color:precio===String(p)?T.green:T.gray2}}>{fmt(p)}</span>
              </div>
            ))}
          </div>
          {precio && parseInt(precio) < job.pay && (
            <div style={{background:"#F0FDF4",borderRadius:10,padding:"8px 12px",marginTop:8,display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:14}}>💡</span>
              <span style={{fontSize:12,color:"#15803D"}}>Oferta mas baja puede aumentar tus chances de ser elegida</span>
            </div>
          )}
        </div>

        {/* Mensaje */}
        <div style={{marginBottom:16}}>
          <label style={{fontSize:12,fontWeight:700,color:T.gray3,textTransform:"uppercase",display:"block",marginBottom:6}}>
            Presentate al empleador
          </label>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={4}
            placeholder={"Hola! Soy Julia, tengo experiencia en "+job.cat+" y me interesa tu oferta. Traigo todos mis materiales y puedo el "+job.time+"..."}
            style={{width:"100%",padding:"13px 14px",border:"1.5px solid "+(msg?T.black:T.border),borderRadius:12,fontSize:14,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"inherit",lineHeight:1.5}}/>
        </div>

        {/* Tips */}
        <div style={{background:"#EFF6FF",borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <p style={{fontWeight:700,fontSize:13,color:"#1D4ED8",margin:"0 0 8px"}}>Tips para una buena postulacion</p>
          {["Menciona tu experiencia especifica en este tipo de trabajo","Confirma tu disponibilidad para la fecha solicitada","Se claro con lo que incluye tu servicio"].map((tip,i)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:i>2?0:5}}>
              <span style={{fontSize:13,color:"#3B82F6"}}>✓</span>
              <span style={{fontSize:12,color:"#3B82F6",lineHeight:1.4}}>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"12px 16px",borderTop:"0.5px solid "+T.border}}>
        <button onClick={()=>setSent(true)} disabled={!precio||!msg.trim()}
          style={{width:"100%",background:precio&&msg.trim()?T.lime:T.gray5,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:900,color:precio&&msg.trim()?T.green:T.gray3,cursor:precio&&msg.trim()?"pointer":"not-allowed"}}>
          Enviar postulacion
        </button>
      </div>
    </div>
  );
}


function WorkerFeed({ go, setS, role, setRole }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const JOB_OFFERS = [
    {id:1,title:"Necesito aseo profundo depto 3 ambientes",employer:"Maria Gonzalez",zone:"Las Condes",pay:60000,urgent:false,cat:"limpieza",time:"Vie 31 Mayo"},
    {id:2,title:"Clases de manejo x 5 horas",employer:"Pedro Soto",zone:"Providencia",pay:100000,urgent:true,cat:"trans",time:"Hoy urgente"},
    {id:3,title:"Edicion video boda 4K",employer:"Empresa Eventos XYZ",zone:"Remoto",pay:80000,urgent:false,cat:"edicion",time:"Flexible"},
    {id:4,title:"Maquillaje quinceanos x 8 personas",employer:"Laura Munoz",zone:"Nunoa",pay:35000,urgent:false,cat:"belleza",time:"Sab 1 Jun"},
    {id:5,title:"Jardinero para mantencion mensual",employer:"Condominio El Pino",zone:"La Reina",pay:45000,urgent:false,cat:"jardin",time:"Lun 27 Mayo"},
  ];
  return (
    <div style={{position:"absolute",inset:0,top:50,bottom:78,overflowY:"auto",background:T.gray5}}>
      {selectedJob && <PostularScreen job={selectedJob} setS={setS} onBack={()=>setSelectedJob(null)}/>}
      <div style={{position:"sticky",top:0,background:"rgba(247,251,240,0.97)",backdropFilter:"blur(10px)",zIndex:20,borderBottom:"0.5px solid #D4E6C3",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20,fontWeight:900,letterSpacing:-0.5,color:T.green}}>chamba</span>
          <RoleSwitch role={role} setRole={setRole}/>
        </div>
        <span onClick={()=>setS("notif")} style={{fontSize:22,cursor:"pointer"}}>🔔</span>
      </div>
      <div style={{background:T.white,padding:"12px 16px",marginBottom:8}}>
        <p style={{fontWeight:800,fontSize:16,margin:"0 0 4px"}}>Ofertas de trabajo</p>
        <p style={{color:T.gray3,fontSize:13,margin:0}}>{JOB_OFFERS.length} disponibles cerca de ti</p>
      </div>
      {JOB_OFFERS.map((job)=>{
        const cc = CAT_COLORS[job.cat] || CAT_COLORS.default;
        return (
          <div key={job.id} style={{background:T.white,marginBottom:8,padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{flex:1,paddingRight:10}}>
                <p style={{fontWeight:700,fontSize:15,margin:"0 0 4px"}}>{job.title}</p>
                <p style={{color:T.gray3,fontSize:13,margin:0}}>👤 {job.employer} - 📍 {job.zone}</p>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <p style={{fontWeight:900,fontSize:18,color:T.limeD,margin:"0 0 2px"}}>{fmt(job.pay)}</p>
                <p style={{color:T.gray3,fontSize:11,margin:0}}>/trabajo</p>
              </div>
            </div>
            <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
              <span style={{background:cc.bg,color:cc.c,fontSize:11,fontWeight:600,borderRadius:8,padding:"3px 10px"}}>{job.cat}</span>
              {job.urgent && <span style={{background:"#FEF3C7",color:"#92400E",fontSize:11,fontWeight:700,borderRadius:8,padding:"3px 10px"}}>Urgente +30%</span>}
              <span style={{background:T.gray5,color:T.gray3,fontSize:11,borderRadius:8,padding:"3px 10px"}}>📅 {job.time}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setSelectedJob(job)} style={{flex:1,background:T.lime,border:"none",borderRadius:12,padding:"11px",fontSize:14,fontWeight:700,color:T.green,cursor:"pointer"}}>Postular</button>
              <button style={{background:T.gray5,border:"none",borderRadius:12,padding:"11px 14px",fontSize:13,cursor:"pointer"}}>🔖</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("feed");
  const [role, setRole] = useState("employer");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [worker, setWorker] = useState(null);
  const [matched, setMatched] = useState(null);
  const [matches, setMatches] = useState([]);
  const [prevScreen, setPrevScreen] = useState("feed");
  const [selectedService, setSelectedService] = useState(null);
  const [hasWorkerProfile, setHasWorkerProfile] = useState(false);

  function handleLogin() {
    setScreen("feed");
    setTab("feed");
  }

  function handleRoleChange(r) {
    setRole(r);
    if (r === "worker" && !hasWorkerProfile && screen !== "profile") {
      setHasWorkerProfile(true);
    }
    if (["feed","jobs","search","map"].includes(screen)) {
      setScreen("feed");
      setTab("feed");
    }
  }

  function go(t) {
    setPrevScreen(screen);
    setTab(t);
    setScreen(t);
  }

  const noNav = ["splash","login","worker","configure","payment","confirm","verify","insignias","addservice","servicedetail","chat","notif","waiting","post"];
  const showNav = !noNav.includes(screen);

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#0A0A0A"}}>
      <Phone>
        {screen === "splash"     && <SplashScreen onDone={()=>setScreen("login")}/>}
        {screen === "login"      && <LoginScreen onLogin={handleLogin}/>}
        {screen === "feed"       && role === "employer" && <HomeScreen go={go} setS={setScreen} setWorker={setWorker} setMatched={setMatched} role={role} setRole={handleRoleChange} matches={matches}/>}
        {screen === "feed"       && role === "worker"   && <WorkerFeed go={go} setS={setScreen} role={role} setRole={handleRoleChange}/>}
        {screen === "search"     && <ExploreScreen setS={setScreen} setWorker={setWorker} setMatched={setMatched} role={role} setRole={handleRoleChange}/>}
        {screen === "jobs"       && <WorkerFeed go={go} setS={setScreen} role={role} setRole={handleRoleChange}/>}
        {screen === "map"        && <ExploreScreen setS={setScreen} setWorker={setWorker} setMatched={setMatched} role={role} setRole={handleRoleChange}/>}
        {screen === "worker"     && worker  && <WorkerScreen worker={worker} setS={setScreen} setMatched={setMatched}/>}
        {screen === "configure"  && matched && <ConfigureScreen matched={matched} setS={setScreen}/>}
        {screen === "waiting"    && matched && <WaitingForWorker matched={matched} setS={setScreen}/>}
        {screen === "payment"    && matched && <PaymentScreen matched={matched} setS={setScreen}/>}
        {screen === "confirm"    && matched && <ConfirmScreen matched={matched} setS={setScreen} setMatches={setMatches}/>}
        {screen === "chat"       && matched && <ChatScreen matched={matched} setS={setScreen} backTo={prevScreen}/>}
        {screen === "agenda"     && <AgendaScreen go={go} role={role}/>}
        {screen === "profile"    && <ProfileScreen setS={setScreen} role={role} setRole={handleRoleChange} matches={matches} setSelectedService={setSelectedService}/>}
        {screen === "notif"      && <NotificationsScreen setS={setScreen}/>}
        {screen === "verify"     && <VerifyScreen setS={setScreen}/>}
        {screen === "insignias"  && <InsigniasScreen setS={setScreen}/>}
        {screen === "post"       && role === "employer" && <CreateOfferScreen setS={setScreen} role={role}/>}
        {screen === "post"       && role === "worker"   && <AddServiceScreen setS={setScreen} setSelectedService={setSelectedService}/>}
        {screen === "servicedetail" && selectedService && <ServiceDetailScreen service={selectedService} setS={setScreen}/>}
        {showNav && <BottomNav active={tab} go={go} role={role}/>}
      </Phone>
    </div>
  );
}
