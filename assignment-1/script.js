document.addEventListener("DOMContentLoaded", function () {
    const addItemBtn = document.getElementById("addItemBtn");
    const itemNameInput = document.getElementById("itemName");
    const itemDescriptionInput = document.getElementById("itemDescription");
    const itemTopicInput = document.getElementById("itemTopic");
    const itemList = document.getElementById("itemList");
    const searchInput = document.getElementById("searchInput");

    loadItemsAndUpdateTable();

    addItemBtn.addEventListener("click", function() {
        const createNewItemModal = document.getElementById("createItemModal");
        createNewItemModal.style.display = "block";
    });    

    function addRowToTable(name, description, topic) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
                 <td>${name}</td>
                 <td>${description}</td>
                 <td>${topic}</td>
                 <td><button class="delete-btn">Delete</button></td>
        `;
        itemList.appendChild(newRow);

        const deleteButton = newRow.querySelector(".delete-btn");
            deleteButton.addEventListener("click", function () {
                const confirmationModal = document.getElementById("confirmationModal");
                confirmationModal.style.display = "block";

                const confirmDeleteButton = document.getElementById("confirmDelete");
                confirmDeleteButton.addEventListener("click", function () {
                    newRow.remove();
                    confirmationModal.style.display = "none";

                    removeItemFromStorage(name);

                    loadItemsAndUpdateTable();
            });
        });
    }

    function storeItemInStorage(name, description, topic) {
        const items = JSON.parse(localStorage.getItem("items")) || [];
        items.push({ name, description, topic });
        localStorage.setItem("items", JSON.stringify(items));
    }

    function loadItemsAndUpdateTable() {
        const items = JSON.parse(localStorage.getItem("items")) || [];
        itemList.innerHTML = "";

        items.forEach(function (item) {
            addRowToTable(item.name, item.description, item.topic);
        });
    }

    function removeItemFromStorage(name) {
        const items = JSON.parse(localStorage.getItem("items")) || [];

        const index = items.findIndex(item => item.name === name);

        if (index !== -1) {
            items.splice(index, 1);

            localStorage.setItem("items", JSON.stringify(items));
        }
    }

    const createNewItemBtn = document.getElementById("createNewItemBtn");
    createNewItemBtn.addEventListener("click", function () {
        const itemName = itemNameInput.value;
        const itemDescription = itemDescriptionInput.value;
        const itemTopic = itemTopicInput.value;

        if (itemName.trim() !== "") {
            addRowToTable(itemName, itemDescription, itemTopic);

            storeItemInStorage(itemName, itemDescription, itemTopic);

            loadItemsAndUpdateTable();

            document.getElementById("createItemModal").style.display = "none";

            const closeButtons = document.getElementsByClassName("close");
            for (const closeButton of closeButtons) {
                closeButton.addEventListener("click", function () {
                    confirmationModal.style.display = "none"; // Close the modal
                });
            }
        }
    });

    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(function (closeButton) {
        closeButton.addEventListener("click", function() {
            const modal = closeButton.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    function filterItems() {
        const searchText = searchInput.value.toLowerCase();
        const rows = itemList.querySelectorAll("tr");

        rows.forEach(function (row) {
            const itemNameCell = row.querySelector("td:nth-child(1)");
            const itemDescriptionCell = row.querySelector("td:nth-child(2)");

            if (itemNameCell && itemDescriptionCell) {
                const itemName = itemNameCell.textContent.toLowerCase();
                const itemDescription = itemDescriptionCell.textContent.toLowerCase();
                if (itemName.includes(searchText) || itemDescription.includes(searchText)) {
                    row.style.display = ""; // Show the row
                } else {
                    row.style.display = "none"; // Hide the row
                }
            }
        });
    }
    searchInput.addEventListener("input", filterItems);
});