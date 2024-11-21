$(document).ready(function () {
    const gridSize = 3; // Change to 4 for a 4x4 grid
    let moves = 0;

    const createGrid = () => {
        const gridContainer = $('#grid-container');
        gridContainer.empty(); // Clear any existing grid
        gridContainer.css({
            'grid-template-columns': `repeat(${gridSize}, 1fr)`,
            'grid-template-rows': `repeat(${gridSize}, 1fr)`,
        });

        for (let i = 0; i < gridSize * gridSize; i++) {
            const button = $('<button>')
                .addClass('on')
                .attr('data-id', i);
            gridContainer.append(button);
        }
    };

    const toggleLight = (id) => {
        const button = $(`[data-id="${id}"]`);
        button.toggleClass('on off');
    };

    const toggleNeighbours = (id) => {
        const row = Math.floor(id / gridSize);
        const col = id % gridSize;

        toggleLight(id); // Toggle current button
        if (row > 0) toggleLight(id - gridSize); // Top
        if (row < gridSize - 1) toggleLight(id + gridSize); // Bottom
        if (col > 0) toggleLight(id - 1); // Left
        if (col < gridSize - 1) toggleLight(id + 1); // Right
    };

    const checkWin = () => {
        const allOff = $('#grid-container button').filter('.on').length === 0;
        if (allOff) {
            alert(`Congratulations! You won in ${moves} moves!`);
        }
    };

    $('#grid-container').on('click', 'button', function () {
        const id = parseInt($(this).attr('data-id'));
        toggleNeighbours(id);
        moves++;
        $('#move-counter').text(moves);
        checkWin();
    });

    $('#reset-btn').on('click', function () {
        moves = 0;
        $('#move-counter').text(moves);
        createGrid();
    });

    // Initialize the game
    createGrid();
});