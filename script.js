const noel = document.querySelector('.noel')
const chamine = document.querySelector('.chamine')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

audioStart = new Audio('sound/audio_theme.mp3')
audioGameOver = new Audio('sound/audio_gameover.mp3')


const startGame = () => {
  chamine.classList.add('chamine-animation')
  start.style.display = 'none'

  // audio
  audioStart.play()
}

const restartGame = () => {
  gameOver.style.display = 'none'
  chamine.style.left = ''
  chamine.style.right = '0'
  noel.src = 'img/noel.gif'
  noel.style.width = '150px'
  noel.style.bottom = '0'

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;

}

const jump = () => {
  noel.classList.add('jump')

  setTimeout(() => {
    noel.classList.remove('jump')
  }, 800)
}

const loop = () => {
  setInterval(() => {
    const chaminePosition = chamine.offsetLeft
    const noelPosition = window
      .getComputedStyle(noel)
      .bottom.replace('px', ' ')

    if (chaminePosition <= 120 && chaminePosition > 0 && noelPosition < 80) {
      chamine.classList.remove('.chamine-animation')
      chamine.style.left = `${chaminePosition}px`

      noel.classList.remove('.jump')
      noel.style.bottom = `${noelPosition}px`

      noel.src = 'img/game-over.png'
      noel.style.width = '100px'
      noel.style.marginLeft = '50px'

      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()

      audioGameOver.play()

      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)

      gameOver.style.display = 'flex'

      clearInterval(loop)
    }
  }, 10)
}

loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump()
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
  }
})