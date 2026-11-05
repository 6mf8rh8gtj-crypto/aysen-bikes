const bikes=[
{id:1,name:'Patagonia Trail',category:'Montaña',price:549990,description:'Aventura y control para senderos de montaña.',image:'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80'},
{id:2,name:'Ciudad Verde',category:'Urbana',price:329990,description:'Comodidad para recorridos diarios.',image:'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'},
{id:3,name:'Ruta Austral',category:'Ruta',price:799990,description:'Ligereza y velocidad.',image:'images/ruta-austral.svg'},
{id:4,name:'Cóndor MTB',category:'Montaña',price:629990,description:'Para caminos exigentes.',image:'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?auto=format&fit=crop&w=800&q=80'},
{id:5,name:'Paseo Sur',category:'Urbana',price:289990,description:'Práctica para la ciudad.',image:'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80'},
{id:6,name:'Viento Pro',category:'Ruta',price:949990,description:'Para recorridos largos.',image:'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80'}
];
const formatPrice=n=>new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(n);
const cart=[];
const products=document.querySelector('#products');
function renderProducts(category='Todas'){
  products.innerHTML='';
  bikes.filter(b=>category==='Todas'||b.category===category).forEach(b=>{
    const article=document.createElement('article');
    article.className='product';
    article.innerHTML=`<img src="${b.image}" alt="Bicicleta ${b.name}" loading="lazy"><div class="product-body"><span class="category">${b.category}</span><h3>${b.name}</h3><p>${b.description}</p><div class="product-bottom"><span class="price">${formatPrice(b.price)}</span><button class="add">+ Agregar</button></div></div>`;
    article.querySelector('button').addEventListener('click',()=>addToCart(b.id));
    products.appendChild(article);
  });
}
function addToCart(id){
  cart.push(id);
  document.querySelector('#cartCount').textContent=cart.length;
}
function showCart(){
  const content=document.querySelector('#cartItems');
  content.innerHTML='';
  if(!cart.length){
    content.textContent='Tu carrito está vacío.';
  }else{
    const counts=new Map();
    cart.forEach(id=>counts.set(id,(counts.get(id)||0)+1));
    counts.forEach((qty,id)=>{
      const b=bikes.find(x=>x.id===id);
      const row=document.createElement('div');
      row.className='cart-line';
      row.textContent=`${b.name} × ${qty} — ${formatPrice(b.price*qty)}`;
      content.appendChild(row);
    });
  }
  document.querySelector('#cartTotal').textContent=`Total: ${formatPrice(cart.reduce((sum,id)=>sum+bikes.find(b=>b.id===id).price,0))}`;
  document.querySelector('#cartDialog').showModal();
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(btn.dataset.filter);
}));
document.querySelector('#cartButton').addEventListener('click',showCart);
document.querySelector('#closeCart').addEventListener('click',()=>document.querySelector('#cartDialog').close());
document.querySelector('#clearCart').addEventListener('click',()=>{
  cart.length=0;
  document.querySelector('#cartCount').textContent='0';
  showCart();
});
document.querySelector('#year').textContent=new Date().getFullYear();
renderProducts();
