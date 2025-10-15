// ---------------- Background Bubbles ----------------
const canvas=document.getElementById('bg-canvas');
const ctx=canvas.getContext('2d');
let w,h;
function resizeCanvas(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
window.addEventListener('resize',resizeCanvas); resizeCanvas();

class Bubble{constructor(){this.x=Math.random()*w;this.y=h+Math.random()*100;this.radius=15+Math.random()*25;
this.vx=(Math.random()-0.5)*0.5;this.vy=-0.6-Math.random();this.alpha=0.1+Math.random()*0.1;
this.color=['#14fff1','#f75fff','#2afaff','#ff4fd7','#64ffe7'][Math.floor(Math.random()*5)];}
update(){this.x+=this.vx;this.y+=this.vy;if(this.y+this.radius<0){this.y=h+Math.random()*100;this.x=Math.random()*w;}}
draw(){ctx.save();ctx.globalAlpha=this.alpha;ctx.beginPath();ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
ctx.fillStyle=this.color;ctx.shadowColor=this.color;ctx.shadowBlur=20;ctx.fill();ctx.restore();}}

const bubbles=[];
for(let i=0;i<40;i++) bubbles.push(new Bubble());
function animate(){ ctx.clearRect(0,0,w,h); bubbles.forEach(b=>{b.update();b.draw();}); requestAnimationFrame(animate);}
animate();

// ---------------- Login ----------------
const loginForm=document.getElementById("login-form");
const loginContainer=document.getElementById("loginContainer");
const welcomeContainer=document.getElementById("welcomeContainer");
const usernameInput=document.getElementById("username");
const passwordInput=document.getElementById("password");
const message=document.getElementById("message");
const neonBtn=document.querySelector(".neon-btn");
const btnText=neonBtn.querySelector(".btn-text");
const spinner=neonBtn.querySelector(".spinner");
const logoutBtn=document.getElementById("logoutBtn");
const welcomeMsg=document.getElementById("welcomeMessage");

const validUsername="admin";
const validPassword="12345";

// Check if already logged in
const loggedUser=localStorage.getItem("loggedInUser");
if(loggedUser){
  loginContainer.style.display="none";
  welcomeContainer.style.display="block";
  welcomeMsg.textContent=`Welcome, ${loggedUser}!`;
}

// Login submit
loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const username=usernameInput.value.trim();
  const password=passwordInput.value.trim();

  message.style.opacity=0;
  loginForm.classList.remove("shake");
  btnText.textContent="";
  spinner.style.display="inline-block";
  neonBtn.disabled=true;

  setTimeout(()=>{
    spinner.style.display="none";
    neonBtn.disabled=false;

    if(username===validUsername && password===validPassword){
      btnText.textContent="Success!";
      localStorage.setItem("loggedInUser",username);
      loginContainer.style.display="none";
      welcomeContainer.style.display="block";
      welcomeMsg.textContent=`Welcome, ${username}!`;
    } else {
      btnText.textContent="Login";
      message.textContent="❌ Invalid Username or Password!";
      message.style.color="#f75fff";
      message.style.opacity=1;
      loginForm.classList.add("shake");
    }

    setTimeout(()=>{ btnText.textContent="Login"; },1500);
  },1000);
});

// Logout
logoutBtn.addEventListener("click",()=>{
  localStorage.removeItem("loggedInUser");
  welcomeContainer.style.display="none";
  loginContainer.style.display="block";
  usernameInput.value="";
  passwordInput.value="";
  message.style.opacity=0;
});
