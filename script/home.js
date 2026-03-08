const loadIssues = () => {
  const loader = document.querySelector(".loading")
  loader.classList.remove("hidden")
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      loader.classList.add("hidden")
      const allIssues = data.data;
      const allBtn = document.getElementById("all-btn");
      const openBtn = document.getElementById("open-btn");
      const closedBtn = document.getElementById("closed-btn");
      allBtn.classList.add("text-white", "bg-[#4A00FF]");
      openBtn.classList.remove("text-white", "bg-[#4A00FF]");
      closedBtn.classList.remove("text-white", "bg-[#4A00FF]");
      displayIssues(allIssues);
      document.getElementById("all-btn").addEventListener("click", () => {
        const displaySection = document.getElementById("display-section");
        displaySection.innerHTML = "";
        
        allBtn.className =
          "btn text-white bg-[#4A00FF] shadow-none border-none px-9";
        openBtn.className = "btn shadow-none border-none px-9";
        closedBtn.className = "btn shadow-none border-none px-9";
        displayIssues(allIssues);
      });
      document.getElementById("open-btn").addEventListener("click", () => {
        const displaySection = document.getElementById("display-section");
        displaySection.innerHTML = "";
       
        allBtn.className = "btn shadow-none border-none px-9";
        openBtn.className =
          "btn text-white bg-[#4A00FF] shadow-none border-none px-9";
        closedBtn.className = "btn shadow-none border-none px-9";
        const openIssues = allIssues.filter((issue) => issue.status === "open");
        displayIssues(openIssues);
      });

      document.getElementById("closed-btn").addEventListener("click", () => {
        const displaySection = document.getElementById("display-section");
        displaySection.innerHTML = "";
        
        allBtn.className = "btn shadow-none border-none px-9";
        openBtn.className = "btn shadow-none border-none px-9";
        closedBtn.className =
          "btn text-white bg-[#4A00FF] shadow-none border-none px-9";
        const closedissues = allIssues.filter(
          (issue) => issue.status === "closed",
        );
        displayIssues(closedissues);
      });

      
      const searchBtn = document.getElementById("search-btn");
      searchBtn.addEventListener("click", ()=>{
        const searchInput = document.getElementById("search-input").value.toLowerCase()
      const filtered = allIssues.filter(issue => issue.title.toLowerCase().includes(searchInput));
      displayIssues(filtered)
      })
    });
};

const displayIssues = (data) => {
  const displaySection = document.getElementById("display-section");
  displaySection.innerHTML = "";
  const trackCount = document.getElementById("track-count");
  trackCount.innerText = data.length + " Issues";
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div onclick="openModal(${element.id})" class="border-t-4 ${element.status == "open" ? " border-t-[#00A96E]" : "border-t-[#A855F7]"} rounded-md p-3 space-y-4 shadow-md min-h-85 flex flex-col justify-evenly">
        <div class="flex justify-between ">
          ${element.status == "open" ? '<img src="assets/Open-Status.png" alt="" />' : '<img src="assets/Closed- Status .png" alt="" />'}
          <h1 class="px-4 rounded-xl py-1 text-sm ${
            element.priority == "high"
              ? "bg-[#FEECEC] text-[#EF4444]"
              : element.priority == "medium"
                ? "bg-[#FFF6D1] text-[#F59E0B]"
                : "text-[#9CA3AF] bg-[#EEEFF2]"
          }
">${element.priority.toUpperCase()}</h1>
        </div>
        <div class="space-y-3">
          <h1 class="text-[#1F2937] font-bold">${element.title}</h1>
          <p class="text-[#64748B]">
            ${element.description}
          </p>
        <div class="mt-auto">
          <div class="labels-container flex flex-wrap gap-2 mt-2"></div>
          <div>
          <hr class="border-gray-300 mt-3" />
          <div class="text-sm text-gray-500 mt-3">
            <p>Created by ${element.author}</p>
            <p>${new Date(element.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
        `;

    const labelsContainer = div.querySelector(".labels-container");

    element.labels.forEach((label) => {
      const labelText = document.createElement("div");
      labelText.innerHTML = `
      ${
        label == "bug"
          ? '<img src="assets/Vector.png" alt="">' + label.toUpperCase()
          : label == "enhancement"
            ? '<img src="assets/Sparkle.png" alt="">' + label.toUpperCase()
            : '<img src="assets/Vector (1).png" alt="">' + label.toUpperCase()
      }
      `;
      label == "bug"
        ? (labelText.className =
            "font-bold px-2 py-1 rounded text-xs flex flex-wrap items-center gap-2 bg-[#FECACA] text-[#EF4444]")
        : label == "help wanted"
          ? (labelText.className =
              " font-bold px-2 py-1 rounded text-xs flex flex-wrap items-center gap-2 bg-[#FDE68A] text-[#D97706]")
          : (labelText.className =
              "font-bold px-2 py-1 rounded text-xs flex flex-wrap items-center gap-2 bg-[#DEFCE8] text-[#00A96E]");

      labelsContainer.appendChild(labelText);
    });
    displaySection.appendChild(div);
  });
};




const openModal = async (id) => {
  document.getElementById("my_modal_6").checked = true;
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const res = await fetch(url);
  const details = await res.json();
  const data = details.data
  const modal = document.getElementById("modal")
  modal.innerHTML = `
   <div class="">
          <h1 class="text-xl font-bold">${data.title}</h1>
          <div class="flex gap-4 text-[#64748B]">
          <p>${data.status}</p>
          <p>Opened By ${data.author}</p>
          <p>${new Date(data.createdAt).toLocaleString()} </p>
        </div>
        </div>
        
        <div class="modal-labels-container flex gap-4">
          
        </div>
        <p class="text-[#64748B]">${data.description}</p>
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-[#64748B]">Assignee :</p>
            <h1>${data.assignee}</h1>
          </div>
          <div class="flex-1">
            <p class="text-[#64748B]">Priority :</p>
            <p  class="inline-flex px-3 rounded-md
            ${
            data.priority == "high"
              ? "bg-[#FEECEC] text-[#EF4444]"
              : data.priority == "medium"
                ? "bg-[#FFF6D1] text-[#F59E0B]"
                : "text-[#9CA3AF] bg-[#EEEFF2]"
          }">${data.priority.toUpperCase()}</p>
          </div>
        </div>
        <div class="modal-action">
          <label for="my_modal_6" class="btn">Close!</label>
        </div>
  `
const labelsContainer = modal.querySelector(".modal-labels-container");

    data.labels.forEach((label) => {
      const labelText = document.createElement("div");
      labelText.innerHTML = `
      ${
        label == "bug"
          ? '<img src="assets/Vector.png" alt="">' + label.toUpperCase()
          : label == "enhancement"
            ? '<img src="assets/Sparkle.png" alt="">' + label.toUpperCase()
            : '<img src="assets/Vector (1).png" alt="">' + label.toUpperCase()
      }
      `;
      label == "bug"
        ? (labelText.className =
            "font-bold px-2 py-1 rounded text-xs flex flex-wrap items-center gap-2 bg-[#FECACA] text-[#EF4444]")
        : label == "help wanted"
          ? (labelText.className =
              " font-bold px-2 py-1 rounded text-xs flex flex-wrap items-center gap-2 bg-[#FDE68A] text-[#D97706]")
          : (labelText.className =
              "font-bold px-2 py-1 rounded text-xs flex flex-wrap items-center gap-2 bg-[#DEFCE8] text-[#00A96E]");

      labelsContainer.appendChild(labelText);
    });









}


loadIssues()