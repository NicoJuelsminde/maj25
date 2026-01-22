// function printContent() {
//     // Get the content from the TinyMCE editor
//     const content = tinymce.get('6bda21fd-92cf-40b6-8050-f25548418070').getContent();

//     // Get text from uni login
//     const uniloginContent = document.getElementById('unilogin').value;

//     // Place the TinyMCE editor content in the hidden div
//     document.getElementById('hidden-tinymce-text').innerHTML = content;
//     document.getElementById('hidden-unilogin-text').innerHTML = uniloginContent;

//     // Print the current page
//     window.print(); // This will print only the visible content based on the print styles
// }

// // Add event listener to the print button
// document.getElementById("printButton").addEventListener("click", printContent);
function printContent() {
    // Check if the browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Get the content from the TinyMCE editor
    const content = tinymce.get('6bda21fd-92cf-40b6-8050-f25548418070').getContent();

    // Get text from uni login
    const uniloginContent = document.getElementById('unilogin').value;

    // Place the TinyMCE editor content in the hidden div
    document.getElementById('hidden-tinymce-text').innerHTML = content;
    document.getElementById('hidden-unilogin-text').innerHTML = uniloginContent;

    // Save the current page title
    const originalTitle = document.title;

    // If Safari, update the page title with the uniloginContent
    if (isSafari) {
        document.title = `${originalTitle} unilogin: ${uniloginContent}`;
    }

    // Print the current page
    window.print();

    // Revert the title back after printing, if it was changed
    if (isSafari) {
        setTimeout(() => {
            document.title = originalTitle;
        }, 100); // Adjust timeout if necessary
    }
}

// Add event listener to the print button
document.getElementById("printButton").addEventListener("click", printContent);
