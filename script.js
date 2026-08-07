document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

 
  const modal = document.getElementById("modal-status");
  const modalIcon = document.getElementById("modal-icon");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  
  function showModal(isSuccess, title, message) {
    if (isSuccess) {
      modalIcon.className = "mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400";
      modalIcon.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
    } else {
      modalIcon.className = "mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 text-rose-400";
      modalIcon.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
    }

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
  }

  
  modalCloseBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });

 
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    submitBtn.disabled = true;
    submitBtn.innerText = "Envoi en cours...";

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showModal(true, "Message envoyé !", "Merci ! Votre message a bien été envoyé à BM Company. Nous vous répondrons très rapidement.");
        form.reset();
      } else {
        const responseData = await response.json();
        let errorMsg = "Une erreur est survenue lors de l'envoi de votre formulaire.";
        
        if (Object.hasOwn(responseData, 'errors')) {
          errorMsg = responseData["errors"].map(error => error["message"]).join(", ");
        }
        
        showModal(false, "Oups !", errorMsg);
      }
    } catch (error) {
      showModal(false, "Erreur réseau", "Un problème est survenu. Veuillez vérifier votre connexion internet.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Envoyer la demande";
    }
  }

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});