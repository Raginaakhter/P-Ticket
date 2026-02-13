
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}
// COUPON CARD JAVASCRIPT


function showAllOffers() {
    alert('Showing all available offers!');
}


function copyToClipboard(code) {
    navigator.clipboard.writeText(code).then(() => {
        const notification = document.getElementById('copyNotification');
        notification.textContent = `Coupon "${code}" copied!`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy coupon code. Please try again.');
    });
}


document.addEventListener('DOMContentLoaded', function() {
    

    const seeAllBtn = document.querySelector('.see-all-btn');
    if (seeAllBtn) {
        seeAllBtn.addEventListener('click', showAllOffers);
    }
    
    //  card click 
    const couponCards = document.querySelectorAll('.coupon-card');
    couponCards.forEach(card => {
        // Click to copy
        card.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            copyToClipboard(code);
        });
        
        
        card.style.cursor = 'pointer';
    });
    
    //  page load
    window.addEventListener('load', () => {
        const coupons = document.querySelectorAll('.coupon-card');
        
        coupons.forEach((coupon, index) => {
            coupon.style.opacity = '0';
            coupon.style.transform = 'translateY(20px)';
            coupon.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                coupon.style.opacity = '1';
                coupon.style.transform = 'translateY(0)';
            }, index * 150);
        });
    });
});


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('coupon-card')) {
            event.preventDefault();
            const code = activeElement.getAttribute('data-code');
            copyToClipboard(code);
        }
    }
});

// ..................................

/// Config
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const PRICE = 550;

// State
let selected = [];
const booked = ['A2', 'B1', 'C4', 'F3', 'H2'];

// Init
document.addEventListener('DOMContentLoaded', () => {
    createSeats();
    updateDisplay();
});

// Create seats
function createSeats() {
    const grid = document.getElementById('seatsGrid');
    
    ROWS.forEach(row => {
        // Row label
        const label = document.createElement('div');
        label.className = 'row-label';
        label.textContent = row;
        grid.appendChild(label);
        
        // Seats 1-4
        for (let col = 1; col <= 4; col++) {
            const id = row + col;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'seat';
            btn.textContent = id;
            
            if (booked.includes(id)) {
                btn.classList.add('booked');
                btn.disabled = true;
            }
            
            btn.onclick = () => toggle(id, btn);
            grid.appendChild(btn);
        }
    });
}

// Toggle seat
function toggle(id, btn) {
    if (booked.includes(id)) return;
    
    if (selected.includes(id)) {
        selected = selected.filter(s => s !== id);
        btn.classList.remove('selected');
    } else {
        if (selected.length >= 4) {
            alert('Maximum 4 seats allowed');
            return;
        }
        selected.push(id);
        btn.classList.add('selected');
    }
    
    updateDisplay();
}

// Update display
function updateDisplay() {
    const list = document.getElementById('selectedList');
    list.innerHTML = '';
    
    selected.forEach(seat => {
        const div = document.createElement('div');
        div.className = 'seat-line';
        div.innerHTML = `
            <span class="seat-id">${seat}</span>
            <span>Economoy</span>
            <span>550</span>
        `;
        list.appendChild(div);
    });
    
    const total = selected.length * PRICE;
    document.getElementById('totalPrice').textContent = `BDT ${total}`;
    document.getElementById('grandTotal').textContent = `BDT ${total}`;
}

// Form submit
document.querySelector('.booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (selected.length === 0) {
        alert('Please select at least one seat');
        return;
    }
    
    alert(`Booking confirmed for seats: ${selected.join(', ')}\nTotal: BDT ${selected.length * PRICE}`);
    
    // Mark as booked
    selected.forEach(id => {
        const btn = document.querySelector(`.seat:not(.booked)`);
        if (btn && btn.textContent === id) {
            btn.classList.remove('selected');
            btn.classList.add('booked');
            btn.disabled = true;
        }
    });
    
    selected = [];
    e.target.reset();
    updateDisplay();
});

// Coupon
document.querySelector('.apply-btn').addEventListener('click', () => {
    if (selected.length === 0) {
        alert('Select seats first');
        return;
    }
    
    const code = prompt('Enter coupon code:');
    if (!code) return;
    
    const coupons = {
        'NEW15': 15,
        'SAVE10': 10
    };
    
    const discount = coupons[code.toUpperCase()];
    if (discount) {
        const total = selected.length * PRICE;
        const final = total - Math.round(total * discount / 100);
        document.getElementById('grandTotal').textContent = `BDT ${final}`;
        alert(`${discount}% discount applied!`);
    } else {
        alert('Invalid coupon');
    }
});