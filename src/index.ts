import "./style.css";

import lenaImage from "images/lena.png";
import company from "src/company.json";

main();
async function main() {
  // Get the root element from the DOM.
  const root = document.getElementById("root");
  if (root == null) {
    return;
  }

  // company
  const h2 = document.createElement("h2");
  h2.textContent = company.name;
  const memberParagraphs = company.members.map(member => {
    const p = document.createElement("p");
    p.textContent = `name: ${member.name}, age: ${member.age}`;
    return p;
  });
  root.append(h2, ...memberParagraphs);

  // lena
  const para = document.createElement("p");
  para.textContent = "and this is lena.";

  const img = document.createElement("img");
  img.src = lenaImage;
  img.width = 250;
  img.height = 250;

  root.append(para, img);
}
