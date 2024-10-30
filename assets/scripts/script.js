let qrCode;

function changeDisplay () {
    const form = document.querySelector(".generator__form");

    if (form.style.display === "none") {
        form.style.display = "flex";
    } else {
        form.style.display = "none";
    }

    const main = document.querySelector(".main");
    const mainGenerator = document.querySelector(".main__generator");
    const mainqr = document.querySelector(".main__qr");
    const title = document.querySelector(".main__title")

    if (mainGenerator.style.display === "none") {
        title.style.alignSelf = "normal";
        mainGenerator.style.display = "block";
        main.style.marginTop = "300px";
        main.style.marginLeft = "0px";
        mainqr.style.display = "none";
        mainqr.style.marginTop = "0px";

    } else {
        title.style.alignSelf = "flex-start";
        mainGenerator.style.display = "none";
        main.style.marginTop = "50px";
        main.style.marginLeft = "100px";
        mainqr.style.display = "flex";
        mainqr.style.marginTop = "100px";
    }
}

function generateQR() {
    var text = document.querySelector(".form__input").value;

    if (text) {
        document.querySelector(".qr__code").innerHTML = '';

        qrCode = new QRCode(document.querySelector(".qr__code"), {
            text: text,
            width: 190,
            height: 190,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        changeDisplay();
    } else {
        alert("Please, enter a text to generate a QR code.")
    }
}

function copyQRLink() {
    console.log('Clicked');
    const text = document.querySelector(".form__input").value;

    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Enlace copiado al portapapeles.");
        }, () => {
            alert("No se pudo copiar el enlace.")
        });
    } else {
        alert("No hay ningún enlace que copiar.");
    }
}

function downloadQRImage() {
    console.log('Clicked');
    if (qrCode) {
        const imgData = qrCode._el.querySelector("img").src;
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = imgData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("No hay ningún codigo QR que descargar.")
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.querySelector(".input__btn");
    generateBtn.addEventListener('click', generateQR);

    const downloadBtn = document.querySelector(".qr__btn--download");
    downloadBtn.addEventListener('click', downloadQRImage);

    const shareBtn = document.querySelector(".qr__btn--share");
    shareBtn.addEventListener('click', copyQRLink);
});