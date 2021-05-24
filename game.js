const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange place and you see a object near you.',
    options: [
      {
        text: 'Take the object',
        setState: { goldCoin: true },
        nextText: 2
      },
      {
        text: 'Leave the object',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You move on find out where you are when you come across a guy offering a gold coin for fresh water or a cloak.',
    options: [
      {
        text: 'Trade the Gold Coin for a bottle of water',
        requiredState: (currentState) => currentState.goldCoin,
        setState: { goldCoin: false, water: true },
        nextText: 3
      },
      {
        text: 'Trade the Gold Coin for a cloak',
        requiredState: (currentState) => currentState.goldCoin,
        setState: { goldCoin: false, cloak: true },
        nextText: 3
      },
      {
        text: 'Ignore the guy',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the guy you start to feel tired and find a small town and a castle.',
    options: [
      {
        text: 'Explore the Castle',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at in the town',
        requiredState: (currentState) => currentState.goldCoin,
        setState: { goldCoin: false },
        nextText: 5
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some brick from the celing in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You fall asleep in the Inn and wake up well rested.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path and a brick falls from the celing behind you.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your water',
        requiredState: (currentState) => currentState.water,
        nextText: 9
      },
      {
        text: 'Hide behind your cloak',
        requiredState: (currentState) => currentState.cloak,
        nextText: 10
      },
      {
        text: 'Throw a brick at it',
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'You run and trip and then monster easily catches you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single splash of water.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your cloak and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw a brick at the monster and it fell to the ground. After that  you saw the monster was dead. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()