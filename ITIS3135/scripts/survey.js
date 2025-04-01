document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("introForm").addEventListener("submit", handleSubmit);
  });
  
  function addCourse() {
    const section = document.getElementById("coursesSection");
    const div = document.createElement("div");
  
    const input = document.createElement("input");
    input.type = "text";
    input.name = "courses";
    input.required = true;
  
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.type = "button";
    delBtn.onclick = () => section.removeChild(div);
  
    div.appendChild(input);
    div.appendChild(delBtn);
    section.appendChild(div);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
  
    const courses = Array.from(document.querySelectorAll('input[name="courses"]'))
      .map(input => input.value)
      .filter(value => value.trim() !== "");
  
    const reader = new FileReader();
    const imageFile = formData.get("image");
  
    reader.onload = function () {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `
        <h2>Your BYO Intro Page</h2>
        <figure>
          <img src="${reader.result}" alt="User Image" width="300" />
          <figcaption>${formData.get("caption")}</figcaption>
        </figure>
        <ul>
          <li><strong>Name:</strong> ${formData.get("name")}</li>
          <li><strong>Mascot:</strong> ${formData.get("mascot")}</li>
          <li><strong>Personal Background:</strong> ${formData.get("personal")}</li>
          <li><strong>Professional Background:</strong> ${formData.get("professional")}</li>
          <li><strong>Academic Background:</strong> ${formData.get("academic")}</li>
          <li><strong>Background in Web Development:</strong> ${formData.get("webdev")}</li>
          <li><strong>Primary Computer Platform:</strong> ${formData.get("platform")}</li>
          <li><strong>Courses Currently Taking:</strong>
            <ul>
              ${courses.map(c => `<li><strong>${c}</strong></li>`).join("")}
            </ul>
          </li>
          <li><strong>Funny Thing:</strong> ${formData.get("funny")}</li>
          <li><strong>Anything Else:</strong> ${formData.get("extra")}</li>
        </ul>
      `;
  
      form.style.display = "none";
      resultDiv.style.display = "block";
      document.getElementById("resetResult").style.display = "inline";
    };
  
    if (imageFile && (imageFile.type === "image/png" || imageFile.type === "image/jpeg")) {
      reader.readAsDataURL(imageFile);
    } else {
      alert("Please upload a valid image file (.png or .jpg)");
    }
  }
  
  function resetForm() {
    const section = document.getElementById("coursesSection");
    section.innerHTML = `
      <legend>Courses Currently Taking:</legend>
      <button type="button" onclick="addCourse()">Add Course</button>
    `;
  }
  
  function resetPage() {
    document.getElementById("introForm").reset();
    resetForm();
    document.getElementById("result").style.display = "none";
    document.getElementById("resetResult").style.display = "none";
    document.getElementById("introForm").style.display = "block";
  }
  