// tinymce.init({
//     selector: '.tinymce-editor',
//     language: 'da',
//     promotion: false,
//     branding: false,
//     browser_spellcheck: false,
//     plugins: 'lists fullscreen charmap wordcount autosave table autoresize',
//     autosave_interval: '1s',
//     autosave_retention: '300m',
//     autosave_restore_when_empty: true,
//     autosave_prefix: 'tinymce-{id}',
//     min_height: 500,
//     autoresize_bottom_margin: 0,
//     toolbar: 'undo redo | wordcount fullscreen | blocks | formatselect bold italic underline | charmap | bullist numlist | alignleft aligncenter alignright alignjustify lineheight outdent indent',
//     menubar: 'edit insert format tools',
//     menu: {
//         edit: { title: 'Edit', items: 'undo redo' },
//         insert: { title: 'Insert', items: 'charmap hr | pagebreak nonbreaking anchor' },
//         format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | removeformat' },
//         tools: { title: 'Tools', items: 'wordcount' }
//     },
//     setup: function (editor) {
//         editor.on('init', function () {
//             editor.getBody().setAttribute('translate', 'no');

//             // Load the autosaved content, if any
//             let editorContent = localStorage.getItem('tinymce-' + editor.id + 'draft');
//             editorContent = editorContent ? editorContent : '';

//             // Call the function to update word count
//             updateWordCount(editor);
//         });

//         // Update word count on any content change
//         editor.on('keyup change', function () {
//             updateWordCount(editor);
//         });
//     },
//     paste_preprocess: function (editor, args) {
//         if (!args.internal) {
//             args.content = '';
//         }
//     }
// });

// // Function to update the word count in the div
// function updateWordCount(editor) {
//     const wordCountPlugin = editor.plugins.wordcount;
//     const wordCount = wordCountPlugin.getCount();
//     const wordCountElement = document.getElementById('wordCountTextWrapper');

//     // Check if the element exists before trying to update it
//     if (wordCountElement) {
//         wordCountElement.innerText = `${wordCount}`;
//     }
// }

// Debounce function to limit how often word count updates
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Function to update the word count in the div
function updateWordCount(editor) {
    const wordCountPlugin = editor.plugins.wordcount;
    const wordCount = wordCountPlugin.getCount();
    const wordCountElement = document.getElementById('wordCountTextWrapper');

    // Check if the element exists before trying to update it
    if (wordCountElement) {
        wordCountElement.innerText = `${wordCount}`;
    }
}

// Debounced version of updateWordCount (updates after user stops typing for 300ms)
const debouncedUpdateWordCount = debounce(updateWordCount, 300);

tinymce.init({
    selector: '.tinymce-editor',
    language: 'da',
    promotion: false, // Remove TinyMCE promotion banner
    branding: false, // Remove TinyMCE branding
    browser_spellcheck: false, // Disable built-in spellcheck
    plugins: 'lists charmap wordcount autosave autoresize', // Only keep necessary plugins
    autosave_interval: '60s', // Set autosave to trigger every 60 seconds for better performance
    autosave_retention: '300m',
    autosave_restore_when_empty: true,
    autosave_prefix: 'tinymce-{id}',
    min_height: 500,
    autoresize_bottom_margin: 0,

    // Simplified toolbar with only necessary buttons
    toolbar: 'wordcount | blocks | bold italic underline | charmap | bullist',
    menubar: false, // Completely remove the menu bar

    setup: function (editor) {
        editor.on('init', function () {
            editor.getBody().setAttribute('translate', 'no');

            // Load the autosaved content, if any
            let editorContent = localStorage.getItem('tinymce-' + editor.id + 'draft');
            editorContent = editorContent ? editorContent : '';

            // Call the function to update word count initially
            updateWordCount(editor);
        });

        // Use debounced version to update word count on keyup and change events
        editor.on('keyup change', function () {
            debouncedUpdateWordCount(editor);
        });
    },

    // Pre-process pasted content (blocks external paste content)
    paste_preprocess: function (editor, args) {
        if (!args.internal) {
            args.content = '';
        }
    }
});