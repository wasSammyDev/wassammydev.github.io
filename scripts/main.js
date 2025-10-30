// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
});

// Capture clicks at document level before they're blocked
document.addEventListener(
    "mousedown",
    function (e) {
        // Find the actual element being clicked
        const clickedElement = document.elementFromPoint(e.clientX, e.clientY);

        // Check if it's a link or inside a link
        const link = clickedElement.closest("a");

        if (link) {
            e.preventDefault();
            e.stopPropagation();

            console.log("Link clicked:", link);

            // Animate cursor click effect
            cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
            cursorDot.style.transform = "translate(-50%, -50%) scale(0.8)";

            setTimeout(() => {
                cursor.style.transform = "translate(-50%, -50%) scale(1)";
                cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
            }, 100);

            const href = link.getAttribute("href");
            console.log("href:", href);

            // Check if it's an internal link
            if (href && href.startsWith("#")) {
                console.log("Internal link detected:", href);
                const target = document.querySelector(href);

                if (target) {
                    console.log("Target found, scrolling to:", href);
                    // Smooth scroll to target
                    const offset = 80;
                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });
                } else {
                    console.log("Target not found for:", href);
                }
            } else if (
                href &&
                (href.startsWith("http") || href.startsWith("https"))
            ) {
                // External link
                console.log("External link detected:", href);
                window.open(href, link.target || "_blank");
            }
        }
    },
    true
); // Use capture phase

// Hover effects for interactive elements
const interactiveElements = document.querySelectorAll(
    "a, button, .project-card, .game-card, .nav-link, .nav-link-cta, .btn-primary, .btn-secondary, .game-play-btn, .project-link"
);

interactiveElements.forEach((el) => {
    // Hover enter
    el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursor.style.borderColor = "var(--cyan)";
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
    });

    // Hover leave
    el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.borderColor = "var(--blue)";
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    });

    // Mouse down
    el.addEventListener("mousedown", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
        cursorDot.style.transform = "translate(-50%, -50%) scale(0.8)";
    });

    // Mouse up
    el.addEventListener("mouseup", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document
    .querySelectorAll(".project-card, .game-card, .section-header")
    .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
    });
