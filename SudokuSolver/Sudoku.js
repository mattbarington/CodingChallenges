class Board {
	constructor(board) {
		this.board = board;
		this.notes = new Array[9];
		for (var i = 0 ; i < 9; i++) {
			notes[i] = new Array[9];
			for (let j = 0; j < 9; j++)
				notes[i][j] = new Set()
		}
		this.unsolved = 81;
		this.rows = new Array();
		this.cols = new Array();
		this.boxes = new Array();
		for (i = 0; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				putVal(i, j, board[i][j]);
			}
		}
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

	putVal(r, c, val) {
		this.rows[r].push(val);
		this.cols[c].push(val);
		this.boxes[boxNum(r,c)].push(val);
	}

	solve() {
		while (this.unsolved > 0) {
			for (var i = 0; i < 9; i++) {
				clearRow();
				clearCol();
				clearBox();
			}
		}
	}
	
	clearRow(r) {
		let row = getRow(r)
		for (let i = 0; i < 9; i++) {
			this.notes[r][i] = this.notes[r][i].filter(num => !row.has(num));
			if (this.notes[r][i].size == 1)
				putVal(r, i, this.notes[r][i].values().next().value);	
		}			
	}
	
	clearCol(col) {
		console.log(col)
	}
	
	clearBox(b) {
		let box = this.boxes[b];
		const [row, col] = boxCoord(b);
		for (let i = row; i < row + 3; i++) {
			for (let j = col; j < col + 3; j++) {
				box.forEach(num => this.notes[i][j].delete(num))
				if (this.notes[i][j].size == 1)
					putVal(i, j, this.notes[i][j].values().next().value)
			}
		}	
	}
	
}


console.log("hello");