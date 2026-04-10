const chat = document.getElementById("chat");
const input = document.getElementById("input");
const btn = document.getElementById("btn");

function add(text, type){
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerHTML = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// 🔥 BUSCAR EN WIKIPEDIA REAL
async function buscarWikipedia(query){
    try{
        const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        const res = await fetch(url);

        if(!res.ok) return null;

        const data = await res.json();

        if(data.extract){
            return `<strong>${data.title}</strong><br><br>${data.extract}`;
        }

        return null;
    }catch{
        return null;
    }
}

// 🧠 RESPUESTA PRINCIPAL
async function responder(msg){

    const m = msg.toLowerCase().trim();

    // 🔢 MATEMÁTICAS
    if(/[0-9+\-*/().]/.test(m)){
        try{
            let exp = m.replace(/[^0-9+\-*/().]/g,"");
            let res = Function("return " + exp)();
            if(!isNaN(res)) return exp + " = " + res;
        }catch{}
    }

    // 📅 FECHA
    if(m.includes("fecha") || m.includes("hoy")){
        return new Date().toLocaleDateString();
    }

    // ⏰ HORA
    if(m.includes("hora")){
        return new Date().toLocaleTimeString();
    }

    // 😂 CHISTES
    if(m.includes("chiste")){
        const jokes=[
            "¿Por qué el libro de matemáticas estaba triste? Porque tenía muchos problemas 😂",
            "¿Qué hace una abeja en el gimnasio? Zum-ba 🐝",
            "¿Por qué la compu se enfermó? Por un virus 💻"
        ];
        return jokes[Math.floor(Math.random()*jokes.length)];
    }

    // 👋 SALUDO
    if(/hola|hey|hi|buenas/.test(m)){
        return "Hola 👋";
    }

    // 🌐 BUSCAR RESPUESTA REAL
    let wiki = await buscarWikipedia(msg);
    if(wiki) return wiki;

    // 🧠 RESPUESTA INTELIGENTE
    return generar();
}

// RESPUESTAS NATURALES
function generar(){
    const respuestas=[
        "No encontré info clara. Intenta ser más específico.",
        "No tengo datos suficientes, prueba otra forma.",
        "No aparece información directa sobre eso.",
        "Intenta preguntarlo de otra manera."
    ];
    return respuestas[Math.floor(Math.random()*respuestas.length)];
}

// 🚀 ENVIAR
async function send(){
    const text = input.value.trim();
    if(!text) return;

    add(text,"user");
    input.value="";

    add("Pensando...","ai");

    const respuesta = await responder(text);

    chat.lastChild.remove();
    add(respuesta,"ai");
}

// EVENTOS
btn.addEventListener("click", send);

input.addEventListener("keypress", e=>{
    if(e.key==="Enter") send();
});
