document.getElementById('preview-button').addEventListener('click', () => {
    const itemType = document.getElementById('item-type').value;
    const color = document.getElementById('color').value;
    const text = document.getElementById('text').value;
    const design = document.getElementById('design').files[0];

    const canvas = document.getElementById('item-preview');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add custom text
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Add design image
    if (design) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(design);
    }
});

document.getElementById('customize-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your custom item has been added to the cart!');
    // Here, you can save the customization data in localStorage or send it to your backend.
});
