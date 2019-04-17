class Board {
	constructor(board) {
		this.board = board;
		this.notes = new Array[9];
		for (var i = 0 ; i < 9; i++)
			notes[i] = new Array[9];
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
		var row = getRow(r)
		this.notes[r] = this.notes[r].filter( ( num ) => !row.includes(num) );
		
	}
	
	clearCol(col) {
		get
	}
	
	clearBox() {
		
	}
	
}


console.log("hello");