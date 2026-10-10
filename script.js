
function getCart(){try{return JSON.parse(localStorage.getItem('makhanaCart')||'[]')}catch(e){return []}}
function saveCart(cart){localStorage.setItem('makhanaCart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){let n=getCart().reduce((s,p)=>s+p.qty,0);document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=n)}
function addToCart(name,price){let cart=getCart();let p=cart.find(x=>x.name===name);if(p)p.qty++;else cart.push({name,price,qty:1});saveCart(cart);alert(name+' added to cart!')}
function showCart(){let cart=getCart();if(!cart.length){alert('Your cart is empty. Add a makhana product first!');return}let total=cart.reduce((s,p)=>s+p.price*p.qty,0);let lines=cart.map(p=>p.name+' × '+p.qty+' = ₹'+(p.price*p.qty)).join('\n');alert('YOUR MAKHANA ROOTS CART\n\n'+lines+'\n\nTotal: ₹'+total+'\n\nDemo checkout only — no real payment is processed.')}
document.addEventListener('DOMContentLoaded',updateCartCount);
