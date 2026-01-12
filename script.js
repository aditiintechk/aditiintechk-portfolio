/* // Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add a subtle animation to the button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
}); */

// Smooth scroll for dock navigation
document.querySelectorAll('.dock-item[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute('href'))

		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	})
})

// Intersection Observer for scroll animations
const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1'
			entry.target.style.transform = 'translateY(0)'
			observer.unobserve(entry.target)
		}
	})
}, observerOptions)

// Observe all sections for scroll animations
const sections = document.querySelectorAll('.section')
sections.forEach((section) => {
	observer.observe(section)
})

// Add scroll progress indicator
const createScrollProgress = () => {
	const progressBar = document.createElement('div')
	progressBar.className = 'scroll-progress'
	progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
        z-index: 9999;
        transition: width 0.1s ease;
    `
	document.body.appendChild(progressBar)

	return progressBar
}

const progressBar = createScrollProgress()

window.addEventListener('scroll', () => {
	const windowHeight =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight
	const scrolled = (window.scrollY / windowHeight) * 100
	progressBar.style.width = scrolled + '%'
})

// Parallax effect for hero section
let lastScrollY = window.scrollY

window.addEventListener(
	'scroll',
	() => {
		const heroSection = document.querySelector('.hero-section')
		const scrollY = window.scrollY

		if (heroSection && scrollY < window.innerHeight) {
			heroSection.style.transform = `translateY(${scrollY * 0.5}px)`
			heroSection.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8
		}

		lastScrollY = scrollY
	},
	{ passive: true }
)

// Enhanced card hover effects
const cards = document.querySelectorAll('.card')

cards.forEach((card) => {
	card.addEventListener('mouseenter', function () {
		this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
	})

	card.addEventListener('mousemove', function (e) {
		const rect = this.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const centerX = rect.width / 2
		const centerY = rect.height / 2

		const rotateX = (y - centerY) / 20
		const rotateY = (centerX - x) / 20

		this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
	})

	card.addEventListener('mouseleave', function () {
		this.style.transform =
			'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
	})
})

// Add typing effect to hero title (optional)
const heroTitle = document.querySelector('.hero-title')
if (heroTitle) {
	const text = heroTitle.innerHTML
	heroTitle.innerHTML = ''
	heroTitle.style.opacity = '1'

	let charIndex = 0
	const typeSpeed = 50

	function typeWriter() {
		if (charIndex < text.length) {
			heroTitle.innerHTML += text.charAt(charIndex)
			charIndex++
			setTimeout(typeWriter, typeSpeed)
		}
	}

	// Uncomment to enable typing effect
	// setTimeout(typeWriter, 500);

	// For now, just show the text immediately
	heroTitle.innerHTML = text
}

// Add stagger animation to skill badges
const skillBadges = document.querySelectorAll('.skill-badge')
skillBadges.forEach((badge, index) => {
	badge.style.opacity = '0'
	badge.style.transform = 'translateY(10px)'

	setTimeout(() => {
		badge.style.transition = 'all 0.3s ease'
		badge.style.opacity = '1'
		badge.style.transform = 'translateY(0)'
	}, 800 + index * 30)
})

// Add stagger animation to project cards
const projectCards = document.querySelectorAll('.project-card')
projectCards.forEach((card, index) => {
	card.style.opacity = '0'
	card.style.transform = 'translateY(20px)'

	const cardObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						card.style.transition = 'all 0.5s ease'
						card.style.opacity = '1'
						card.style.transform = 'translateY(0)'
					}, index * 100)
					cardObserver.unobserve(card)
				}
			})
		},
		{ threshold: 0.1 }
	)

	cardObserver.observe(card)
})

// Highlight active section in dock navigation
const navObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const id = entry.target.getAttribute('id')
				const navLink = document.querySelector(
					`.dock-item[href="#${id}"]`
				)

				if (navLink) {
					document.querySelectorAll('.dock-item').forEach((link) => {
						link.classList.remove('active')
					})
					navLink.classList.add('active')
				}
			}
		})
	},
	{ threshold: 0.5 }
)

// Observe all sections with IDs
document.querySelectorAll('section[id]').forEach((section) => {
	navObserver.observe(section)
})

// Add active state styling
const style = document.createElement('style')
style.textContent = `
    .dock-item.active {
        background-color: var(--accent-primary) !important;
        color: white !important;
    }
`
document.head.appendChild(style)

// Add click animation to all buttons and links
document.querySelectorAll('a, button').forEach((element) => {
	element.addEventListener('click', function (e) {
		const ripple = document.createElement('span')
		ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
            animation: ripple 0.6s;
            pointer-events: none;
        `

		const rect = this.getBoundingClientRect()
		ripple.style.left = e.clientX - rect.left + 'px'
		ripple.style.top = e.clientY - rect.top + 'px'

		this.style.position = 'relative'
		this.style.overflow = 'hidden'
		this.appendChild(ripple)

		setTimeout(() => ripple.remove(), 600)
	})
})

// Add ripple animation
const rippleStyle = document.createElement('style')
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`
document.head.appendChild(rippleStyle)

// Lazy load images
const images = document.querySelectorAll('img[data-src]')
const imageObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const img = entry.target
			img.src = img.dataset.src
			img.removeAttribute('data-src')
			imageObserver.unobserve(img)
		}
	})
})

images.forEach((img) => imageObserver.observe(img))

// Add easter egg: Konami code
let konamiCode = []
const konamiSequence = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a',
]

document.addEventListener('keydown', (e) => {
	konamiCode.push(e.key)
	konamiCode = konamiCode.slice(-konamiSequence.length)

	if (konamiCode.join(',') === konamiSequence.join(',')) {
		// Easter egg activated!
		document.body.style.animation = 'rainbow 2s infinite'
		const easterEggStyle = document.createElement('style')
		easterEggStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `
		document.head.appendChild(easterEggStyle)

		setTimeout(() => {
			document.body.style.animation = ''
		}, 5000)
	}
})

// Performance monitoring
if ('PerformanceObserver' in window) {
	const perfObserver = new PerformanceObserver((list) => {
		for (const entry of list.getEntries()) {
			if (entry.duration > 50) {
				console.log(
					`Performance warning: ${entry.name} took ${entry.duration}ms`
				)
			}
		}
	})

	perfObserver.observe({ entryTypes: ['measure'] })
}

// Add console message
console.log(
	'%c👋 Welcome to my portfolio!',
	'font-size: 20px; font-weight: bold; color: #3b82f6;'
)
console.log(
	"%cLike what you see? Let's connect!",
	'font-size: 14px; color: #6b7280;'
)
