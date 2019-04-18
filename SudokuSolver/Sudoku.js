/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
class Board {

    
	constructor(board) {
		this.board = new Array(9)// = board;
		this.notes = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.board[i] = new Array(9)
			this.notes[i] = new Array(9);
        }
		for (var i = 0 ; i < 9; i++) {
			for (let j = 0; j < 9; j++)
				this.notes[i][j] = new Set([1,2,3,4,5,6,7,8,9])
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
                if (board[i][j] != null)
				    this.putVal(i, j, board[i][j]);
			}
		}
		this.time = 0
	}

	boxNum(r,c) {
		return Math.floor(c / 3) + Math.floor(r / 3) * 3;
	}

    putVal(r, c, val) {
		this.rows[r].add(val);
		this.cols[c].add(val);
		this.boxes[this.boxNum(r,c)].add(val);
		this.board[r][c] = val
		this.notes[r][c].clear();
		this.unsolved--;
	}
    
	boxCoord(b) {return [Math.floor(b / 3) * 3, (b % 3) * 3]}

	getRow(row) {return this.rows[row];}

	getCol(col) {return this.cols[col];}

	getBox(r,c) {return this.boxes[boxNum];}

	solve() {
		while (this.unsolved > 0 && this.time < 3000) {
			for (let i = 0; i < 9; i++) {
				this.clearRow(i);
				this.clearCol(i);
				this.clearBox(i);
				this.findLonerInRow(i);
				this.findLonerInCol(i);
				this.findLonerInBox(i);
			}
			this.time++
			console.log("time "+this.time)
			console.log("unsolved " +this.unsolved)

		}
	}
	
	clearRow(r) {
		for (let i = 0; i < 9; i++) {
			this.getRow(r).forEach(num => {
				this.notes[r].forEach(el => el.delete(num))
			});
			if (this.notes[r][i].size == 1) {
				this.putVal(r, i, this.notes[r][i].values().next().value);
			}
		}
	}
	
	clearCol(c) {
		let col = this.getCol(c)
		for (let i = 0; i < 9; i++) {
			col.forEach(num => this.notes[i][c].delete(num));
			if (this.notes[i][c].size == 1) {
				this.putVal(i, c, this.notes[i][c].values().next().value);
				// this.notes[i][c].clear();
				// this.unsolved--;
			}
		}
	}
	
	clearBox(b) {
		let box = this.boxes[b];
		const [row, col] = this.boxCoord(b);
		for (let i = row; i < row + 3; i++) {
			for (let j = col; j < col + 3; j++) {
				box.forEach(num => this.notes[i][j].delete(num))
				if (this.notes[i][j].size == 1) {
					this.putVal(i, j, this.notes[i][j].values().next().value)
				}
			}
		}	
	}

	findLonerInRow(r) {
		let counts = new Array(10);
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
							this.putVal(r,i,n);
						}
					}
				}
			}
		} 
	}

	findLonerInCol(c) {
		let counts = new Array(10);
		let lonerExists = true;
		while (lonerExists) {
			lonerExists = false
			counts.forEach(c => c = 0);
			for (let i = 0; i < 9; i++) {
				this.notes[i][c].forEach(p => counts[p]++);
			}
			for (let n = 1; n <= 9; n++) {
				if (counts[n] == 1) {
					lonerExists = true;
					for (let i = 0; i < 9; i++) {
						if (this.notes[i][c].has(n)) {
							this.putVal(i,c,n);
						}
					}
				}
			}
		}
	}

	findLonerInBox(b) {
		let counts = new Array(10);
		let lonerExists = true;
		const [row, col] = this.boxCoord(b);
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
							this.putVal(row,col,n);
						}
					}
				}
			}
		}
	}
}

let testCase = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
//let testCase = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]
testCase = testCase.map(row =>
	row.map(num =>
		num === "." ? null : parseInt(num, 10)	
	)
)
console.log(testCase)
let b = new Board(testCase)
b.solve()
for (let i = 0; i < 9; i++) {
    // for (let j = 0; j < 9; j++)
        console.log(b.board[i])
}

//var solveSudoku = function(board) {
//    var b = new Board(board)
//    b.solve()
//    board = b.board
//};