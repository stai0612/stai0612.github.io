(() => {
  const holes = Array.from(document.querySelectorAll('.hole'));
  const scoreEl = document.getElementById('score');
  const timeEl = document.getElementById('time');
  const startBtn = document.getElementById('start');

  let score = 0;
  let time = 30;
  let activeIndex = null;
  let gameTimer = null;
  let moleTimer = null;

  function randomIndex(){
    return Math.floor(Math.random()*holes.length);
  }

  function showMole(){
    clearMole();
    const idx = randomIndex();
    activeIndex = idx;
    const hole = holes[idx];
    const mole = document.createElement('div');
    mole.className = 'mole pop';
    mole.dataset.index = idx;
    hole.appendChild(mole);
    // remove after random short time
    moleTimer = setTimeout(clearMole, 700 + Math.random()*800);
  }

  function clearMole(){
    holes.forEach(h => { const m = h.querySelector('.mole'); if(m) h.removeChild(m); });
    activeIndex = null;
    if(moleTimer){ clearTimeout(moleTimer); moleTimer=null; }
  }

  function tick(){
    time -= 1;
    timeEl.textContent = time;
    if(time <= 0){ endGame(); }
  }

  function startGame(){
    score = 0; time = 30;
    scoreEl.textContent = score; timeEl.textContent = time;
    startBtn.disabled = true;
    showMole();
    gameTimer = setInterval(tick, 1000);
    // pop moles at intervals
    moleSchedule();
  }

  function moleSchedule(){
    // schedule repeated mole appearance
    const interval = 600;
    moleTimer = setInterval(showMole, interval + Math.random()*300);
  }

  function endGame(){
    clearInterval(gameTimer); gameTimer = null;
    clearInterval(moleTimer); moleTimer = null;
    clearMole();
    startBtn.disabled = false;
    alert('時間到！你的分數：' + score);
  }

  // click handling
  holes.forEach(h => {
    h.addEventListener('click', e => {
      const mole = h.querySelector('.mole');
      if(mole){
        score += 1;
        scoreEl.textContent = score;
        // pop animation feedback
        mole.classList.remove('pop');
        mole.style.transform = 'translateX(-50%) scale(0.9)';
        setTimeout(() => { if(mole && mole.parentNode) mole.parentNode.removeChild(mole); }, 150);
      }
    });
  });

  startBtn.addEventListener('click', startGame);

})();
