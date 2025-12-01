<script>
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Mängu andmestruktuur (siia lisage oma väited)
        const gameRounds = [
            {
                statements: [
                    { text: "Rühmas Karl on kõige vanem", isLie: false },
                    { text: "Rühmas Joonatan on  vanuselt keskmine.", isLie: false },
                    { text: "Rühmas Tristan on kõige vanem.", isLie: true } // VALE!
                ]
            },
            {
                statements: [
                    { text: "Karl on varem mänginud klaverit.", isLie: false },
                    { text: "Joonatan on varem õppinud klarnetit.", isLie: false },
                    { text: "Tristan on varem õppinud trumme.", isLie: true } // VALE!
                ]
            },
            {
                statements: [
                    { text: "Karlile meeldib joosksmas käia.", isLie: false }, 
                    { text: "Joonatanile meeldib poksida.", isLie: true }, // VALE!
                    { text: "Tristanile meeldib ratast sõita.", isLie: false } 
                ]
            },
            {
                statements: [
                    { text: "Karl lõpetas gümnaasiumi 2023.", isLie: true }, // VALE!
                    { text: "Joonatan lõpetas gümnaasiumi 2024.", isLie: false },
                    { text: "Tristan lõpetas gümnaasiumi 2025.", isLie: false } 
                ]
            },
            {
                statements: [
                    { text: "Karl on pärit Põlvamaalt.", isLie: true }, // VALE!
                    { text: "Joonatan on pärit Pärnumaalt.", isLie: false },
                    { text: "Tristan on pärit Harjumaalt.", isLie: false } 
                ]
            }
        ];

        let currentRoundIndex = 0; // Jälgime praegust ringi
        const totalRounds = gameRounds.length;

        // Elementide viited
        const choicesDiv = document.querySelector('.choices');
        const feedback = document.getElementById('feedback');
        const nextRoundBtn = document.getElementById('next-round-btn');
        const roundCounter = document.getElementById('round-counter');


        // 2. Funktsioon uue ringi laadimiseks
        function loadNewRound() {
            if (currentRoundIndex >= totalRounds) {
                // Mäng läbi: näita tulemusi
                feedback.textContent = 'Mäng on läbi! Läbisid kõik ' + totalRounds + ' ringi edukalt.';
                feedback.className = 'correct';
                choicesDiv.innerHTML = ''; // Eemalda nupud
                nextRoundBtn.textContent = 'Alusta uuesti';
                nextRoundBtn.classList.remove('hidden-feedback');
                nextRoundBtn.removeEventListener('click', loadNext);
                nextRoundBtn.addEventListener('click', restartGame);
                return;
            }

            const currentRound = gameRounds[currentRoundIndex];
            
            // Värskenda ringi loendurit
            roundCounter.textContent = 'Ring: ' + (currentRoundIndex + 1) + ' / ' + totalRounds;

            // Puhasta ja loo uued nupud
            choicesDiv.innerHTML = ''; 
            currentRound.statements.forEach(statement => {
                const button = document.createElement('button');
                button.className = 'choice-btn';
                button.textContent = statement.text;
                button.dataset.isLie = statement.isLie; // Oluline, hoiab tõe/valet
                button.addEventListener('click', handleChoice);
                choicesDiv.appendChild(button);
            });

            // Peida tagasiside nupud ja tekst
            feedback.classList.add('hidden-feedback');
            nextRoundBtn.classList.add('hidden-feedback');
        }


        // 3. Funktsioon nupu klõpsamisel
        function handleChoice(event) {
            const buttons = document.querySelectorAll('.choice-btn');
            // Keela kõik nupud
            buttons.forEach(btn => btn.disabled = true);

            const chosenBtn = event.currentTarget;
            const isLie = chosenBtn.dataset.isLie === 'true';

            // Kuva tagasiside ja "Järgmine ring" nupp
            feedback.classList.remove('hidden-feedback');
            nextRoundBtn.classList.remove('hidden-feedback');
            nextRoundBtn.textContent = 'Järgmine ring';

            if (isLie) {
                feedback.textContent = 'Õige! See oli vale väide. Jätkame!';
                feedback.className = 'correct';
                chosenBtn.style.backgroundColor = 'green';
            } else {
                feedback.textContent = 'Vale! See oli tõene väide. Vale oli...';
                feedback.className = 'incorrect';
                chosenBtn.style.backgroundColor = 'red';
                
                // Tuvasta ja värvi õige vastus (vale väide) roheliseks
                buttons.forEach(btn => {
                    if (btn.dataset.isLie === 'true') {
                        feedback.textContent += ` "${btn.textContent}".`;
                        btn.style.backgroundColor = 'darkgreen';
                    }
                });
            }
        }
        
        // 4. Funktsioon järgmise ringi juurde liikumiseks
        function loadNext() {
            currentRoundIndex++;
            loadNewRound();
        }
        
        // 5. Funktsioon mängu täielikuks taaskäivitamiseks (pärast lõppu)
        function restartGame() {
            currentRoundIndex = 0;
            nextRoundBtn.removeEventListener('click', restartGame);
            nextRoundBtn.addEventListener('click', loadNext);
            loadNewRound();
        }


        // Alglaadimine:
        loadNewRound();
        nextRoundBtn.addEventListener('click', loadNext);
    });
    </script>