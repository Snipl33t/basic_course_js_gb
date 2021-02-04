const equals3 = (a, b, c) => {
  return (a == b && b == c && a != '');
}

const checkWinner = (model) => {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(model[i][0], model[i][1], model[i][2])) {
      winner = model[i][0];
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(model[0][i], model[1][i], model[2][i])) {
      winner = model[0][i];
    }
  }

  // diagonal
  if (equals3(model[0][0], model[1][1], model[2][2])) {
    winner = model[0][0];
  }
  if (equals3(model[0][2], model[1][1], model[2][0])) {
    winner = model[0][2];
  }

  return winner;
}

const game = () => {

  function initTicTacToe() {
    this.model = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.playerX = 'X';
    this.playerO = 'O';
    this.currentPlayer = playerX;

    this.$game = document.querySelector('#game');
    this.$table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
      this.$tr = document.createElement('tr');
      this.$tr.dataset.index = i;

      for (let j = 0; j < 3; j++) {
        this.$td = document.createElement('td');
        this.$td.dataset.index = j;
        this.$tr.appendChild($td);
      }

      this.$table.appendChild($tr);
    }

    this.$game.appendChild($table);

    return function (e) {
      tictactoe(e);
    }
  };

  function tictactoe(e) {
    const row = e.target.parentNode.dataset.index;
    const column = e.target.dataset.index;

    // 2. check if td assigned
    if (!model[row][column]) {

      model[row][column] = currentPlayer;
      e.target.innerHTML = currentPlayer;

      const winner = checkWinner(model);
      if (winner) {
        alert(`Winner: ${winner}`);
      }
      // 1. tie
      else if (model.every(modelRow => modelRow.every(element => element))) {
        alert(`It's a tie!`);
      }

      currentPlayer = currentPlayer === playerX ? playerO : playerX;

    }
  };

  const game = initTicTacToe();

  this.$table.addEventListener('click', (e) => {
    game(e);
  });

}

window.onload = () => {
  game();
};
