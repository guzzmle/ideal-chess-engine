import { Chess } from "./template/js/chess.js"

$(document).ready(function () {
  var board = null
  var game = new Chess()

  console.log($)
  console.log(typeof $)

  $("#footer").load("template/footer.html");
  $("#header").load("template/header.html");
  $("#navigation").load("template/navigation.html");

  function onDragStart (source, piece, position, orientation) {
    if (game.game_over()) return false;

    if (piece.search(/^b/) !== -1) return false;

    /*
    if ((orientation === 'white' && piece.search(/^w/) === -1) ||
        (orientation === 'black' && piece.search(/^b/) === -1)) {
      return false
    }
    */
  }

  function makeRandomMove () {
    debugger
    var moveList = game.moves()

    if (moveList.length === 0) return

    var randomIdx = Math.floor(Math.random() * moveList.length)
    game.move(moveList[randomIdx])
    board.position(game.fen())
    updateStatus()
  }

  function onDrop (source, target) {
    var move = game.move({
      from: source,
      to: target,
      promotion: "q"
    })
    if (move === null) return "snapback";
    window.setTimeout(makeRandomMove, 250)
  

    updateStatus()
  }

  function onSnapEnd () {
    board.position(game.fen())
  }

  function updateStatus () {
    debugger
    var status = ""
    var moveColor = "White"
    if (game.turn() === "b") {
      moveColor = "Black"
    }

    if (game.in_checkmate()) {
      status = "Game over, " + moveColor + " is in checkmate."
    }

    else if (game.in_draw()) {
      status = "Game over, game is a draw."
    }

    else {
      status = moveColor + " to move"
      if (game.in_check()) {
        status += ", " + moveColor + " is in check."
      }
    }

    $("#status").html(status)
    $("#fen").html(game.fen())
    $("#pgn").html(game.pgn())
  }


  var config = {
    draggable: true,
    /*
    moveSpeed: 'slow',
    snapbackSpeed: 500,
    snapSpeed: 100,
    */
    dropOffBoard: "snapback",
    position: "start",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  }

  board = Chessboard("chessboard", config)
  $(window).resize(board.resize)

  $('#startPositionBtn').on('click', game.reset)
  $('#moveBtn').on('click', function () {
    board.move('d2-d4', 'g8-f6')
  })

  updateStatus()

})
