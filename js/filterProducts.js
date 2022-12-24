export function filterProducts() {
  /* ======== variables========== */
  const brandPhone = document.querySelector("#brand");
  const companyPhone = document.querySelector("#company");
  const minimumPhone = document.querySelector("#minimum");
  const maximumPhone = document.querySelector("#maximum");
  const memoryPhone = document.querySelector("#memory");
  const storagePhone = document.querySelector("#storage");
  const containerResult = document.querySelector("#result");

  /* ==== Objeto para guardar los valores de los select ====*/
  const phoneSelect = {
    brand: "",
    company: "",
    minimum: "",
    maximum: "",
    memory: "",
    storage: "",
  };

  /* ==== eventos a los "Select" ===="*/
  brandPhone.addEventListener("change", (e) => {
    phoneSelect.brand = e.target.value;
    filterphones();
  });
  companyPhone.addEventListener("change", (e) => {
    phoneSelect.company = e.target.value;
    filterphones();
  });
  minimumPhone.addEventListener("change", (e) => {
    phoneSelect.minimum = e.target.value;
    filterphones();
  });
  maximumPhone.addEventListener("change", (e) => {
    phoneSelect.maximum = e.target.value;
    filterphones();
  });
  memoryPhone.addEventListener("change", (e) => {
    phoneSelect.memory = e.target.value;
    filterphones();
  });
  storagePhone.addEventListener("change", (e) => {
    phoneSelect.storage = e.target.value;
    filterphones();
  });

  /* ==== LLamando a la funcíon principal ====*/
  viewPhone(phones);

  // funciones
  function viewPhone(phones) {
    /* ===== Limpiar html anterior =====*/
    cleanHTML();

    /* ===== Recorriendo el areglo de objetos =====*/
    phones.forEach((phone) => {
      // destructuring
      const { url, brand, company, memory, price, storage } = phone;

      // Creando HTML

      // etiquetas "h3", "p" para los detalles del productos
      const pBrand = document.createElement("h3");
      pBrand.textContent = brand;
      const pCompany = document.createElement("p");
      pCompany.textContent = `Company: ${company}`;
      const pMemory = document.createElement("p");
      pMemory.textContent = `Memory: ${memory}`;
      const pPrice = document.createElement("p");
      pPrice.textContent = `Price: Q${price}`;
      const pStorage = document.createElement("p");
      pStorage.textContent = `Storage: ${storage}`;
      // IMG
      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.src = url;
      img.alt = "Image Phone";
      // Card
      const card = document.createElement("div");
      card.classList.add("card", "mb-5");
      // Card-body
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "text-center");
      const buttonCard = document.createElement("input");
      // Button
      buttonCard.type = "button";
      buttonCard.value = "Buy";
      buttonCard.classList.add("btn", "btn-success", "px-5");
      // Agregando al HTML
      cardBody.appendChild(pBrand);
      cardBody.appendChild(pCompany);
      cardBody.appendChild(pMemory);
      cardBody.appendChild(pPrice);
      cardBody.appendChild(pStorage);
      cardBody.appendChild(buttonCard);
      card.appendChild(img);
      card.appendChild(cardBody);

      // agregar el card al elemento contenedor
      containerResult.appendChild(card);
    });
  }

  /* ===== si la búsqueda no se a encontrado ===== */
  function notFound() {
    // limpiar HTML anterior
    cleanHTML();

    // crear HTML
    const alert = document.createElement("p");
    alert.textContent = "No Results Found :(";
    alert.classList.add("alert", "alert-danger", "text-center");

    // agregar alerta al contenedor
    containerResult.appendChild(alert);
  }

  /* ===== Eliminando el HTML Previo =====*/
  function cleanHTML() {
    while (containerResult.firstChild) {
      /* ===== Eliminado el primer Elemento hijo del elemento padre containerResult =====*/
      containerResult.removeChild(containerResult.firstChild);
    }
  }

  /*=====  Filtrando el areglo de objetos de teléfonos según la búsqueda del usuario =====*/
  function filterphones() {
    // filtrando búsqueda con funciones de alto nivel
    const result = phones
      .filter(filterBrand)
      .filter(filterCompany)
      .filter(filterMinimum)
      .filter(filterMaximium)
      .filter(filterMemory)
      .filter(filterStorage);

    // si al areglo no está vacío (Se ha encontrado la búsqueda)
    if (result.length) {
      // mostrar resultado
      viewPhone(result);
    } else {
      // si está vacío muestra una alerta (no se ha encontrado la búsqueda)
      notFound();
    }
  }

  /**
   * La función filtra los teléfonos basándose en las opciones seleccionadas y devuelve los teléfonos filtrados.
   * @param phone - el objeto phone
   * @devuelve un nuevo array de teléfonos que han sido filtrados por las selecciones del usuario.
   */
  function filterBrand(phone) {
    const { brand } = phoneSelect;
    /* Comprueba si la marca está seleccionada y si lo está, devuelve el teléfono que coincide con la marca. Si no está seleccionada, devuelve todos los  teléfonos*/
    if (brand) {
      return phone.brand === brand;
    }
    return phone;
  }

  function filterCompany(phone) {
    const { company } = phoneSelect;

    /* Comprueba si la compañia está seleccionada y, si lo está, devuelve el teléfono que coincide con la compañia. Si no está seleccionada, devuelve todos los  teléfonos. */
    if (company) {
      return phone.company === company;
    }
    return phone;
  }

  function filterMinimum(phone) {
    const { minimum } = phoneSelect;

    /* Comprueba si el valor mínimo está seleccionado y, si lo está, devuelve el teléfono que coincide con el valor mínimo. Si no está seleccionado, devuelve todos los teléfonos. */
    if (minimum) {
      return phone.price >= minimum;
    }
    return phone;
  }

  function filterMaximium(phone) {
    const { maximum } = phoneSelect;
    /* Comprueba si el valor maximo está seleccionado y, si lo está, devuelve el teléfono que coincide con el valor maximo. Si no está seleccionado, devuelve todos los teléfonos.  */
    if (maximum) {
      return phone.price <= maximum;
    }
    return phone;
  }

  function filterMemory(phone) {
    const { memory } = phoneSelect;
    /* Comprueba si la memoria está seleccionada y, si lo está, devuelve el teléfono que coincide con la memoria. Si no está seleccionada, devuelve todos los  teléfonos. */
    if (memory) {
      return phone.memory === memory;
    }
    return phone;
  }

  function filterStorage(phone) {
    const { storage } = phoneSelect;
    /* Comprueba si el almacenamiento está seleccionada y, si lo está, devuelve el teléfono que coincide con el almacenamiento. Si no está seleccionada, devuelve todos los  teléfonos. */
    if (storage) {
      return phone.storage === storage;
    }
    return phone;
  }
}
