const expensesGraphs = document.querySelectorAll(".expenses-graph");

let data;
async function fetchData() {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
        data = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
}

async function resize(){
  await fetchData();

  const coef = window.innerWidth<800? 3:2.3;
  for(let i=0;i<expensesGraphs.length;i++){
      const graph = expensesGraphs[i];
      const todayExpenses = graph.querySelector(".day-expenses");
      
      graph.style.height=`${data[i].amount*coef}px`;


      graph.addEventListener("mouseover", () => {
        todayExpenses.textContent = `$${data[i].amount}`;
        todayExpenses.classList.remove("hidden");
      });
      
      graph.addEventListener("mouseout", () => {
        todayExpenses.classList.add("hidden");
      });
  }

  const today= data[new Date().getDay()-1].day;
  const todayContainer = document.querySelector(`.${today} .expenses-graph`);
  todayContainer.style.backgroundColor="var(--cyan)";
}

resize();

window.addEventListener("resize",()=>{
  resize();
})