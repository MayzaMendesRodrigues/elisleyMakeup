document.getElementById("form").addEventListener("submit", function () {
  const mensagem = document.getElementById("mensagem");
  mensagem.style.display = "block";
  setTimeout(() => {
    mensagem.style.display = "none";
    const input = document.getElementById("emailInput");
    input.value = ""
  }, 2000);
});
