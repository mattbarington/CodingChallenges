/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
class Board {

    
	constructor(board) {
		this.board = board;
		this.notes = new Array(9);
		for (var i = 0 ; i < 9; i++) {
			this.notes[i] = new Array(9);
			for (let j = 0; j < 9; j++)
				this.notes[i][j] = new Set()
		}
		this.unsolved = 81;
		this.rows = new Array(9);
		this.cols = new Array(9);
		this.boxes = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.rows[i] = new Set();
            this.cols[i] = new Set();
            this.boxes[i] = new Set();
        }
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
                if (board[i][j] != '.')
				    this.putVal(i, j, board[i][j]);
			}
		}
	}

    putVal(r, c, val) {
		this.rows[r].add(val);
		this.cols[c].add(val);
		this.boxes[boxNum(r,c)].add(val);
		this.board[r][c] = val
		this.notes[r][c].clear();
		this.unsolved--;
	}
    
	boxCoord(b) {
		return [(b / 3) * 3, (b % 3) * 3]
	}

	boxNum(r,c) {
		return (c / 3) + (r / 3)*3;
	}

	getCol(row) {
		return this.rows[row];
	}

	getRow(col) {
		return this.cols[col];
	}

	getBox(r,c) {
		return this.boxes[boxNum];
	}

	solve() {
		while (this.unsolved > 0) {
			for (let i = 0; i < 9; i++) {
				clearRow(i);
				clearCol(i);
				clearBox(i);
				findLonerInRow(i);
				findLonerInCol(i);
				findLonerInBox(i);
			}
		}
	}
	
	clearRow(r) {
		let row = getRow(r)
		for (let i = 0; i < 9; i++) {
			row.forEach(num => this.notes[r][i].delete(num));
			if (this.notes[r][i].size == 1) {
				putVal(r, i, this.notes[r][i].values().next().value);
				// this.notes[r][i].clear();
				// this.unsolved--;
			}
		}
	}
	
	clearCol(c) {
		let col = getCols(c)
		for (let i = 0; i < 9; i++) {
			col.forEach(num => this.notes[i][c].delete(num));
			if (this.notes[i][c].size == 1) {
				putVal(i, c, this.notes[i][c].values().next().value);
				// this.notes[i][c].clear();
				// this.unsolved--;
			}
		}
	}
	
	clearBox(b) {
		let box = this.boxes[b];
		const [row, col] = boxCoord(b);
		for (let i = row; i < row + 3; i++) {
			for (let j = col; j < col + 3; j++) {
				box.forEach(num => this.notes[i][j].delete(num))
				if (this.notes[i][j].size == 1) {
					putVal(i, j, this.notes[i][j].values().next().value)
					// this.notes[i][j].clear();
					// this.unsolved--;
				}
			}
		}	
	}

	findLonerInRow(r) {
		let counts = Array[10];
		let lonerExists = true;
		while (lonerExists) {
			lonerExists = false;
			counts.forEach(c => c = 0);
			for (let i = 0; i < 9; i++) {
				this.notes[r][i].forEach(p => counts[p]++);
			}
			for (let n = 1; n <= 9; n++) {
				if (counts[n] == 1) {
					lonerExists = true;
					for (let i = 0; i < 9; i++) {
						if (this.notes[r][i].has(n)) {
							putVal(r,i,n);
						}
						// this.notes[r][i].delete(n);
					}
				}
			}
		} 
	}

	findLonerInCol(c) {
		let counts = Array[10];
		let lonerExists = true;
		while (lonerExists) {
			counts.forEach(c => c = 0);
			for (let i = 0; i < 9; i++) {
				this.notes[i][c].forEach(p => counts[p]++);
			}
			for (let n = 1; n <= 9; n++) {
				if (counts[n] == 1) {
					lonerExists = true;
					for (let i = 0; i < 9; i++) {
						if (this.notes[i][c].has(n)) {
							putVal(i,c,n);
						}
					}
				}
			}
		}
	}

	findLonerInBox(b) {
		let counts = Array[10];
		let lonerExists = true;
		const [row, col] = boxCoord(b);
		while (lonerExists) {
			lonerExists = false
			counts.forEach(c => c = 0)
			for (let i = row; i < row + 3; i++) {
				for (let j = col; j < col + 3; j++) {
					this.notes[i][j].forEach(p => counts[p]++);
				}
			}
			for (let n = 1; n <=9; n++) {
				if (counts[n] == 1) {
					lonerExists = true;
					for (let i = 0; i < 9; i++) {
						if (this.notes[row][col].has(n)) {
							putVal(row,col,n);
						}
					}
				}
			}
		}
	}
}


var solveSudoku = function(board) {
    var b = new Board(board)
    b.solve()
    board = b.board
};
console.log("hello");