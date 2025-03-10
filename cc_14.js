document.addEventListener("DOMContentLoaded", () => {
    const ticketContainer = document.getElementById("ticketContainer");
    
    // Task 2: Function to add a support ticket dynamically
    function createSupportTicket() {
        const name = document.getElementById("customerName").value.trim();
        const issue = document.getElementById("issueDescription").value.trim();
        const priority = document.getElementById("priority").value;

        if (!name || !issue) {
            alert("All fields must be filled.");
            return;
        }

        const ticket = document.createElement("div");
        ticket.classList.add("ticket-item");
        ticket.dataset.priority = priority;

        const nameHeader = document.createElement("h3");
        nameHeader.textContent = name;
        
        const issueText = document.createElement("p");
        issueText.textContent = issue;
        
        const priorityIndicator = document.createElement("span");
        priorityIndicator.textContent = `Priority: ${priority}`;
        priorityIndicator.classList.add("priority-tag");
        
        const resolveBtn = document.createElement("button");
        resolveBtn.textContent = "Resolve";
        resolveBtn.classList.add("resolve-btn");
        resolveBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            ticket.remove();
        });
        
        const modifyBtn = document.createElement("button");
        modifyBtn.textContent = "Edit";
        modifyBtn.classList.add("edit-btn");
        modifyBtn.addEventListener("click", () => enableEditing(ticket, nameHeader, issueText, priorityIndicator));
        
        ticket.append(nameHeader, issueText, priorityIndicator, modifyBtn, resolveBtn);
        ticketContainer.appendChild(ticket);
    }

    // Task 3: Highlight high-priority tickets
    function markHighPriorityTickets() {
        document.querySelectorAll(".ticket-item").forEach(ticket => {
            if (ticket.dataset.priority === "High") {
                ticket.style.border = "3px solid crimson";
                ticket.style.backgroundColor = "#ffebeb";
            }
        });
    }

    // Task 4: Event Bubbling - Log clicks on tickets
    ticketContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("ticket-item")) {
            console.log("Ticket clicked:", event.target.querySelector("h3").textContent);
        }
    });

    // Task 5: Inline Editing of Support Tickets
    function enableEditing(ticket, nameHeader, issueText, priorityIndicator) {
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = nameHeader.textContent;

        const issueInput = document.createElement("textarea");
        issueInput.value = issueText.textContent;

        const priorityDropdown = document.createElement("select");
        ["Low", "Medium", "High"].forEach(level => {
            const option = document.createElement("option");
            option.value = level;
            option.textContent = level;
            if (priorityIndicator.textContent.includes(level)) option.selected = true;
            priorityDropdown.appendChild(option);
        });

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.classList.add("save-btn");
        saveBtn.addEventListener("click", () => {
            nameHeader.textContent = nameInput.value;
            issueText.textContent = issueInput.value;
            priorityIndicator.textContent = `Priority: ${priorityDropdown.value}`;
            ticket.dataset.priority = priorityDropdown.value;
            ticket.innerHTML = "";
            ticket.append(nameHeader, issueText, priorityIndicator, modifyBtn, resolveBtn);
        });

        ticket.innerHTML = "";
        ticket.append(nameInput, issueInput, priorityDropdown, saveBtn);
    }

    window.createSupportTicket = createSupportTicket;
    window.markHighPriorityTickets = markHighPriorityTickets;
});
