const allFormats = [
    'jpg', 'png', 'gif', 'tiff', 'bmp', 'webp', 'heic', 'mp4', 'avi', 'mov', 'wmv', 'mkv', 'flv', 'webm', 'mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'txt', 'pdf', 'rar', 'zip', '7z', 'tar.gz', 'docx', 'html', 'csv', 'srt', 'svg', 'xls', 'xlsx', 'pptx', 'json', 'xml', 'md', 'epub', 'mobi', 'odt'
];

const aboutBtn = document.querySelector(".about")
const formatBtn = document.querySelector(".format-btn");
const buttonArrow = document.querySelector(".button-arrow");
const formatedlist = document.querySelector(".format-lists");
const inputText = document.querySelector('.app-input');
const outputDiv = document.querySelector('.app-output');
const deleteLinks = document.querySelector(".delete");
const copyMessage = document.querySelector(".copied");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");
const loader = document.querySelector(".loader");


let links = [];
let format = "";

function formatItemClickHandler(event) {
    document.querySelectorAll(".format-items").forEach((li) => {
        li.style.backgroundColor = "";
    });

    this.style.backgroundColor = "#007bff21";
    format = this.textContent;
    document.querySelector(".format-type").textContent = `(${format})`
    formatedlist.classList.add("hidden");
    buttonArrow.classList.remove("-rotate-90");
}

const sweetAlert = (errorMessage) => {
    Swal.fire({
        title: errorMessage,
        icon: 'error',
        confirmButtonText: 'بازگشت'
    })
    return
};

function findLink() {
    const linksArray = inputText.value.split('\n');
    outputDiv.innerHTML = '';
    outputDiv.classList.remove("hidden");

    if (inputText.value === "") {
        sweetAlert('شما لینکی وارد نکرده اید');
        return;
    } else if (format === "") {
        sweetAlert('لطفا فرمت مورد نظر را انتخاب کنید');
        return;
    }

    loader.classList.remove("hidden");
    loader.classList.add("flex");
    setTimeout(() => {
        loader.classList.add("hidden");
        loader.classList.remove("flex");

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

        if (outputDiv.innerHTML === "") {
            outputDiv.insertAdjacentHTML("beforeend", `<p dir="rtl" class="py-4">فرمت مورد نظر در لینک ها وجود ندارد :(</p>`);
        }
    }, 1000);
}

function copyLinks() {
    copyMessage.classList.remove("hidden");
    document.querySelectorAll(".link-box").forEach(linkBox => {
        const link = linkBox.querySelector("a").href;
        links.push(link);
    })
    navigator.clipboard.writeText(links.join("\n"));

    setTimeout(() => {
        copyMessage.classList.add("hidden");
    }, 3000);
}

const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    modal.classList.add("translate-x-full");
    modal.classList.remove("-translate-x-1/2");
    overlay.classList.add("opacity-0");
}

window.addEventListener("load", () => {
    allFormats.sort();
    allFormats.forEach(format => {
        const li = `<li class="format-items cursor-pointer py-3 px-3 border-b hover:bg-blue-400/30 border-y-gray-300 text-zinc-700">${format}</li>`;
        formatedlist.insertAdjacentHTML("beforeend", li);
    })
})

formatBtn.addEventListener("click", () => {
    formatedlist.classList.toggle("hidden");
    buttonArrow.classList.toggle("-rotate-90");

    document.querySelectorAll(".format-items").forEach((li) => {
        li.removeEventListener("click", formatItemClickHandler);
        li.addEventListener("click", formatItemClickHandler);
    });
});

deleteLinks.addEventListener("click", () => {
    outputDiv.innerHTML = '';
    links = [];
});

aboutBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setTimeout(() => {
        modal.classList.remove("translate-x-full");
        modal.classList.add("-translate-x-1/2");
        overlay.classList.remove("opacity-0");
    }, 0.1);
});

closeModalBtn.addEventListener("click", () => {
    closeModal()
});

document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
})