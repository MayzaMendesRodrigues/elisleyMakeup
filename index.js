document.getElementById('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const botao = document.getElementById('btn');
    const form = e.target;
    const mensagem = document.getElementById('mensagem');

    const originalText = botao.textContent;

    botao.disabled = true;
    botao.textContent = 'INVIO...';

    try {
        const data = new FormData(form);
        const response = await fetch("https://formsubmit.co/jonas.bazzi@elisleymakeup.it", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            mensagem.style.display = 'block';
        } else {
            throw new Error('Errore di risposta del server');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message || "Errore durante l'invio. Riprova.");
    } finally {
        botao.disabled = false;
        botao.textContent = originalText;
    }
});