const T={
uz:{nav_about:"Men haqimda",nav_skills:"Ko‘nikmalar",nav_projects:"Loyihalar",nav_contact:"Aloqa",
hello:"Salom, men Irodaxon",h1:"Ma’lumotni tizimga, tizimni odamga bog‘layman.",
lead:"Farg‘ona davlat texnika universitetida Axborot tizimlari va texnologiyalari yo‘nalishida 3-kurs talabasiman. Veb-saytlar, ma’lumotlar bazasi va dasturlashni o‘rganyapman.",
cta1:"Loyihalarni ko‘rish",cta2:"Bog‘lanish",cap:"Axborot tizimlari va texnologiyalari",
about_t:"Men haqimda",about_p:"Texnologiya menga murakkab narsalarni oddiy qilishning yo‘li bo‘lib tuyuladi. Jadvaldagi ma’lumotdan tortib ishlaydigan veb-saytgacha — hammasini bir-biriga ulanadigan tizim sifatida ko‘raman va yangisini har kuni o‘rganishga harakat qilaman.",
d_uni:"Universitet",v_uni:"Farg‘ona davlat texnika universiteti",d_field:"Yo‘nalish",v_field:"Axborot tizimlari va texnologiyalari",d_year:"Bosqich",v_year:"3-bosqich",
skills_t:"Ko‘nikmalar",s_db:"Ma’lumotlar bazasi",s_net:"Kompyuter tarmoqlari",s_uml:"UML modellashtirish",
proj_t:"Loyihalar",p1_t:"Talabalar hisoboti",p1_d:"Baholar va davomatni jadval hamda diagramma ko‘rinishida ko‘rsatadigan panel.",
p2_t:"Kutubxona bazasi",p2_d:"Kitoblar, o‘quvchilar va qarzlarni bog‘laydigan ma’lumotlar bazasi sxemasi.",
p3_t:"Tarmoq xaritasi",p3_d:"Universitet kompyuter xonasi tarmog‘ining tugunlari va ulanishlari modeli.",
contact_t:"Keling, bog‘lanamiz",contact_p:"Hamkorlik, amaliyot yoki savol bo‘lsa, yozing — javob beraman.",foot:"Farg‘ona, O‘zbekiston"},
en:{nav_about:"About",nav_skills:"Skills",nav_projects:"Projects",nav_contact:"Contact",
hello:"Hi, I’m Irodaxon",h1:"I connect data to systems, and systems to people.",
lead:"I’m a 3rd-year student of Information Systems and Technologies at Fergana State Technical University. I’m learning web development, databases and programming.",
cta1:"See projects",cta2:"Get in touch",cap:"Information Systems and Technologies",
about_t:"About me",about_p:"To me, technology is a way to make complicated things simple. From a row in a table to a working website, I see everything as a connected system, and I try to learn something new every day.",
d_uni:"University",v_uni:"Fergana State Technical University",d_field:"Field",v_field:"Information Systems and Technologies",d_year:"Year",v_year:"3rd year",
skills_t:"Skills",s_db:"Databases",s_net:"Computer networks",s_uml:"UML modeling",
proj_t:"Projects",p1_t:"Student report",p1_d:"A dashboard that shows grades and attendance as tables and charts.",
p2_t:"Library database",p2_d:"A database schema linking books, readers and loans.",
p3_t:"Network map",p3_d:"A model of the nodes and links in a university computer lab network.",
contact_t:"Let’s connect",contact_p:"For collaboration, an internship or a question, write to me and I’ll reply.",foot:"Fergana, Uzbekistan"}};
const root=document.documentElement;
function store(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function load(k){try{return localStorage.getItem(k)}catch(e){return null}}
function setLang(l){root.lang=l;document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=T[l][e.dataset.i18n]);
document.title=l==="uz"?"Irodaxon — Axborot tizimlari":"Irodaxon — Information Systems";store("lang",l)}
function setTheme(t){root.dataset.theme=t;store("theme",t)}
setLang(load("lang")||"uz");
setTheme(load("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
document.getElementById("lang").onclick=()=>setLang(root.lang==="uz"?"en":"uz");
document.getElementById("theme").onclick=()=>setTheme(root.dataset.theme==="dark"?"light":"dark");
document.getElementById("y").textContent=new Date().getFullYear();
/* tarmoq animatsiyasi / network animation */
const c=document.getElementById("net"),x=c.getContext("2d"),m={x:-999,y:-999};let P=[],W,H;
const calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
function size(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;P=Array.from({length:Math.round(W*H/16000)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}))}
function draw(){x.clearRect(0,0,W,H);const rgb=getComputedStyle(root).getPropertyValue("--net");
P.forEach((p,i)=>{if(!calm){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}
for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){x.strokeStyle=`rgba(${rgb},${.35*(1-d/130)})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}
const dm=Math.hypot(p.x-m.x,p.y-m.y);if(dm<170){x.strokeStyle=`rgba(255,111,145,${.7*(1-dm/170)})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(m.x,m.y);x.stroke()}
x.fillStyle=`rgba(${rgb},.8)`;x.beginPath();x.arc(p.x,p.y,2.4,0,7);x.fill()});
if(!calm)requestAnimationFrame(draw)}
c.parentElement.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});
c.parentElement.addEventListener("mouseleave",()=>{m.x=m.y=-999});
addEventListener("resize",size);size();draw();
