document.addEventListener("DOMContentLoaded", () => {
  async function loadData() {
    try {
      const response = await fetch('data/evolution_data.json');
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      
      const labels = data.map(item => item.year);
      const values = data.map(item => item.avg_women_expression_rate);

      const ctx = document.getElementById("womenExpressionChart").getContext("2d");
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: "Taux d’expression des femmes (%)",
            data: values,
            borderColor: '#e63946',
            backgroundColor: 'rgba(230, 57, 70, 0.2)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 5,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.parsed.y.toFixed(2)} %`
              }
            }
          },
          scales: {
            x: {
              title: { display: true, text: "Année" },
              grid: { display: false }
            },
            y: {
              title: { display: true, text: "Taux d’expression (%)" },
              ticks: { callback: val => val + " %" },
              beginAtZero: false
            }
          }
        }
      });

    } catch (error) {
      console.error("Erreur lors du chargement :", error);
      document.querySelector("#donnees").innerHTML += "<p>⚠️ Impossible de charger les données.</p>";
    }
  }

  loadData();
});
