
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