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

// 🧠 RESPUESTA PRINCIPAL
function responder(msg){

    try {
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
            return "Hola 👋 ¿Qué necesitas?";
        }

        // 💻 PROGRAMACIÓN
        if(m.includes("codigo") || m.includes("programar")){
            return "Dime qué quieres hacer y te doy el código.";
        }

        // RESPUESTAS GENERALES
        if(m.includes("como")){
            return "Depende de lo que buscas. Dame más detalles.";
        }

        if(m.includes("que es")){
            return "Eso depende del contexto. Explícame mejor.";
        }

        if(m.includes("por que")){
            return "Puede haber varias razones.";
        }

        // FALLBACK (nunca vacío)
        return generar();

    } catch {
        return "No entendí eso.";
    }
}

// 🧠 RESPUESTA NATURAL
function generar(){
    const respuestas=[
        "No está claro, dime más.",
        "Explícalo mejor.",
        "Dame más contexto.",
        "No entendí bien.",
        "Reformula eso."
    ];
    return respuestas[Math.floor(Math.random()*respuestas.length)];
}

// 🚀 ENVIAR
function send(){
    const text = input.value.trim();
    if(!text) return;

    add(text,"user");
    input.value="";

    setTimeout(()=>{
        add(responder(text),"ai");
    },400);
}

// EVENTOS
btn.addEventListener("click", send);

input.addEventListener("keypress", e=>{
    if(e.key==="Enter") send();
});
