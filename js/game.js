const cards = document.querySelectorAll('.card');
var Game = [];
var GameStep = [];
var Level = 0;
var One = 0;
var Three = 0;
var Seven = 0;

function flipCard() {
    Level = Level + 1;
    console.log($(this).hasClass("flip"));
    this.classList.toggle('flip');
}

$('#game-start').click(function() {
    Level = 0;
    One = 0;
    Three = 0;
    Seven = 0;

    $(this).addClass('disabledbutton');
    $('.card').each(function(i, item) {
        $(item).removeClass('hidden');

    });

});

$('.card').click(function() {
    if (Level == 0) {
        Game = shuffle(Game);
    }

    row = $(this).data('row');

    if (!$(this).hasClass("flip")) {
        this.classList.toggle('flip');
        if (Game[row] == 0) {

            $(this).children(".front-face").addClass('mine');
            gameOver()

        } else if (Game[row] == 1) {

            $('.result-one').children((`.card-result[data-row=${Level}]`)).removeClass('opacity');
            $(this).children(".front-face").addClass('star');

        }

    }
    Level = Level + 1;
});



$('#winModal').on('hidden.bs.modal', function() {
    reset();
    // do something…
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function gameOver() {
    for (var i = 0; i < 25; i++) {
        const $cell = $(`.card[data-row=${i}]`);
        if (!$cell.hasClass("flip")) {
            $cell.addClass('flip');

            if (Game[i] == 0) {
                $cell.children(".front-face").addClass('mine opacity');
            } else if (Game[i] == 1) {
                $cell.children(".front-face").addClass('star opacity');
            }
        }
    }

    $('#winModal').modal('toggle');
    document.getElementById("winLevel").innerHTML = 'Your step=' + Level;

}

function reset() {
    $('.card-result').each(function(i, item) {
        $(item).addClass('opacity');
    });
    for (var i = 0; i < 25; i++) {
        const $cell = $(`.card[data-row=${i}]`);
        $cell.removeClass('flip');
        $cell.addClass('hidden');

        if (Game[i] == 0) {

            $cell.children(".front-face").removeClass('mine opacity');

        } else if (Game[i] == 1) {

            $cell.children(".front-face").removeClass('star opacity');

        }

    }
    $('#game-start').removeClass('disabledbutton');
}

$('#r1').click(function() {

    Game = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    GameStep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    $(this).addClass('active');
    $('#r3').removeClass('active');
    $('#r2').removeClass('active');
    $(".r1").prop("checked", true);
    sizeStep();
})
$('#r2').click(function() {
    Game = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    GameStep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    $(this).addClass('active');
    $('#r1').removeClass('active');
    $('#r3').removeClass('active');
    $(".r2").prop("checked", true);
    sizeStep();
})
$('#r3').click(function() {
    Game = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    GameStep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $(this).addClass('active');
    $('#r1').removeClass('active');
    $('#r2').removeClass('active');
    $(".r3").prop("checked", true);
    sizeStep();
})
Game = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
GameStep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


function sizeStep() {
    const $board = $('#sizeStep');
    $board.html('');
    for (var i = 0; i < GameStep.length; i++) {
        const $col = $('<div>')
            .addClass('card-result opacity')
            .attr('data-row', i)
            .text(GameStep[i]);
        $board.append($col);
    }
}
sizeStep();