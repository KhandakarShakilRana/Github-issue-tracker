const loadIssues = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
};

const displayIssues = (data) => {
  const displaySection = document.getElementById("display-section");
  const trackCount = document.getElementById("track-count");
  trackCount.innerText = data.length + " Issues"
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="border-t-4 ${element.status == "open" ? " border-t-[#00A96E]" : "border-t-[#A855F7]"} rounded-md p-3 space-y-4 shadow-md h-85 flex flex-col justify-evenly">
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
              "font-bold px-2 py-1 rounded text-xs flex flex-wrap items-center gap-2 bg-[#DEFCE8] text-[#00A96E]") ;
            
      labelsContainer.appendChild(labelText);
    });
    displaySection.appendChild(div);
  });
};
loadIssues();
