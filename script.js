
const PRODUCTS = {
'classic-1':{name:'Classic Roasted Makhana',price:149,img:'classic.jpg'},
'classic-2':{name:'Pepper & Salt Makhana',price:159,img:'classic.jpg'},
'classic-3':{name:'Family Classic Pack',price:299,img:'packs.jpg'},
'flavoured-1':{name:'Peri Peri Makhana',price:179,img:'flavoured.jpg'},
'flavoured-2':{name:'Mint Pudina Makhana',price:169,img:'herb.jpg'},
'flavoured-3':{name:'Masala Makhana',price:169,img:'flavoured.jpg'},
'healthy-1':{name:'Lightly Roasted Makhana',price:149,img:'classic.jpg'},
'healthy-2':{name:'Herb Garden Makhana',price:169,img:'herb.jpg'},
'healthy-3':{name:'Daily Snack Trio',price:299,img:'packs.jpg'},
'premium-1':{name:'Premium Family Pack',price:449,img:'packs.jpg'},
'premium-2':{name:'Three-Flavour Combo',price:499,img:'packs.jpg'},
'premium-3':{name:'Makhana Gift Box',price:799,img:'packs.jpg'}
};
const CARTKEY='makhanaRootsCartV2';
function getCart(){try{return JSON.parse(localStorage.getItem(CARTKEY)||'{}')}catch(e){return {}}}
function saveCart(c){localStorage.setItem(CARTKEY,JSON.stringify(c));updateCount()}
function updateCount(){const c=getCart();const n=Object.values(c).reduce((a,b)=>a+b,0);document.querySelectorAll('#cartCount').forEach(x=>x.textContent=n)}
function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2100)}
function addToCart(id){const c=getCart();c[id]=(c[id]||0)+1;saveCart(c);toast(PRODUCTS[id].name+' added to cart');}
function changeQty(id,delta){const c=getCart();c[id]=(c[id]||0)+delta;if(c[id]<=0)delete c[id];saveCart(c);renderCart()}
function removeItem(id){const c=getCart();delete c[id];saveCart(c);renderCart()}
function openCart(){document.getElementById('cartOverlay').classList.add('open');document.body.style.overflow='hidden';renderCart()}
function closeCart(){document.getElementById('cartOverlay').classList.remove('open');document.body.style.overflow=''}
function overlayClick(e){if(e.target.id==='cartOverlay')closeCart()}
function renderCart(){
 const cart=getCart(), box=document.getElementById('cartContents'), bottom=document.getElementById('cartBottom');if(!box||!bottom)return;
 const entries=Object.entries(cart).filter(([id,q])=>PRODUCTS[id]&&q>0);
 if(!entries.length){box.innerHTML='<div class="empty"><div style="font-size:3rem">🛒</div><h3>Your cart is waiting</h3><p>Add a few makhana favourites and they will appear here.</p><a class="btn" href="classic.html" onclick="closeCart()">Explore products</a></div>';bottom.innerHTML='';return}
 let total=0;
 box.innerHTML=entries.map(([id,q])=>{const p=PRODUCTS[id];total+=p.price*q;return `<div class="cartitem"><img src="assets/${p.img}" alt=""><div><h4>${p.name}</h4><small>₹${p.price} each</small><div class="qty"><button onclick="changeQty('${id}',-1)">−</button><strong>${q}</strong><button onclick="changeQty('${id}',1)">+</button></div></div><div style="text-align:right"><strong>₹${p.price*q}</strong><br><button class="remove" onclick="removeItem('${id}')">Remove</button></div></div>`}).join('');
 bottom.innerHTML=`<div class="carttotal"><span>Subtotal</span><span>₹${total}</span></div><div style="display:flex;justify-content:space-between;color:var(--muted);font-size:.86rem"><span>Shipping</span><span>Calculated at checkout</span></div><button class="btn" style="width:100%;margin-top:18px" onclick="openCheckout()">Proceed to checkout →</button><p class="checkoutnote">Demo checkout only. No online payment is collected.</p>`;
}
function openCheckout(){
 const c=getCart(), entries=Object.entries(c).filter(([id,q])=>PRODUCTS[id]&&q>0);
 if(!entries.length){toast('Your cart is empty');return}
 const total=entries.reduce((s,[id,q])=>s+PRODUCTS[id].price*q,0);
 const html=`<div class="drawerhead"><h2>Checkout</h2><button class="close" onclick="renderCart()">×</button></div><p>Enter sample details to complete the demo order.</p><form id="checkoutForm"><label for="coName">Full name *</label><input id="coName" required placeholder="Your name"><label for="coEmail">Email *</label><input id="coEmail" type="email" required placeholder="you@example.com"><label for="coPhone">Phone *</label><input id="coPhone" required type="tel" placeholder="Phone number"><label for="coAddress">Delivery address *</label><textarea id="coAddress" required rows="3" placeholder="House, street, city, PIN"></textarea><label for="coPay">Payment method (demo)</label><select id="coPay"><option>Cash on Delivery (demo)</option><option>UPI (not connected)</option></select><div class="carttotal"><span>Order total</span><span>₹${total}</span></div><button class="btn" type="submit" style="width:100%">Place demo order</button></form><p class="checkoutnote">This project does not collect payment or send orders to a real seller.</p>`;
 document.getElementById('cartContents').innerHTML=html;document.getElementById('cartBottom').innerHTML='';
 document.getElementById('checkoutForm').addEventListener('submit',function(e){e.preventDefault();const name=document.getElementById('coName').value.trim();const email=document.getElementById('coEmail').value.trim();const order='MR-'+Date.now().toString().slice(-6);document.getElementById('cartContents').innerHTML=`<div class="empty"><div style="font-size:3rem">✓</div><h2>Demo order placed!</h2><p>Thank you, ${name.replace(/[<>&"]/g,'')}.</p><p>Your demo order number is <strong>${order}</strong>.</p><p>A real order has not been sent and no payment was taken.</p><button class="btn" onclick="localStorage.removeItem(CARTKEY);updateCount();closeCart();location.href='index.html'">Continue shopping</button></div>`;document.getElementById('cartBottom').innerHTML='';});
}
function toggleMenu(){document.getElementById('mainNav').classList.toggle('open')}
document.addEventListener('DOMContentLoaded',()=>{updateCount();const form=document.getElementById('enquiryForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();toast('Thank you! Your demo enquiry is recorded on this screen.');form.reset()})});
