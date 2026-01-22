function isDesktop() {
    return window.innerWidth >= 1024; // You can adjust this value for your specific needs
}

function getScrollbarWidth() {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.visibility = "hidden"; // Hide the element
    scrollDiv.style.overflow = "scroll"; // Force the scrollbar to appear
    scrollDiv.style.width = "100px"; // Set width
    scrollDiv.style.height = "100px"; // Set height
    document.body.appendChild(scrollDiv); // Append to body

    // Calculate the scrollbar width
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv); // Remove the temporary element
    return scrollbarWidth; // Return the scrollbar width
}

function applyScrollbarPadding() {
    if (isDesktop()) { // Check if it's a desktop
        const scrollbarWidth = getScrollbarWidth();
        // Add padding-right to the body to account for the scrollbar
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
}

function removeScrollbarPadding() {
    document.body.style.paddingRight = '0'; // Reset padding if no scrollbar
}

function checkForScrollbar() {
    if (!isDesktop()) return; // Don't do anything if it's not a desktop

    const bodyHeightScroll = document.body.scrollHeight; // Log the body's scrollHeight
    const windowHeight = window.innerHeight; // Visible height of window

    // Check if body height exceeds window height
    if (bodyHeightScroll > windowHeight) {
        removeScrollbarPadding(); // Reset padding if scrollbar is needed
    } else {
        applyScrollbarPadding(); // Apply padding if no scrollbar is needed
    }
}

// Initial check for scrollbar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (isDesktop()) {
        checkForScrollbar(); // Check for scrollbar on page load if desktop
    }
});

// Use event delegation to listen for clicks on elements with class "rootMenu" or "rootLinkActive"
document.addEventListener('click', function (event) {
    if (isDesktop()) { // Only trigger on desktop
        const menuItem = event.target.closest('.rootMenu, .rootLinkActive');
        if (menuItem) {
            checkForScrollbar(); // Check for scrollbar immediately after click
        }
    }
});

// Run checkForScrollbar on window resize, but only if it's a desktop
window.addEventListener("resize", checkForScrollbar);
