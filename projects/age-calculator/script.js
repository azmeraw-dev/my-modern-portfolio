function calculateAge() {
  const dob = document.getElementById("dob").value;
  if (!dob) {
    document.getElementById("result").innerText = "Please select a date.";
    return;
  }

  const dobDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  const dayDiff = today.getDate() - dobDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  document.getElementById("result").innerText = `You are ${age} years old.`;
}
