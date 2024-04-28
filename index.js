

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use((req, res, next) => {
    // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allow certain HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Allow certain HTTP headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Allow credentials (if needed)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Move to the next middleware
    next();
  });
app.use(express.static('public'));
app.use(bodyParser.json());
let port=2000;
app.listen(port, () => {
    console.log("Listening on port ${port}");
});

// Function to initialize the chessboard with starting positions
function initializeChessboard() {
    return [
        [5, 3, 4, 6, 7, 4, 3, 5], // Black pieces in the first row
        [1, 1, 1, 1, 1, 1, 1, 1], // Black pawns in the second row
        Array(8).fill(0), 
        Array(8).fill(0),
        Array(8).fill(0),
        Array(8).fill(0),
        [11, 11, 11, 11, 11, 11, 11, 11], // White pawns in the second-to-last row
        [15, 13, 14, 16, 17, 14, 13, 15] // White pieces in the last row
    ];
}

// Array to store the current state of the chessboard
let chessboardState = initializeChessboard();

// Route to get the current state of the chessboard
app.get('/chessboard', (req, res) => {
    res.json(chessboardState);
});

// Route to make a move on the chessboard
app.post('/move', (req, res) => {
    const { fromSquare, toSquare } = req.body;

    // Parse the coordinates of the squares
    const [fromRow, fromCol] = parseCoordinates(fromSquare);
    const [toRow, toCol] = parseCoordinates(toSquare);

    // Check if the move is valid
    if (!isValidMove(fromRow, fromCol, toRow, toCol)) {
        return res.status(400).json({ status: 'error', message: 'Invalid move' });
    }

    // Make the move on the chessboard
    chessboardState[toRow][toCol] = chessboardState[fromRow][fromCol];
    chessboardState[fromRow][fromCol] = 0; // Clear the source square

    // Send a response indicating the move was successful
    res.json({ status: 'success', message: 'Move processed successfully' });
});

// Function to parse coordinates from square notation (e.g., 'a1' to [0, 0])
function parseCoordinates(square) {
    const col = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = 8 - parseInt(square[1]);
    return [row, col];
}

// Function to check if a move is valid
function isValidMove(fromRow, fromCol, toRow, toCol) {
    // Implement chess move validation logic here
    // For simplicity, let's assume all moves are valid for now
    return true;
}



