class Board {
	constructor(board) {
		this.board = board;
		this.notes = new Array[9];
		for (var i = 0 ; i < 9; i++)
			notes[i] = new Set[9];
		this.unsolved = 81;
		this.rows = new Set[9];
		this.cols = new Set[9];
		this.boxes = new Set[9];
		for (i = 0; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				putVal(i, j, board[i][j]);
			}
		}
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
		this.rows[r].add(val);
		this.cols[c].add(val);
		this.boxes[boxNum(r,c)].add(val);
	}

	solve() {
		clearRow();
		clearCol();
		clearBox();
	}
	
	clearRow() {
		
	}
	
	clearCol() {
		
	}
	
	clearBox() {
		
	}
	
}


console.log("hello");