"use strict";

const allFormats = [
    'jpg', 'png', 'gif', 'tiff', 'bmp', 'webp', 'heic', 'mp4', 'avi', 'mov', 'wmv', 'mkv', 'flv', 'webm', 'mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'txt', 'pdf', 'rar', 'zip', '7z', 'tar.gz', 'tar', 'docx', 'html', 'csv', 'srt', 'svg', 'xls', 'xlsx', 'pptx', 'json', 'xml', 'md', 'epub', 'mobi', 'odt'
];

// DOM Elements
const originalImage = document.querySelector('.background');
const aboutBtn = document.querySelector(".about");
const formatBtn = document.querySelector(".format-btn");
const buttonArrow = document.querySelector(".button-arrow");
const formatList = document.querySelector(".format-lists");
const inputText = document.querySelector('.app-input');
const outputDiv = document.querySelector('.app-output');
const deleteLinksBtn = document.querySelector(".delete");
const copyMessage = document.querySelector(".copied");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");
const loader = document.querySelector(".loader");

let links = [];
let format = "";

// Function to handle format item click
function formatItemClickHandler(event) {
    // Reset background color for all format items
    document.querySelectorAll(".format-items").forEach((li) => {
        li.style.backgroundColor = "";
    });

    // Set background color for selected format item
    event.currentTarget.style.backgroundColor = "#007bff21";
    format = event.currentTarget.textContent;
    document.querySelector(".format-type").textContent = format;
    formatList.classList.add("hidden");
    buttonArrow.classList.remove("-rotate-90");
}

// Function to show a sweet alert with an error message
const sweetAlert = (errorMessage) => {
    Swal.fire({
        title: errorMessage,
        icon: 'error',
        confirmButtonText: 'بازگشت'
    });
};

// Function to find and display links with the selected format
function findLink() {
    const linksArray = inputText.value.split('\n');
    outputDiv.innerHTML = '';
    outputDiv.classList.remove("hidden");

    // Check if input is empty or format is not selected
    if (!inputText.value) {
        sweetAlert('شما لینکی وارد نکرده اید');
        return;
    }
    if (!format) {
        sweetAlert('لطفا فرمت مورد نظر را انتخاب کنید');
        return;
    }

    // Show loader
    loader.classList.remove("hidden");
    loader.classList.add("flex");

    // Simulate loading with setTimeout
    setTimeout(() => {
        loader.classList.add("hidden");
        loader.classList.remove("flex");

        // Iterate over input links and display links with the selected format
        linksArray.forEach(link => {
            if (link.endsWith(`.${format}`)) {
                const html = `
                    <div class="link-box py-4 border-b border-white">
                        <a href="${link}" target="_blank">${link}</a>
                    </div>
                `;
                outputDiv.insertAdjacentHTML("beforeend", html);
            }
        });

        // Show message if no links with the selected format are found
        if (!outputDiv.innerHTML) {
            outputDiv.insertAdjacentHTML("beforeend", '<p dir="rtl" class="py-4">فرمت مورد نظر در لینک ها وجود ندارد :(</p>');
        }
    }, 1000);
}

// Function to copy all displayed links to the clipboard
function copyLinks() {
    copyMessage.classList.remove("hidden");
    links = Array.from(document.querySelectorAll(".link-box a")).map(link => link.href);
    navigator.clipboard.writeText(links.join("\n"));

    // Hide copy message after 3 seconds
    setTimeout(() => {
        copyMessage.classList.add("hidden");
    }, 3000);
}

// Function to close the modal
const closeModal = () => {
    modal.classList.add("translate-x-full");
    modal.classList.remove("-translate-x-1/2");
    overlay.classList.add("opacity-0");
    setTimeout(() => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }, 500);
};

// Event listener to populate format list on window load
window.addEventListener("load", () => {
    allFormats.sort().forEach(format => {
        const li = `<li class="format-items cursor-pointer py-3 px-3 border-b hover:bg-blue-400/30 border-y-gray-300 text-zinc-700">${format}</li>`;
        formatList.insertAdjacentHTML("beforeend", li);
    });

    // check if the original image is already loaded
    if (originalImage.complete) {
        document.body.classList.remove("lazy-background")
        document.body.classList.add("background")
    }
});

// Event listener to show/hide format list and add click handlers to format items
formatBtn.addEventListener("click", () => {
    formatList.classList.toggle("hidden");
    buttonArrow.classList.toggle("-rotate-90");

    document.querySelectorAll(".format-items").forEach(li => {
        li.removeEventListener("click", formatItemClickHandler);
        li.addEventListener("click", formatItemClickHandler);
    });
});

// Event listener to delete all displayed links
deleteLinksBtn.addEventListener("click", () => {
    outputDiv.innerHTML = '';
    links = [];
});

// Event listener to open the modal
aboutBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setTimeout(() => {
        modal.classList.remove("translate-x-full");
        modal.classList.add("-translate-x-1/2");
        overlay.classList.remove("opacity-0");
    }, 0.1);
});

// Event listener to close the modal
closeModalBtn.addEventListener("click", closeModal);

// Event listener to close the modal on Escape key press
document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});
