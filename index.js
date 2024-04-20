const queue = [];
const visited = [];

const Node = ([x, y]) => {
    let node = { 
        value: `[${x}, ${y}]`, 
        prev: null,
    };
    return node;
};

// make adjacency matrix data structure
const createBoard = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
            board[i][j] = `[${i}, ${j}]`;
        }
    }
    return board;
};

// get all possible moves that a knight can make
const getVertices = ([x, y], board = createBoard()) => {
    for (let i = 0; i < board.length; ++i) {
    board[i] = board[i].filter(
        (move) =>
        move === `[${x - 2}, ${y - 1}]` ||
        move === `[${x - 1}, ${y - 2}]` ||
        move === `[${x + 1}, ${y - 2}]` ||
        move === `[${x + 2}, ${y - 1}]` ||
        move === `[${x + 2}, ${y + 1}]` ||
        move === `[${x + 1}, ${y + 2}]` ||
        move === `[${x - 1}, ${y + 2}]` ||
        move === `[${x - 2}, ${y + 1}]`
    );
    }
    board = board.flat();
    return board;
};


// traverse graph with bfs
const bfs = (node, end) => {
    visited.push(queue.shift());

    let possibleMoves = getVertices(JSON.parse(node.value));
    possibleMoves.forEach((vertex) => {
        vertex = { value: vertex, prev: node };
        if (!visited.some((move) => move.value === vertex.value)) {
        queue.push(vertex);
        }
    });

    if (node.value === Node(end).value) {
        return node;
    } else {
        return bfs(queue[0], end);
    }
};

// calculate knight moves
const knightMoves = (start, end) => {
    if (end[0] > 7 || end[0] < 0 || end[1] > 7 || end[1] < 0) {
        return "Out of range, please keep start and end coordinates between [0, 0] and [7, 7]";
    }

    queue.push(Node(start));
    let pathTaken = bfs(queue[0], end);

    const result = [];
    result.push(pathTaken.value);
    while (pathTaken.prev) {
        // add parent node to the start of array
        result.unshift(pathTaken.prev.value);
        pathTaken = pathTaken.prev;
    }
    
    console.log(`You made it in ${result.length - 1} moves!`)
    console.log("Here is your path: ");
    result.forEach((move) => console.log(move));
};

console.log(knightMoves([3, 3], [4, 3]));